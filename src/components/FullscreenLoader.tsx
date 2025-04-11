import React, { useEffect, useRef } from 'react';
import { Animated, ActivityIndicator } from 'react-native';
import { fullscreenLoaderStyles as styles } from '../styles/FullscreenLoader.styles';

const FullscreenLoader: React.FC = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <ActivityIndicator size="large" color="#fff" />
    </Animated.View>
  );
};

export default FullscreenLoader;
