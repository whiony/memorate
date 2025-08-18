import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/services/firebaseConfig'

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        try {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user)
                setLoading(false)
            }, (error) => {
                console.error('Auth state change error:', error)
                setLoading(false)
            })

            return () => unsubscribe()
        } catch (error) {
            console.error('Failed to initialize auth listener:', error)
            setLoading(false)
        }
    }, [])

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }

    const signUp = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            throw error
        }
    }

    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            throw error
        }
    }

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        logout,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}