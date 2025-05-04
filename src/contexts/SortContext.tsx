import React, { createContext, useState, useContext } from 'react'

export type SortKey = 'price' | 'rating' | 'date'

const SortContext = createContext<{
    sortBy: SortKey
    setSortBy: (key: SortKey) => void
}>({ sortBy: 'date', setSortBy: () => { } })

interface SortProviderProps {
    children: React.ReactNode
}

export const SortProvider = ({ children }: SortProviderProps) => {
    const [sortBy, setSortBy] = useState<SortKey>('date')
    return (
        <SortContext.Provider value={{ sortBy, setSortBy }}>
            {children}
        </SortContext.Provider>
    )
}

export const useSort = () => useContext(SortContext)
