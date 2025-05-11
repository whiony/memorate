import React, { useRef, useState } from 'react'
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
} from 'react-native'
import type { Category } from '@/hooks/useCategories'
import { useCategories } from '@/hooks/useCategories'
import ActionCategoryModal from '@/modals/ActionCategoryModal'
import RenameCategoryModal from '@/modals/RenameCategoryModal'
import DeleteCategoryModal from '@/modals/DeleteCategoryModal'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

const AnimatedBlur = Animated.createAnimatedComponent(BlurView)

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

    const scale = useRef(new Animated.Value(1)).current

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

                    const background = isSel
                        ? 'rgba(255,255,255,0.4)'
                        : `${cat.color}66`

                    return (
                        <Animated.View
                            key={cat.name}
                            style={[
                                styles.pillWrapper,
                                isSel && { transform: [{ scale: 1.04 }] },
                            ]}
                        >
                            <AnimatedBlur
                                intensity={100}
                                tint="light"
                                style={[
                                    styles.pill,
                                    {
                                        backgroundColor: background,
                                        borderWidth: isSel ? 1 : 0,
                                        borderColor: 'rgba(255,255,255,0.5)',
                                    },
                                ]}
                            >
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0)']}
                                    style={StyleSheet.absoluteFill}
                                />
                                <TouchableOpacity
                                    onPress={() => {
                                        Animated.sequence([
                                            Animated.spring(scale, { toValue: 1.04, useNativeDriver: true }),
                                            Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
                                        ]).start()
                                        onSelect(cat.name)
                                    }}
                                    onLongPress={() => handleLong(cat.name)}
                                    style={styles.touchable}
                                >
                                    <Text style={[styles.text, isSel && styles.selectedText]}>
                                        {cat.name}
                                    </Text>
                                </TouchableOpacity>
                            </AnimatedBlur>
                        </Animated.View>
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
        flexDirection: 'row',
    },
    pillWrapper: {
        borderRadius: 18,
        marginRight: 8,
        overflow: 'hidden',
    },
    pill: {
        height: 36,
        borderRadius: 18,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        paddingHorizontal: 20,
        paddingVertical: 6,
        borderRadius: 18,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
    },
    selectedText: {
        fontWeight: '700',
        color: '#000',
        textShadowColor: 'rgba(255,255,255,0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
})


export default CategoryFilter
