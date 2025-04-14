import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebaseConfig';

const createCategoryList = (prev: string[], ...newCategories: string[]): string[] => {
    return [...new Set([...prev, ...newCategories])];
};

export interface CategoriesContextProps {
    categories: string[];
    loading: boolean;
    addCategory: (newCategory: string) => Promise<void>;
    refreshCategories: () => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
    const [categories, setCategories] = useState<string[]>(['Food', 'Cosmetics', 'Places']);
    const [loading, setLoading] = useState<boolean>(false);

    const refreshCategories = async (): Promise<void> => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(firestore, 'categories'));
            const loaded = querySnapshot.docs.map((doc) => doc.data().name as string);
            setCategories(prev => createCategoryList(prev, ...loaded));
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshCategories();
    }, []);

    const addCategory = async (newCategory: string): Promise<void> => {
        if (!newCategory.trim()) return;
        if (categories.includes(newCategory.trim())) return;
        try {
            setLoading(true);
            await addDoc(collection(firestore, 'categories'), { name: newCategory.trim() });
            setCategories(prev => createCategoryList(prev, newCategory.trim()));
        } catch (error) {
            console.error('Error adding category:', error);
        } finally {
            setLoading(false);
        }
    };

    const value: CategoriesContextProps = { categories, loading, addCategory, refreshCategories };

    return (
        <CategoriesContext.Provider value={value} >
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = (): CategoriesContextProps => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error('useCategories must be used within a CategoriesProvider');
    }
    return context;
};
