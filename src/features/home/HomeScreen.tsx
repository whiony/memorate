// src/features/home/HomeScreen.tsx
import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
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
import { firestore } from '../../services/firebaseConfig'
import { deleteFromCloudinary } from '../../utils/deleteFromCloudinary'
import { useCategories } from '../../hooks/useCategories'
import type { Note, RootStackParamList } from '../../navigation/AppNavigator'
import NoteCard from './NoteCard'
import CategoryFilter from './CategoryFilter'
import { styles } from './HomeScreen.styles'
import { globalStyles } from '../../theme/theme'

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>

const HomeScreen: React.FC = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>()
    const [notes, setNotes] = useState<Note[]>([])
    const [category, setCategory] = useState<'All' | string>('All')
    const { categories } = useCategories()
    const swipeableRefs = useRef<Swipeable[]>([])

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

    const closeAll = () => {
        swipeableRefs.current.forEach(r => r?.close())
    }

    const handleDelete = async (noteId: string) => {
        const note = notes.find(n => n.id === noteId)
        if (note?.image?.startsWith('https://res.cloudinary.com')) {
            await deleteFromCloudinary(note.image)
        }
        await deleteDoc(doc(firestore, 'reviews', noteId))
    }

    const openEdit = (note: Note) =>
        navigation.navigate('AddNote', { note })

    const openDetail = (note: Note) =>
        navigation.navigate('NoteItem', { note })

    return (
        <View
            style={[
                globalStyles.screenBackground,
                { flex: 1, paddingHorizontal: 16 },
            ]}
        >
            <Text style={styles.header}>Memorate</Text>

            <View style={styles.categoryContainer}>
                <CategoryFilter
                    categories={['All', ...categories]}
                    selected={category}
                    onSelect={setCategory}
                />
            </View>

            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                onScroll={closeAll}
                onTouchStart={closeAll}
                renderItem={({ item, index }) => (
                    <TouchableWithoutFeedback
                        onPress={() => openDetail(item)}
                    >
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

            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddNote', {})}
            >
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen
