import { createContext, PropsWithChildren, useContext, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import * as fs from 'expo-file-system';
import {
  AuthenticationService,
  LoginResponse,
  OpenAPI,
  RefreshResponse,
  User,
  UserService,
} from 'mangadex-client';

import { queryClient } from '@/config/query-client';

export type UsernamePassword = {
  username: string;
  password: string;
};

type MangadexAuthContextType = {
  user: User | null; //React query complains if it is undefined
  isLoggingIn: boolean; //Is inital login/session refresh
  isReloggingIn: boolean; //Is logging in again
  loginWithUsernamePassword: (loginData: UsernamePassword) => void;
  loginError: Error | null;
  logout: () => void;
};

type SavedSessionData = {
  session: string;
  refresh: string;
  refreshedAt: number;
};

const SESSION_SAVE = `${fs.documentDirectory}/session.json`;
async function updateSessionData(data: RefreshResponse | LoginResponse) {
  const filePath = fs.documentDirectory + 'session.json';
  const sessionData = {
    session: data.token?.session,
    refresh: data.token?.refresh,
    refreshedAt: Date.now(),
  } as SavedSessionData;
  await fs.writeAsStringAsync(filePath, JSON.stringify(sessionData));
  return sessionData;
}

async function getSessionFromUsernamePassword(
  loginData: UsernamePassword | null
) {
  const { exists } = await fs.getInfoAsync(SESSION_SAVE);

  let sessionData;
  //No session
  if (!exists) {
    //No login data
    if (!loginData) return undefined;

    const { username, password } = loginData;

    const res = await AuthenticationService.postAuthLogin({
      requestBody: { username, password },
    }).catch(() => {
      throw new Error('Invalid username or password!');
    });

    sessionData = await updateSessionData(res);
    console.log('[Auth] Fresh login');
  }
  //Have existing session
  else {
    sessionData = JSON.parse(
      await fs.readAsStringAsync(SESSION_SAVE)
    ) as SavedSessionData;
  }

  //Refresh session
  if (dayjs().diff(sessionData.refreshedAt, 'minute') > 5) {
    const res = await AuthenticationService.postAuthRefresh({
      requestBody: {
        token: sessionData.refresh,
      },
    }).catch(() => {
      throw new Error('Session data stale!');
    });
    sessionData = await updateSessionData(res);
    console.log('[Auth] Session refresh');
  }

  console.log(
    '[Auth] Using session from:',
    dayjs(sessionData.refreshedAt).format('HH:mm:ss')
  );
  OpenAPI.TOKEN = sessionData.session;
  const res = await UserService.getUserMe();
  return res?.data;
}

export const MangadexAuthContext =
  createContext<MangadexAuthContextType | null>(null);

export function MangadexAuthProvider({ children }: PropsWithChildren) {
  const loginData = useRef<UsernamePassword | null>(null);
  const loginWithUsernamePassword = (data: UsernamePassword) => {
    loginData.current = data;
    relogin().then(() => {
      loginData.current = null;
    });
  };

  const {
    data: user,
    isPending: isLoggingIn,
    isRefetching: isReloggingIn,
    error: loginError,
    refetch: relogin,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      getSessionFromUsernamePassword(loginData.current)
        .then((res) => res ?? null)
        .catch((ex) => ex ?? null),
    refetchInterval: 6 * 60 * 1000, //6 minutes
  });

  const logout = async () => {
    await fs.deleteAsync(SESSION_SAVE);
    queryClient.invalidateQueries({
      queryKey: ['user'],
    });
    OpenAPI.TOKEN = '';
    relogin();
  };

  return (
    <MangadexAuthContext.Provider
      value={{
        user,
        isLoggingIn,
        isReloggingIn,
        loginWithUsernamePassword,
        loginError,
        logout,
      }}
    >
      {children}
    </MangadexAuthContext.Provider>
  );
}

export const useMangadexAuth = () => useContext(MangadexAuthContext)!;
