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
    orderBy,
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
import { colors } from '@/theme/index'
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
        { name: 'All', color: colors.primary },
        ...loadedCats
    ]

    useEffect(() => {
        let base: Query<DocumentData> = collection(firestore, 'reviews')
        if (category !== 'All') {
            base = query(base, where('category', '==', category))
        }
        const q = query(base, orderBy('created', 'desc'))

        const unsubscribe = onSnapshot(q, snap => {
            const loaded = snap.docs.map(d => {
                const data = d.data()
                return {
                    id: d.id,
                    ...data,
                    created: data.created?.toDate
                        ? data.created.toDate()
                        : new Date(data.created as any),
                } as Note
            })
            setNotes(loaded)
        })

        return unsubscribe
    }, [category])

    const closeAll = () => swipeableRefs.current.forEach(r => r?.close())

    const sortedNotes = useMemo(() => {
        const dir = sortOrder === 'asc' ? 1 : -1
        return [...notes].sort((a, b) => {
            switch (sortBy) {
                case 'price': return dir * ((a.price || 0) - (b.price || 0))
                case 'rating': return dir * (b.rating - a.rating)
                case 'date': {
                    const ta = new Date(a.created!).getTime()
                    const tb = new Date(b.created!).getTime()
                    return dir * (tb - ta)
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
            },
        })

    const openDetail = (note: Note) =>
        navigation.navigate('NoteDetails', {
            note: {
                ...note,
                created: note.created!.toISOString(),
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


                <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNote', {})}>
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <BlurView intensity={70} tint="light" style={styles.glassButton}>
                        <View style={styles.glassBorderOverlay} />
                        <Ionicons name="add-outline" size={32} color="#fff" />
                    </BlurView>
                </TouchableOpacity>

                <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('FilterModal', { current: sortBy })}>
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <BlurView intensity={70} tint="light" style={styles.glassButton}>
                        <View style={styles.glassBorderOverlay} />
                        <MaterialIcons name="sort" size={24} color="#fff" />
                    </BlurView>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingsButton} >
                    <LinearGradient
                        colors={['rgba(255,255,255,1)', 'rgba(255,255,255,.6)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0)']}
                        style={StyleSheet.absoluteFill}
                    />
                    <BlurView intensity={70} tint="light" style={styles.glassButton}>
                        <View style={styles.glassBorderOverlay} />
                        <Ionicons name="settings-outline" size={24} color="#fff" />
                    </BlurView>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default HomeScreen
