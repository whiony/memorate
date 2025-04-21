import React, { FC, useEffect, useRef } from 'react'
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native'

interface Props {
    visible: boolean
    category: string
    onCancel: () => void
    onRename: () => void
    onDelete: () => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const ActionCategoryModal: FC<Props> = ({
    visible,
    category,
    onCancel,
    onRename,
    onDelete,
}) => {
    const opacity = useRef(new Animated.Value(0)).current
    const scale = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(scale, {
                    toValue: 1,
                    friction: 7,
                    useNativeDriver: true,
                }),
            ]).start()
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }).start()
        }
    }, [visible])

    return (
        <Modal transparent visible={visible} statusBarTranslucent>
            <View style={styles.backdrop}>
                <Animated.View
                    style={[
                        styles.modal,
                        { opacity, transform: [{ scale }] },
                    ]}
                >
                    <Text style={styles.title}>{category}</Text>

                    <TouchableOpacity onPress={onRename} style={styles.option}>
                        <Text style={[styles.optionText, styles.renameText]}>
                            Rename
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onDelete} style={styles.option}>
                        <Text style={[styles.optionText, styles.deleteText]}>
                            Delete
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />

                    <TouchableOpacity onPress={onCancel} style={styles.option}>
                        <Text style={[styles.optionText, styles.cancelText]}>
                            Cancel
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: SCREEN_WIDTH * 0.6,
        backgroundColor: '#FFF',
        borderRadius: 14,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 16,
        color: '#000',
    },
    option: {
        paddingVertical: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionText: {
        fontSize: 17,
    },
    renameText: {
        color: '#007AFF',
    },
    cancelText: {
        color: '#007AFF',
    },
    deleteText: {
        color: '#FF3B30',
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#CCC',
    },
})

export default ActionCategoryModal
