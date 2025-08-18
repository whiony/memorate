import React, { useEffect, useState, useRef, useMemo } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    Alert
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import type { StackNavigationProp } from '@react-navigation/stack'
import {
    collection,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
    getDoc,
} from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import { deleteFromCloudinary } from '@/utils/deleteFromCloudinary'
import { Category, useCategories } from '@/hooks/useCategories'
import type { Note, RootStackParamList } from '@/navigation/AppNavigator'
import NoteCard from './components/NoteCard/NoteCard'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import EmptyState from './components/EmptyState/EmptyState'
import { styles } from './HomeScreen.styles'
import { useSort } from '@/contexts/SortContext'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'
import RenameCategoryModal from '@/modals/RenameCategoryModal'
import DeleteCategoryModal from '@/modals/DeleteCategoryModal'
import { useAuth } from '@/contexts/AuthContext'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const [notes, setNotes] = useState<Note[]>([])
    const [selectedTags, setSelectedTags] = useState<string[]>([])
    const { sortBy, sortOrder } = useSort()
    const { categories: loadedCats, renameCategory, deleteCategory } = useCategories()
    const swipeableRefs = useRef<Swipeable[]>([])
    const { user } = useAuth()
    const [displayName, setDisplayName] = useState('')

    const [renameVisible, setRenameVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [activeCat] = useState('')

    const allCats: Category[] = [
        { name: 'All' },
        ...loadedCats
    ]

    useEffect(() => {
        if (!user) return

        const q = query(
            collection(firestore, 'reviews'),
            where('userId', '==', user.uid)
        )

        const unsub = onSnapshot(q, snap => {
            const loaded = snap.docs.map(d => {
                const data = d.data()

                const created = data.created?.toDate
                    ? data.created.toDate()
                    : new Date(data.created as any)

                const edited = data.edited?.toDate
                    ? data.edited.toDate()
                    : data.edited
                        ? new Date(data.edited)
                        : undefined

                return {
                    id: d.id,
                    ...data,
                    created,
                    edited,
                    tags: data.tags ?? (data.category ? [data.category] : []),
                } as Note
            })
            setNotes(loaded)
        })

        return unsub
    }, [user])

    useEffect(() => {
        const fetchDisplayName = async () => {
            if (!user) return

            try {
                const userDocRef = doc(firestore, 'users', user.uid)
                const userDoc = await getDoc(userDocRef)

                if (userDoc.exists() && userDoc.data().displayName) {
                    setDisplayName(userDoc.data().displayName)
                } else {
                    setDisplayName(user.email?.split('@')[0] || 'User')
                }
            } catch (error) {
                console.error('Error fetching display name:', error)
                setDisplayName(user.email?.split('@')[0] || 'User')
            }
        }

        fetchDisplayName()
    }, [user])

    const closeAll = () => swipeableRefs.current.forEach(r => r?.close())


    const filteredAndSortedNotes = useMemo(() => {
        let filtered = notes
        if (selectedTags.length > 0) {
            filtered = notes.filter(note =>
                selectedTags.every(tag => note.tags.includes(tag))
            )
        }

        const dir = sortOrder === 'asc' ? 1 : -1
        return filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price': return dir * ((a.price || 0) - (b.price || 0))
                case 'rating': return dir * (b.rating - a.rating)
                case 'date': {
                    const getTime = (n: Note) =>
                        (n.edited ?? n.created)?.getTime() ?? 0
                    return dir * (getTime(b) - getTime(a))
                }
            }
        })
    }, [notes, selectedTags, sortBy, sortOrder])

    const handleDelete = async (noteId: string) => {
        const note = notes.find(n => n.id === noteId)
        if (note?.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image)
        }
        await deleteDoc(doc(firestore, 'reviews', noteId))
    }

    const openEdit = (note: Note) =>
        navigation.navigate('AddNote', {
            note: {
                ...note,
                created: note.created!.toISOString(),
                edited: note.edited?.toISOString(),
            },
        })

    const openDetail = (note: Note) =>
        navigation.navigate('NoteDetails', {
            note: {
                ...note,
                created: note.created!.toISOString(),
                edited: note.edited?.toISOString(),
            }
        })

    const handleTagAction = async (action: 'rename' | 'delete', tagName: string, newName?: string) => {
        if (action === 'rename' && newName) {
            if (selectedTags.includes(tagName)) {
                const updatedTags = selectedTags.map(tag =>
                    tag === tagName ? newName : tag
                )
                setSelectedTags(updatedTags)
            }
        } else if (action === 'delete') {
            const updatedTags = selectedTags.filter(tag => tag !== tagName)
            setSelectedTags(updatedTags)
        }
    }


    const confirmRename = async (newName: string) => {
        setRenameVisible(false)
        if (newName && newName !== activeCat) {
            await renameCategory(activeCat, newName)
            if (selectedTags.includes(activeCat)) {
                const updatedTags = selectedTags.map(tag =>
                    tag === activeCat ? newName : tag
                )
                setSelectedTags(updatedTags)
            }
        }
    }

    const confirmDelete = async () => {
        setDeleteVisible(false)
        await deleteCategory(activeCat)
        const updatedTags = selectedTags.filter(tag => tag !== activeCat)
        setSelectedTags(updatedTags)
    }

    const handleProfile = () => {
        navigation.navigate('Profile')
    }

    return (
        <>
            <LinearGradient
                colors={['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8']}
                style={{ flex: 1 }}
                start={{ x: 0.2, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View
                    style={[
                        { flex: 1, paddingHorizontal: 16 },
                    ]}
                >
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContent}>
                            <View style={styles.headerLeft}>
                                <Text style={styles.greeting}>
                                    {new Date().getHours() < 12
                                        ? 'Good morning'
                                        : new Date().getHours() < 18
                                            ? 'Good afternoon'
                                            : 'Good evening'}
                                </Text>
                                <Text style={styles.userEmail}>{displayName || 'User'}</Text>
                            </View>
                            <View style={styles.headerRight}>
                                <View style={styles.statsContainer}>
                                    <Text style={styles.statsNumber}>{filteredAndSortedNotes.length}</Text>
                                    <Text style={styles.statsLabel}>
                                        {filteredAndSortedNotes.length === 1 ? 'Review' : 'Reviews'}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.categoryContainer}>
                        <CategoryFilter
                            categories={allCats}
                            selectedTags={selectedTags}
                            onApplyFilter={setSelectedTags}
                            onTagAction={handleTagAction}
                        />
                    </View>

                    {filteredAndSortedNotes.length === 0 ? (
                        <EmptyState onAddNote={() => navigation.navigate('AddNote', {})} />
                    ) : (
                        <FlatList
                            data={filteredAndSortedNotes}
                            keyExtractor={item => item.id}
                            onScroll={closeAll}
                            onTouchStart={closeAll}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <TouchableWithoutFeedback onPress={() => openDetail(item)}>
                                    <View>
                                        <NoteCard
                                            ref={ref => {
                                                swipeableRefs.current[index] = ref!
                                            }}
                                            note={item}
                                            onEdit={openEdit}
                                            onDelete={handleDelete}
                                            onPress={openDetail}
                                        />
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            contentContainerStyle={styles.listContent}
                        />
                    )}


                    <View style={styles.tabBarContainer}>
                        <View style={styles.tabBarBackgroundWrapper}>
                            <BlurView intensity={80} tint="light" style={styles.tabBarBackground}>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.15)']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={StyleSheet.absoluteFill}
                                />
                            </BlurView>
                        </View>

                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('FilterModal', { current: sortBy })}
                        >
                            <MaterialIcons name="sort" size={24} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.floatingAddButton} onPress={() => navigation.navigate('AddNote', {})}>
                            <BlurView intensity={100} tint="light" style={styles.floatingButtonGlass}>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.4)', 'rgba(255,255,255,0.2)']}
                                    style={StyleSheet.absoluteFill}
                                />
                                <Ionicons name="add" size={28} color="#fff" />
                            </BlurView>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.iconButton, styles.rightIcon]} onPress={handleProfile}>
                            <Ionicons name="person-outline" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

                </View>

            </LinearGradient>

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

export default HomeScreen
