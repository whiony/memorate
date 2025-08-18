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
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'

interface DeleteNoteProps {
    visible: boolean
    noteName: string
    onCancel: () => void
    onConfirm: () => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const DeleteNoteModal: FC<DeleteNoteProps> = ({
    visible,
    noteName,
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
        <Modal transparent visible={visible} statusBarTranslucent>
            <View style={styles.backdrop}>
                <Animated.View
                    style={[
                        styles.modal,
                        { opacity, transform: [{ scale }] },
                    ]}
                >
                    <BlurView intensity={120} tint="light" style={styles.modalBlur}>
                        <LinearGradient
                            colors={[
                                'rgba(255,255,255,0.7)', 
                                'rgba(255,255,255,0.5)', 
                                'rgba(99, 102, 241, 0.12)'
                            ]}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        />
                        
                        <View style={styles.messageContainer}>
                            <Text style={styles.message}>
                                Are you sure you want to delete "{noteName}"?
                            </Text>
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                onPress={onCancel}
                                style={[styles.button, styles.cancelButton]}
                            >
                                <Text style={[styles.buttonText, styles.cancelText]}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            
                            <View style={styles.separator} />
                            
                            <TouchableOpacity
                                onPress={onConfirm}
                                style={[styles.button, styles.deleteButton]}
                            >
                                <Text style={[styles.buttonText, styles.deleteText]}>
                                    Delete
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: SCREEN_WIDTH * 0.75,
        borderRadius: 24,
        overflow: 'hidden',
        shadowColor: 'rgba(99, 102, 241, 0.4)',
        shadowOpacity: 0.3,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 12 },
        elevation: 15,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    modalBlur: {
        borderRadius: 24,
        overflow: 'hidden',
    },
    messageContainer: {
        paddingVertical: 28,
        paddingHorizontal: 24,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        color: '#111',
        lineHeight: 26,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    buttonRow: {
        flexDirection: 'row',
        height: 60,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.3)',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    cancelButton: {
        borderBottomLeftRadius: 24,
    },
    deleteButton: {
        borderBottomRightRadius: 24,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '600',
        letterSpacing: 0.3,
    },
    cancelText: {
        color: '#6366F1',
    },
    deleteText: {
        color: '#E53935',
    },
})

export default DeleteNoteModal
