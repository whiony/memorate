import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@/contexts/AuthContext'
import { styles } from './Auth.styles'

interface SignUpScreenProps {
    onSwitchToLogin: () => void
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const { signUp } = useAuth()

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSignUp = async () => {
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields')
            return
        }

        if (!validateEmail(email)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address')
            return
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match')
            return
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters')
            return
        }

        setLoading(true)
        try {
            await signUp(email, password)
        } catch (error: any) {
            Alert.alert('Sign Up Failed', error.message || 'An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <LinearGradient
            colors={['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    <View style={styles.content}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Create account</Text>
                            <Text style={styles.subtitle}>Sign up to get started</Text>
                        </View>

                        <BlurView intensity={100} tint="light" style={styles.form}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']}
                                style={styles.formGradient}
                            />
                            
                            <View style={styles.inputContainer}>
                                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    placeholderTextColor="#666"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.input, { paddingRight: 50 }]}
                                    placeholder="Password"
                                    placeholderTextColor="#666"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                                <TextInput
                                    style={[styles.input, { paddingRight: 50 }]}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#666"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={[styles.button, loading && styles.buttonDisabled]}
                                onPress={handleSignUp}
                                disabled={loading}
                            >
                                <LinearGradient
                                    colors={['#6366F1', '#4F46E5']}
                                    style={styles.buttonGradient}
                                >
                                    <Text style={styles.buttonText}>
                                        {loading ? 'Creating account...' : 'Sign Up'}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.switchButton} onPress={onSwitchToLogin}>
                                <Text style={styles.switchText}>
                                    Already have an account? <Text style={styles.switchTextBold}>Sign in</Text>
                                </Text>
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default SignUpScreen