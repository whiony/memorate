import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
} from 'react-native'
import { useNavigation, RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'
import StarRating from '../../components/StarRating'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { styles } from './NoteItem.styles'

export type NoteItemNavigationProp = StackNavigationProp<
    RootStackParamList,
    'NoteItem'
>
export type NoteItemRouteProp = RouteProp<RootStackParamList, 'NoteItem'>

interface Props {
    route: NoteItemRouteProp
}

const NoteItem: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<NoteItemNavigationProp>()
    const { note } = route.params
    const date = note.created ? format(new Date(note.created), 'MMMM dd, yyyy') : ''

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{note.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddNote', { note })}>
                    <Ionicons name="create-outline" size={24} color="#000" />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                {note.image ? (
                    <Image source={{ uri: note.image }} style={styles.image} />
                ) : null}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Category:</Text>
                    <Text style={styles.value}>{note.category || '—'}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Date:</Text>
                    <Text style={styles.value}>{date}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Price:</Text>
                    <Text style={styles.value}>
                        {note.price ? `${note.currency}${note.price}` : '—'}
                    </Text>
                </View>
                <View style={styles.ratingContainer}>
                    <Text style={styles.label}>Rating:</Text>
                    <StarRating rating={note.rating} disabled />
                </View>
                <View style={styles.commentContainer}>
                    <Text style={styles.label}>Comment:</Text>
                    <Text style={styles.comment}>{note.comment || 'No comment'}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default NoteItem