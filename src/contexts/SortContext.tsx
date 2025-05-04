import React, { createContext, useState, useContext } from 'react'

export type SortKey = 'price' | 'rating' | 'date'
type SortOrder = 'asc' | 'desc'

interface SortContextType {
    sortBy: SortKey
    sortOrder: SortOrder
    setSort: (key: SortKey) => void
}

const SortContext = createContext<SortContextType>({
    sortBy: 'date',
    sortOrder: 'asc',
    setSort: () => { },
})

interface SortProviderProps {
    children: React.ReactNode
}

export const SortProvider = ({ children }: SortProviderProps) => {
    const [sortBy, setSortBy] = useState<SortKey>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('asc')

    const setSort = (key: SortKey) => {
        if (key === sortBy) {
            setSortOrder(o => (o === 'asc' ? 'desc' : 'asc'))
        } else {
            setSortBy(key)
            setSortOrder('asc')
        }
    }

    return (
        <SortContext.Provider value={{ sortBy, sortOrder, setSort }}>
            {children}
        </SortContext.Provider>
    )
}

export const useSort = () => useContext(SortContext)
