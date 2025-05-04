import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { categoryColors } from '@utils/categoryColors';
import { useCategories } from '@hooks/useCategories';
import ActionCategoryModal from '@modals/ActionCategoryModal';
import RenameCategoryModal from '@modals/RenameCategoryModal';
import DeleteCategoryModal from '@modals/DeleteCategoryModal';

interface Props {
    categories: string[];
    selected: string;
    onSelect: (cat: string) => void;
}

const CategoryFilter: React.FC<Props> = ({ categories, selected, onSelect }) => {
    const { renameCategory, deleteCategory } = useCategories();
    const [actionVisible, setActionVisible] = useState(false);
    const [renameVisible, setRenameVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [activeCat, setActiveCat] = useState('');

    const handleLong = (cat: string) => {
        if (cat === 'All') return;
        setActiveCat(cat);
        setActionVisible(true);
    };

    const onRename = () => { setActionVisible(false); setRenameVisible(true); };
    const onDelete = () => { setActionVisible(false); setDeleteVisible(true); };

    const confirmRename = async (newName: string) => {
        setRenameVisible(false);
        if (newName && newName !== activeCat) {
            await renameCategory(activeCat, newName);
            onSelect(newName);
        }
    };

    const confirmDelete = async () => {
        setDeleteVisible(false);
        await deleteCategory(activeCat);
        onSelect('All');
    };

    return (
        <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                {categories.map(cat => {
                    const isSel = cat === selected;
                    const bg = categoryColors[cat] || '#aaa';
                    return (
                        <TouchableOpacity
                            key={cat}
                            onPress={() => onSelect(cat)}
                            onLongPress={() => handleLong(cat)}
                            style={[styles.pill, { backgroundColor: bg, opacity: isSel ? 1 : 0.7 }]}>
                            <Text style={styles.text}>{cat}</Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            <ActionCategoryModal
                visible={actionVisible}
                category={activeCat}
                onCancel={() => setActionVisible(false)}
                onRename={onRename}
                onDelete={onDelete}
            />
            <RenameCategoryModal
                visible={renameVisible}
                initialName={activeCat}
                onCancel={() => setRenameVisible(false)}
                onSubmit={confirmRename}
            />
            <DeleteCategoryModal
                visible={deleteVisible}
                category={activeCat}
                onCancel={() => setDeleteVisible(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

const styles = StyleSheet.create({
    pill: { height: 36, borderRadius: 18, justifyContent: 'center', paddingHorizontal: 40, marginRight: 8 },
    text: { color: '#000', fontSize: 14 },
});

export default CategoryFilter;