import { useRef, useEffect } from 'react'
import { Animated, Easing } from 'react-native'

export const useFadeInUp = (delay = 0, duration = 400) => {
    const opacity = useRef(new Animated.Value(0)).current
    const translateY = useRef(new Animated.Value(20)).current

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                delay,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration,
                delay,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
        ]).start()
    }, [opacity, translateY])

    return {
        opacity,
        transform: [{ translateY }],
    }
}

export const useAnimatedValue = (initial: number = 0) => {
    return useRef(new Animated.Value(initial)).current
}

export const animateTo = (value: Animated.Value, to: number, duration = 200) => {
    return Animated.timing(value, {
        toValue: to,
        duration,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
    })
}

export const animateParallel = (animations: Animated.CompositeAnimation[], callback?: () => void) => {
    Animated.parallel(animations).start(callback)
}

export const interpolateColor = (anim: Animated.Value, from: string, to: string) => {
    return anim.interpolate({
        inputRange: [0, 1],
        outputRange: [from, to],
    })
}
