import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
    isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('light')

    useEffect(() => {
        loadTheme()
    }, [])

    const loadTheme = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('theme')
            if (savedTheme === 'dark' || savedTheme === 'light') {
                setTheme(savedTheme)
            }
        } catch (error) {
            console.error('Error loading theme:', error)
        }
    }

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        try {
            await AsyncStorage.setItem('theme', newTheme)
        } catch (error) {
            console.error('Error saving theme:', error)
        }
    }

    return (
        <ThemeContext.Provider 
            value={{ 
                theme, 
                toggleTheme, 
                isDark: theme === 'dark' 
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}