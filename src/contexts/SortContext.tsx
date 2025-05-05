import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, FC } from 'react'

export type SortKey = 'price' | 'rating' | 'date'
export type SortOrder = 'asc' | 'desc'

interface SortContextType {
    sortBy: SortKey
    sortOrder: SortOrder
    setSort: (key: SortKey) => void
}

const SortContext = createContext<SortContextType | undefined>(undefined)

interface SortProviderProps {
    children: ReactNode
}

export const SortProvider: FC<SortProviderProps> = ({ children }) => {
    const [sortBy, setSortBy] = useState<SortKey>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

    const setSort = useCallback((key: SortKey) => {
        setSortOrder(prev => key === sortBy ? (prev === 'asc' ? 'desc' : 'asc') : 'asc')
        setSortBy(key)
    }, [sortBy])

    const value = useMemo(() => ({ sortBy, sortOrder, setSort }), [sortBy, sortOrder, setSort])

    return <SortContext.Provider value={value}>{children}</SortContext.Provider>
}

export const useSort = (): SortContextType => {
    const context = useContext(SortContext)
    if (!context) {
        throw new Error('useSort must be used within a SortProvider')
    }
    return context
}
