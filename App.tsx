import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChapterSelectPage from '@/features/chapter-select/ChapterSelectPage';
import FollowsPage from '@/features/follows/FollowsPage';
import LoggingInPage from '@/features/login/LoggingInPage';
import LoginPage from '@/features/login/LoginPage';
import MangaDetailsPage from '@/features/manga-details/MangaDetailsPage';
import MangaReaderPage from '@/features/manga-reader/MangaReaderPage';
import SettingsPage from '@/features/settings/SettingsPage';
import UpdatesPage from '@/features/updates/UpdatesPage';

import { useMangadexAuth } from '@/providers/MangadexAuth.provider';
import { PageParams, ScreenParams } from '@/types/navigation/nav-params';
import Providers from './Providers';

const Tab = createBottomTabNavigator<PageParams>();
const Stack = createNativeStackNavigator<ScreenParams>();

type UsedIcons = 'compass' | 'heart' | 'time' | 'download-sharp' | 'menu';
const ICONS_MAPPING: { [key in keyof PageParams]: UsedIcons } = {
  Updates: 'compass',
  Favorites: 'heart',
  // Recent: 'time',
  // Downloads: 'download-sharp',
  Settings: 'menu',
};

function TabPages() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => (
          <Ionicons name={ICONS_MAPPING[route.name]} size={27} color={color} />
        ),
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
      })}
    >
      <Tab.Screen name="Updates" component={UpdatesPage} />
      <Tab.Screen name="Favorites" component={FollowsPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}

function StackPages() {
  const { isLoggingIn, user } = useMangadexAuth();

  if (isLoggingIn) {
    return <LoggingInPage />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Main"
    >
      <Stack.Screen name="Main" component={TabPages} />
      <Stack.Screen name="MangaDetails" component={MangaDetailsPage} />
      <Stack.Screen name="ChapterSelect" component={ChapterSelectPage} />
      <Stack.Screen
        name="MangaReader"
        component={MangaReaderPage}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Providers>
      <StackPages />
    </Providers>
  );
}
