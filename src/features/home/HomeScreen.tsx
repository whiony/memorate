import React, { useEffect, useState, useRef, useMemo } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    StyleSheet
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
    Query,
    DocumentData,
} from 'firebase/firestore'
import { firestore } from '@/services/firebaseConfig'
import { deleteFromCloudinary } from '@/utils/deleteFromCloudinary'
import { Category, useCategories } from '@/hooks/useCategories'
import type { Note, RootStackParamList } from '@/navigation/AppNavigator'
import NoteCard from './components/NoteCard/NoteCard'
import CategoryFilter from './components/CategoryFilter/CategoryFilter'
import { styles } from './HomeScreen.styles'
import { useSort } from '@/contexts/SortContext'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { Ionicons } from '@expo/vector-icons'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const [notes, setNotes] = useState<Note[]>([])
    const [category, setCategory] = useState<'All' | string>('All')
    const { sortBy, sortOrder } = useSort()
    const { categories: loadedCats } = useCategories()
    const swipeableRefs = useRef<Swipeable[]>([])

    const allCats: Category[] = [
        { name: 'All' },
        ...loadedCats
    ]

    useEffect(() => {
        let base: Query<DocumentData> = collection(firestore, 'reviews')

        if (category !== 'All') {
            base = query(base, where('tags', 'array-contains', category))
        }

        const q = query(base)

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
    }, [category])

    const closeAll = () => swipeableRefs.current.forEach(r => r?.close())

    const sortedNotes = useMemo(() => {
        const dir = sortOrder === 'asc' ? 1 : -1
        return [...notes].sort((a, b) => {
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
    }, [notes, sortBy, sortOrder])

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

    return (
        <LinearGradient
            colors={['#FFE29F', '#FFA99F', '#FF719A', '#A18CD1']}
            style={{ flex: 1 }}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 1, y: 1 }}
        >
            <View
                style={[
                    { flex: 1, paddingHorizontal: 16 },
                ]}
            >
                <Text style={styles.header}>Memorate</Text>

                <View style={styles.categoryContainer}>
                    <CategoryFilter
                        categories={allCats}
                        selected={category}
                        onSelect={setCategory}
                    />
                </View>

                <FlatList
                    data={sortedNotes}
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


                <View style={styles.tabBarContainer}>
                    <View style={styles.tabBarBackgroundWrapper}>
                        <BlurView intensity={70} tint="light" style={styles.tabBarBackground}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />
                        </BlurView>
                    </View>

                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('FilterModal', { current: sortBy })}>
                        <MaterialIcons name="sort" size={24} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.floatingAddButton} onPress={() => navigation.navigate('AddNote', {})}>
                        <BlurView intensity={100} tint="light" style={styles.floatingButtonGlass}>
                            <Ionicons name="add-outline" size={28} color="#fff" />
                        </BlurView>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.iconButton, styles.rightIcon]}>
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>
        </LinearGradient>
    )
}

export default HomeScreen
