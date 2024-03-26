import { PropsWithChildren, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

type FadeInProps = PropsWithChildren<{
  style?: any;
}>;

export default function FadeInView({ children, style }: FadeInProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}
