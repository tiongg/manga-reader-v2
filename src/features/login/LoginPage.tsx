import { colors } from '@/config/theme';
import {
  UsernamePassword,
  useMangadexAuth,
} from '@/providers/MangadexAuth.provider';
import {
  View,
  Text,
  FormControl,
  Box,
  Input,
  InputField,
  Button,
  FormControlError,
  FormControlErrorText,
  ButtonText,
  ButtonSpinner,
  VStack,
} from '@gluestack-ui/themed';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';

//Login form for UsernamePassword login
export default function LoginPage() {
  const { loginWithUsernamePassword, loginError, isReloggingIn } =
    useMangadexAuth();
  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernamePassword>();

  return (
    <View flex={1} backgroundColor={colors.bg1} paddingTop={insets.top}>
      <VStack padding='$4' marginTop='40%' paddingBottom='$16'>
        <Text textAlign='center' size='5xl' fontWeight='$bold'>
          Welcome back
        </Text>
        <Text textAlign='center' color={colors.words2}>
          Login with MangaDex account
        </Text>
      </VStack>
      <VStack
        rowGap='$4'
        width='$full'
        alignItems='center'
        justifyContent='center'
      >
        <FormControl isInvalid={!!errors.username || !!loginError} width='$72'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder='Username'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
            name='username'
            rules={{ required: 'Username is required' }}
            defaultValue=''
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.username && errors.username.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.password || !!loginError} width='$72'>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder='Password'
                  type='password'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              </Input>
            )}
            name='password'
            rules={{ required: 'Password is required' }}
            defaultValue=''
          />
          <FormControlError>
            <FormControlErrorText>
              {errors.password && errors.password.message}
            </FormControlErrorText>
          </FormControlError>
        </FormControl>

        {loginError && <Text>{loginError.message}</Text>}
        <Button
          isDisabled={isReloggingIn}
          onPress={handleSubmit(loginWithUsernamePassword)}
          margin='$3'
          width='$48'
        >
          {isReloggingIn ? (
            <>
              <ButtonSpinner mr='$1' />
              <ButtonText fontWeight='$medium' fontSize='$sm'>
                Authenticating...
              </ButtonText>
            </>
          ) : (
            <ButtonText>Login</ButtonText>
          )}
        </Button>
      </VStack>
    </View>
  );
}
