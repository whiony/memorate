import React, { useState } from 'react'
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'
import type { Category } from '@/hooks/useCategories'
import { useCategories } from '@/hooks/useCategories'
import ActionCategoryModal from '@/modals/ActionCategoryModal'
import RenameCategoryModal from '@/modals/RenameCategoryModal'
import DeleteCategoryModal from '@/modals/DeleteCategoryModal'

interface Props {
    categories: Category[]
    selected: string
    onSelect: (cat: string) => void
}

const CategoryFilter: React.FC<Props> = ({
    categories,
    selected,
    onSelect,
}) => {
    const { renameCategory, deleteCategory } = useCategories()

    const [actionVisible, setActionVisible] = useState(false)
    const [renameVisible, setRenameVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [activeCat, setActiveCat] = useState('')

    const handleLong = (catName: string) => {
        if (catName === 'All') return
        setActiveCat(catName)
        setActionVisible(true)
    }

    const onRename = () => {
        setActionVisible(false)
        setRenameVisible(true)
    }
    const onDelete = () => {
        setActionVisible(false)
        setDeleteVisible(true)
    }

    const confirmRename = async (newName: string) => {
        setRenameVisible(false)
        if (newName && newName !== activeCat) {
            await renameCategory(activeCat, newName)
            onSelect(newName)
        }
    }

    const confirmDelete = async () => {
        setDeleteVisible(false)
        await deleteCategory(activeCat)
        onSelect('All')
    }

    return (
        <>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.list}
            >
                {categories.map(cat => {
                    const isSel = cat.name === selected

                    return (
                        <TouchableOpacity
                            key={cat.name}
                            onPress={() => onSelect(cat.name)}
                            onLongPress={() => handleLong(cat.name)}
                            style={[
                                styles.pill,
                                {
                                    backgroundColor: isSel ? '#fff' : cat.color,
                                    borderColor: isSel ? cat.color : 'transparent',
                                    borderWidth: 2,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.text,
                                    { color: isSel ? cat.color : '#000' },
                                ]}
                            >
                                {cat.name}
                            </Text>
                        </TouchableOpacity>
                    )
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
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    pill: {
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        paddingHorizontal: 40,
        marginRight: 8,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
    },
})

export default CategoryFilter
