import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from '@/services/firebaseConfig';
import { useAuth } from '@/contexts/AuthContext';

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
    const { user } = useAuth();
    const colRef = collection(firestore, 'categories');

    const DEFAULT_CATEGORIES = ['Food', 'Drink', 'Event'];

    const initializeDefaultCategories = async (userId: string) => {
        const q = query(colRef, where('userId', '==', userId));
        const snap = await getDocs(q);
        
        if (snap.empty) {
            for (const categoryName of DEFAULT_CATEGORIES) {
                await addDoc(colRef, { 
                    name: categoryName,
                    userId: userId 
                });
            }
        }
    };

    const refreshCategories = async () => {
        if (!user) return;
        
        setLoading(true);
        const q = query(colRef, where('userId', '==', user.uid));
        const snap = await getDocs(q);
        const data = snap.docs.map(d => ({
            name: (d.data() as any).name as string,
        }))
        setCategories(data);
        setLoading(false);
    };

    const addCategory = async (newCategory: string) => {
        if (!user) return;
        await addDoc(colRef, { 
            name: newCategory,
            userId: user.uid 
        });
        await refreshCategories();
    };

    const deleteCategory = async (categoryName: string) => {
        if (!user) return;
        const q = query(colRef, 
            where('name', '==', categoryName),
            where('userId', '==', user.uid)
        );
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
            await deleteDoc(docSnap.ref);
        }
        await refreshCategories();
    };

    const renameCategory = async (oldName: string, newName: string) => {
        if (!user) return;
        const q = query(colRef, 
            where('name', '==', oldName),
            where('userId', '==', user.uid)
        );
        const snap = await getDocs(q);
        for (const docSnap of snap.docs) {
            await updateDoc(docSnap.ref, { name: newName });
        }
        await refreshCategories();
    };

    useEffect(() => {
        if (user) {
            initializeDefaultCategories(user.uid).then(() => {
                refreshCategories();
            });
        }
    }, [user]);

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
