import React, { useState } from 'react'
import {
    ScrollView,
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
    View,
    TextInput,
    Modal,
    FlatList,
} from 'react-native'
import type { Category } from '@/hooks/useCategories'
import { useCategories } from '@/hooks/useCategories'
import ActionCategoryModal from '@/modals/ActionCategoryModal'
import RenameCategoryModal from '@/modals/RenameCategoryModal'
import DeleteCategoryModal from '@/modals/DeleteCategoryModal'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const AnimatedBlur = Animated.createAnimatedComponent(BlurView)

interface Props {
    categories: Category[]
    selectedTags: string[]
    onApplyFilter: (tags: string[]) => void
}

const CategoryFilter: React.FC<Props> = ({
    categories,
    selectedTags,
    onApplyFilter,
}) => {
    const { renameCategory, deleteCategory } = useCategories()

    const [actionVisible, setActionVisible] = useState(false)
    const [renameVisible, setRenameVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [activeCat, setActiveCat] = useState('')
    const [searchVisible, setSearchVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [tempSelectedTags, setTempSelectedTags] = useState<string[]>(selectedTags)

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
        const updatedTags = tempSelectedTags.filter(tag => tag !== activeCat)
        setTempSelectedTags(updatedTags)
    }

    const openSearch = () => {
        setTempSelectedTags(selectedTags)
        setSearchVisible(true)
        setSearchQuery('')
    }

    const closeSearch = () => {
        setSearchVisible(false)
        setSearchQuery('')
    }

    const toggleTag = (tagName: string) => {
        if (tagName === 'All') {
            setTempSelectedTags([])
            return
        }
        
        setTempSelectedTags(prev => 
            prev.includes(tagName) 
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]
        )
    }

    const applyFilter = () => {
        onApplyFilter(tempSelectedTags)
        closeSearch()
    }

    const filteredCategories = categories.filter(cat => 
        cat.name !== 'All' && 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={openSearch} style={styles.searchButton}>
                    <AnimatedBlur
                        intensity={100}
                        tint="light"
                        style={styles.searchButtonBlur}
                    >
                        <LinearGradient
                            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                            style={StyleSheet.absoluteFill}
                        />
                        <Ionicons name="search" size={18} color="#000" />
                        <Text style={styles.searchButtonText}>
                            {selectedTags.length > 0 ? `Filtered by ${selectedTags.length} tags` : 'Search tags...'}
                        </Text>
                    </AnimatedBlur>
                </TouchableOpacity>
                
                {selectedTags.length > 0 && (
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={styles.selectedTagsScroll}
                        contentContainerStyle={styles.selectedTagsList}
                    >
                        {selectedTags.map(tag => (
                            <View key={tag} style={styles.selectedTagPill}>
                                <Text style={styles.selectedTagText}>{tag}</Text>
                            </View>
                        ))}
                    </ScrollView>
                )}
            </View>

            <Modal
                visible={searchVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={closeSearch}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={closeSearch}>
                            <Ionicons name="close" size={24} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Filter by Tags</Text>
                        <TouchableOpacity onPress={applyFilter} style={styles.applyButton}>
                            <Text style={styles.applyButtonText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchInputContainer}>
                        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search tags..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                    </View>

                    {tempSelectedTags.length > 0 && (
                        <View style={styles.selectedSection}>
                            <Text style={styles.sectionTitle}>Selected ({tempSelectedTags.length})</Text>
                            <ScrollView 
                                horizontal 
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.selectedTagsList}
                            >
                                <TouchableOpacity 
                                    onPress={() => setTempSelectedTags([])} 
                                    style={styles.clearAllButton}
                                >
                                    <Text style={styles.clearAllText}>Clear All</Text>
                                </TouchableOpacity>
                                {tempSelectedTags.map(tag => (
                                    <TouchableOpacity 
                                        key={tag} 
                                        style={styles.selectedModalTagPill}
                                        onPress={() => toggleTag(tag)}
                                    >
                                        <Text style={styles.selectedModalTagText}>{tag}</Text>
                                        <Ionicons name="close" size={16} color="#fff" />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    )}

                    <View style={styles.allTagsSection}>
                        <Text style={styles.sectionTitle}>All Tags</Text>
                        <FlatList
                            data={filteredCategories}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => {
                                const isSelected = tempSelectedTags.includes(item.name)
                                return (
                                    <TouchableOpacity
                                        style={[
                                            styles.tagListItem,
                                            isSelected && styles.tagListItemSelected
                                        ]}
                                        onPress={() => toggleTag(item.name)}
                                        onLongPress={() => handleLong(item.name)}
                                    >
                                        <Text style={[
                                            styles.tagListText,
                                            isSelected && styles.tagListTextSelected
                                        ]}>
                                            {item.name}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={20} color="#fff" />
                                        )}
                                    </TouchableOpacity>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </Modal>

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
    searchContainer: {
        paddingHorizontal: 8,
    },
    searchButton: {
        height: 36,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 8,
    },
    searchButtonBlur: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 8,
    },
    searchButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        flex: 1,
    },
    selectedTagsScroll: {
        maxHeight: 36,
    },
    selectedTagsList: {
        gap: 6,
        paddingRight: 8,
    },
    selectedTagPill: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
    },
    selectedTagText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    applyButton: {
        backgroundColor: '#6366F1',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    applyButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    selectedSection: {
        marginTop: 16,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    clearAllButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
    },
    clearAllText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
    selectedModalTagPill: {
        backgroundColor: '#6366F1',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        marginRight: 8,
        gap: 4,
    },
    selectedModalTagText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#fff',
    },
    allTagsSection: {
        flex: 1,
        marginTop: 16,
        paddingHorizontal: 16,
    },
    tagListItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 4,
        backgroundColor: '#f8f8f8',
    },
    tagListItemSelected: {
        backgroundColor: '#6366F1',
    },
    tagListText: {
        fontSize: 16,
        color: '#000',
    },
    tagListTextSelected: {
        color: '#fff',
        fontWeight: '600',
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
        color: '#000',
        textShadowColor: 'rgba(255,255,255,0.6)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
    },
    solidGlassBorder: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 18,
        borderWidth: 1.3,
        borderColor: 'rgba(255,255,255,0.35)',
        zIndex: 2,
    }
})

export default CategoryFilter
