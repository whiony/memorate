import React, { useState, useRef, useEffect } from 'react'
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
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { styles as additionalStyles } from './CategoryFilter.styles'
import { useTheme } from '@/contexts/ThemeContext'
import { lightTheme, darkTheme } from '@/theme/colors'

const AnimatedBlur = Animated.createAnimatedComponent(BlurView)

interface Props {
    categories: Category[]
    selectedTags: string[]
    onApplyFilter: (tags: string[], searchQuery?: string) => void
    onTagAction: (action: 'rename' | 'delete', tagName: string, newName?: string) => void
    notes?: any[]
    currentSearchQuery?: string
}

const CategoryFilter: React.FC<Props> = ({
    categories,
    selectedTags,
    onApplyFilter,
    onTagAction,
    notes = [],
    currentSearchQuery = '',
}) => {
    const { addCategory, renameCategory, deleteCategory } = useCategories()
    const { isDark } = useTheme()
    const colors = isDark ? darkTheme : lightTheme

    const [searchVisible, setSearchVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [tempSelectedTags, setTempSelectedTags] = useState<string[]>(selectedTags)
    const [newTagName, setNewTagName] = useState('')
    const [dropdownVisible, setDropdownVisible] = useState('')
    const [editingTag, setEditingTag] = useState('')
    const [editingValue, setEditingValue] = useState('')
    const [deletingTag, setDeletingTag] = useState('')

    const selectedSectionHeight = useRef(new Animated.Value(tempSelectedTags.length > 0 ? 1 : 0)).current

    const handleLong = (catName: string) => {
        if (catName === 'All') return
        setDropdownVisible(catName)
    }

    const handleDropdownAction = (action: 'rename' | 'delete', tagName: string) => {
        setDropdownVisible('')
        if (action === 'rename') {
            setEditingTag(tagName)
            setEditingValue(tagName)
        } else if (action === 'delete') {
            setDeletingTag(tagName)
        }
    }

    const handleSaveEdit = async () => {
        if (editingValue.trim() && editingValue !== editingTag) {
            await renameCategory(editingTag, editingValue.trim())

            onTagAction('rename', editingTag, editingValue.trim())

            if (tempSelectedTags.includes(editingTag)) {
                const updatedTags = tempSelectedTags.map(tag =>
                    tag === editingTag ? editingValue.trim() : tag
                )
                setTempSelectedTags(updatedTags)
            }
        }
        setEditingTag('')
        setEditingValue('')
    }

    const handleCancelEdit = () => {
        setEditingTag('')
        setEditingValue('')
    }

    const handleConfirmDelete = async () => {
        await deleteCategory(deletingTag)

        onTagAction('delete', deletingTag)

        const updatedTags = tempSelectedTags.filter(tag => tag !== deletingTag)
        setTempSelectedTags(updatedTags)
        setDeletingTag('')
    }

    const handleCancelDelete = () => {
        setDeletingTag('')
    }


    const openSearch = () => {
        setTempSelectedTags(selectedTags)
        setSearchVisible(true)
        setSearchQuery(currentSearchQuery)
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

        setTempSelectedTags(prev => {
            const newTags = prev.includes(tagName)
                ? prev.filter(t => t !== tagName)
                : [...prev, tagName]

            Animated.timing(selectedSectionHeight, {
                toValue: newTags.length > 0 ? 1 : 0,
                duration: 300,
                useNativeDriver: false,
            }).start()

            return newTags
        })
    }

    const handleAddNewTag = async () => {
        const tagName = newTagName.trim()
        if (!tagName) return

        if (!categories.find(cat => cat.name === tagName)) {
            await addCategory(tagName)
        }

        if (!tempSelectedTags.includes(tagName)) {
            toggleTag(tagName)
        }

        setNewTagName('')
    }

    const applyFilter = () => {
        onApplyFilter(tempSelectedTags, searchQuery)
        closeSearch()
    }

    const filteredCategories = categories.filter(cat =>
        cat.name !== 'All' &&
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const matchingNotes = notes.filter(note => {
        const query = searchQuery.toLowerCase()
        return (
            note.name?.toLowerCase().includes(query) ||
            note.comment?.toLowerCase().includes(query)
        )
    })

    const hasContentMatches = searchQuery.trim() && matchingNotes.length > 0

    useEffect(() => {
        Animated.timing(selectedSectionHeight, {
            toValue: tempSelectedTags.length > 0 ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }, [tempSelectedTags.length])


    return (
        <>
            <View style={styles.searchContainer}>
                <TouchableOpacity onPress={openSearch} style={styles.searchButton}>
                    <AnimatedBlur
                        intensity={100}
                        tint={isDark ? "dark" : "light"}
                        style={styles.searchButtonBlur}
                    >
                        <LinearGradient
                            colors={colors.searchButtonGradient}
                            style={StyleSheet.absoluteFill}
                        />
                        <Ionicons name="search" size={18} color={colors.text} />
                        <Text style={[styles.searchButtonText, { color: colors.text }]}>
                            {currentSearchQuery ? `"${currentSearchQuery}"` : selectedTags.length > 0 ? `${selectedTags.length} tags selected` : 'Search reviews...'}
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
                            <View key={tag} style={[styles.selectedTagPill, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
                                <Text style={[styles.selectedTagText, { color: colors.text }]}>{tag}</Text>
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
                <TouchableOpacity
                    style={[styles.modalContainer, { backgroundColor: colors.modalBackground }]}
                    activeOpacity={1}
                    onPress={() => setDropdownVisible('')}
                >
                    <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                        <TouchableOpacity onPress={closeSearch}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </TouchableOpacity>
                        <Text style={[styles.modalTitle, { color: colors.text }]}>Search & Filter</Text>
                        <TouchableOpacity onPress={applyFilter} style={[styles.applyButton, { backgroundColor: colors.accent, borderColor: colors.border, shadowColor: colors.accent }]}>
                            <Text style={styles.applyButtonText}>Filter</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.searchInputContainer, { backgroundColor: colors.searchBackground }]}>
                        <Ionicons name="search" size={20} color={colors.textMuted} style={styles.searchIcon} />
                        <TextInput
                            style={[styles.searchInput, { color: colors.text }]}
                            placeholder="Search reviews & tags..."
                            placeholderTextColor={colors.textMuted}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            autoFocus
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity 
                                onPress={() => setSearchQuery('')} 
                                style={styles.clearSearchButton}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                            >
                                <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={[styles.addTagContainer, { backgroundColor: colors.searchBackground }]}>
                        <TextInput
                            style={[styles.addTagInput, { color: colors.text }]}
                            placeholder="Create new tag..."
                            placeholderTextColor={colors.textMuted}
                            value={newTagName}
                            onChangeText={setNewTagName}
                            onSubmitEditing={handleAddNewTag}
                        />
                        <TouchableOpacity
                            onPress={handleAddNewTag}
                            style={[styles.addTagButton, !newTagName.trim() && styles.addTagButtonDisabled]}
                            disabled={!newTagName.trim()}
                        >
                            <Ionicons name="add" size={20} color={newTagName.trim() ? colors.accent : colors.textMuted} />
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={[
                        styles.selectedSection,
                        {
                            maxHeight: selectedSectionHeight.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 200],
                            }),
                            opacity: selectedSectionHeight,
                        }
                    ]}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Selected ({tempSelectedTags.length})</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.selectedTagsList}
                        >
                            <TouchableOpacity
                                onPress={() => setTempSelectedTags([])}
                                style={[styles.clearAllButton, { backgroundColor: colors.searchBackground }]}
                            >
                                <Text style={[styles.clearAllText, { color: colors.textSecondary }]}>Clear All</Text>
                            </TouchableOpacity>
                            {tempSelectedTags.map(tag => (
                                <TouchableOpacity
                                    key={tag}
                                    style={[styles.selectedModalTagPill, { backgroundColor: colors.accent }]}
                                    onPress={() => toggleTag(tag)}
                                >
                                    <Text style={styles.selectedModalTagText}>{tag}</Text>
                                    <Ionicons name="close" size={16} color="#fff" />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>

                    {hasContentMatches && (
                        <View style={additionalStyles.contentMatchesSection}>
                            <Text style={[styles.sectionTitle, { color: colors.text }]}>
                                Found in {matchingNotes.length} review{matchingNotes.length !== 1 ? 's' : ''}
                            </Text>
                            <Text style={[additionalStyles.contentMatchHint, { color: colors.textSecondary }]}>
                                Content matches will be included in results
                            </Text>
                        </View>
                    )}

                    <View style={styles.allTagsSection}>
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>Tags</Text>
                        <FlatList
                            data={filteredCategories}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => {
                                const isSelected = tempSelectedTags.includes(item.name)
                                const showDropdown = dropdownVisible === item.name
                                const isEditing = editingTag === item.name
                                const isDeleting = deletingTag === item.name

                                return (
                                    <View style={styles.tagItemWrapper}>
                                        {isEditing ? (
                                            <View style={[
                                                styles.tagListItem,
                                                { backgroundColor: colors.searchBackground },
                                                isSelected && { backgroundColor: colors.accent },
                                                styles.editingItem,
                                                { borderColor: colors.accent }
                                            ]}>
                                                <TextInput
                                                    style={[
                                                        styles.editInput,
                                                        { color: colors.text },
                                                        isSelected && { color: '#fff' }
                                                    ]}
                                                    value={editingValue}
                                                    onChangeText={setEditingValue}
                                                    autoFocus
                                                    onSubmitEditing={handleSaveEdit}
                                                />
                                                <View style={styles.editActions}>
                                                    <TouchableOpacity onPress={handleSaveEdit} style={styles.editActionButton}>
                                                        <Ionicons name="checkmark" size={18} color="#4CAF50" />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={handleCancelEdit} style={styles.editActionButton}>
                                                        <Ionicons name="close" size={18} color="#f44336" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ) : isDeleting ? (
                                            <View style={[
                                                styles.tagListItem,
                                                isSelected && styles.tagListItemSelected,
                                                styles.deletingItem
                                            ]}>
                                                <Text style={[
                                                    styles.tagListText,
                                                    isSelected && styles.tagListTextSelected,
                                                    styles.deletingText
                                                ]}>
                                                    Delete "{item.name}"?
                                                </Text>
                                                <View style={styles.deleteActions}>
                                                    <TouchableOpacity onPress={handleConfirmDelete} style={styles.deleteActionButton}>
                                                        <Ionicons name="checkmark" size={18} color="#fff" />
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={handleCancelDelete} style={styles.deleteActionButton}>
                                                        <Ionicons name="close" size={18} color="#fff" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ) : (
                                            <TouchableOpacity
                                                style={[
                                                    styles.tagListItem,
                                                    { backgroundColor: colors.searchBackground },
                                                    isSelected && { backgroundColor: colors.accent }
                                                ]}
                                                onPress={() => toggleTag(item.name)}
                                                onLongPress={() => handleLong(item.name)}
                                                delayLongPress={300}
                                            >
                                                <Text style={[
                                                    styles.tagListText,
                                                    { color: colors.text },
                                                    isSelected && { color: '#fff', fontWeight: '600' }
                                                ]}>
                                                    {item.name}
                                                </Text>
                                                {isSelected && (
                                                    <Ionicons name="checkmark" size={20} color="#fff" />
                                                )}
                                            </TouchableOpacity>
                                        )}

                                        {showDropdown && !isEditing && !isDeleting && (
                                            <View style={[styles.dropdown, { backgroundColor: colors.modalBackground, borderColor: colors.border }]}>
                                                <TouchableOpacity
                                                    style={[styles.dropdownItem, { borderBottomColor: colors.border }]}
                                                    onPress={() => handleDropdownAction('rename', item.name)}
                                                >
                                                    <Text style={[styles.dropdownText, { color: colors.text }]}>Rename</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.dropdownItem, styles.dropdownItemLast]}
                                                    onPress={() => handleDropdownAction('delete', item.name)}
                                                >
                                                    <Text style={[styles.dropdownText, styles.deleteText]}>Delete</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    </View>
                                )
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>

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
    addTagContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        marginHorizontal: 16,
        marginTop: 12,
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    addTagInput: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#000',
    },
    addTagButton: {
        padding: 8,
        borderRadius: 8,
    },
    addTagButtonDisabled: {
        opacity: 0.5,
    },
    clearSearchButton: {
        padding: 4,
        marginLeft: 8,
    },
    selectedSection: {
        marginTop: 16,
        paddingHorizontal: 16,
        overflow: 'hidden',
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
    tagItemWrapper: {
        position: 'relative',
    },
    dropdown: {
        position: 'absolute',
        top: '100%',
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 1000,
        minWidth: 120,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    dropdownItemLast: {
        borderBottomWidth: 0,
    },
    dropdownText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    deleteText: {
        color: '#FF3B30',
    },
    editingItem: {
        backgroundColor: '#f0f8ff',
        borderColor: '#6366F1',
        borderWidth: 2,
    },
    editInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        backgroundColor: 'transparent',
        paddingVertical: 0,
    },
    editInputSelected: {
        color: '#fff',
    },
    editActions: {
        flexDirection: 'row',
        gap: 8,
    },
    editActionButton: {
        padding: 4,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    deletingItem: {
        backgroundColor: '#ffebee',
        borderColor: '#f44336',
        borderWidth: 2,
    },
    deletingText: {
        color: '#d32f2f',
        fontWeight: '600',
    },
    deleteActions: {
        flexDirection: 'row',
        gap: 8,
    },
    deleteActionButton: {
        padding: 6,
        borderRadius: 4,
        backgroundColor: 'rgba(244, 67, 54, 0.8)',
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
