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
    onConfirm: () => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const DeleteCategoryModal: FC<Props> = ({
    visible,
    category,
    onCancel,
    onConfirm,
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
        <Modal
            transparent
            visible={visible}
            statusBarTranslucent
            animationType="none"
        >
            <View style={styles.backdrop}>
                <Animated.View
                    style={[
                        styles.modal,
                        {
                            opacity,
                            transform: [{ scale }],
                        },
                    ]}
                >
                    <Text style={styles.message}>
                        Are you sure you want to delete “{category}”?
                    </Text>

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.button, styles.leftButton]}
                            onPress={onCancel}
                        >
                            <Text style={[styles.buttonText, styles.cancelText]}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onConfirm}
                        >
                            <Text style={[styles.buttonText, styles.deleteText]}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    message: {
        fontSize: 17,
        textAlign: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
        color: '#000',
        lineHeight: 22,
    },
    buttonRow: {
        flexDirection: 'row',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
        height: 50,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    leftButton: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
    },
    buttonText: {
        fontSize: 17,
    },
    cancelText: {
        color: '#007AFF',
    },
    deleteText: {
        color: '#FF3B30',
    },
})

export default DeleteCategoryModal
