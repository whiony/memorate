import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from '@/services/firebaseConfig';

export interface Category {
    name: string;
}

export interface CategoriesContextProps {
    categories: Category[];
    loading: boolean;
    addCategory: (newCategory: string) => Promise<void>;
    refreshCategories: () => Promise<void>;
    deleteCategory: (categoryName: string) => Promise<void>;
    renameCategory: (oldName: string, newName: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const colRef = collection(firestore, 'categories');

    const refreshCategories = async () => {
        setLoading(true);
        const snap = await getDocs(colRef);
        const data = snap.docs.map(d => ({
            name: (d.data() as any).name as string,
        }))
        setCategories(data);
        setLoading(false);
    };

    const addCategory = async (newCategory: string) => {
        await addDoc(colRef, { name: newCategory });
        await refreshCategories();
    };

    const deleteCategory = async (categoryName: string) => {
        const q = query(colRef, where('name', '==', categoryName));
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
            await deleteDoc(docSnap.ref);
        }
        await refreshCategories();
    };

    const renameCategory = async (oldName: string, newName: string) => {
        const q = query(colRef, where('name', '==', oldName));
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
            await updateDoc(docSnap.ref, { name: newName });
        }
        await refreshCategories();
    };

    useEffect(() => { refreshCategories(); }, []);

    return (
        <CategoriesContext.Provider value={{ categories, loading, addCategory, refreshCategories, deleteCategory, renameCategory }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = (): CategoriesContextProps => {
    const ctx = useContext(CategoriesContext);
    if (!ctx) throw new Error('useCategories must be within CategoriesProvider');
    return ctx;
};
