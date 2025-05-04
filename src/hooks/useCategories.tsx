import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from '@services/firebaseConfig';

export interface CategoriesContextProps {
    categories: string[];
    loading: boolean;
    addCategory: (newCategory: string) => Promise<void>;
    refreshCategories: () => Promise<void>;
    deleteCategory: (category: string) => Promise<void>;
    renameCategory: (oldName: string, newName: string) => Promise<void>;
}

const CategoriesContext = createContext<CategoriesContextProps | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const colRef = collection(firestore, 'categories');

    const refreshCategories = async () => {
        setLoading(true);
        const snap = await getDocs(colRef);
        setCategories(snap.docs.map(d => d.data().name));
        setLoading(false);
    };

    const addCategory = async (newCategory: string) => {
        await addDoc(colRef, { name: newCategory });
        await refreshCategories();
    };

    const deleteCategory = async (category: string) => {
        const q = query(colRef, where('name', '==', category));
        const snap = await getDocs(q);
        for (let docSnap of snap.docs) {
            await deleteDoc(docSnap.ref);
        }
        await refreshCategories();
    };

    const renameCategory = async (oldName: string, newName: string) => {
        const q = query(colRef, where('name', '==', oldName));
        const snap = await getDocs(q);
        for (let docSnap of snap.docs) {
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