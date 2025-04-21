import React, { FC, useEffect, useRef, useState } from 'react'
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Dimensions,
} from 'react-native'

interface Props {
    visible: boolean
    initialName: string
    onCancel: () => void
    onSubmit: (newName: string) => void
}

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const RenameCategoryModal: FC<Props> = ({
    visible,
    initialName,
    onCancel,
    onSubmit,
}) => {
    const [name, setName] = useState(initialName)
    const opacity = useRef(new Animated.Value(0)).current
    const scale = useRef(new Animated.Value(0.8)).current

    useEffect(() => {
        if (visible) {
            setName(initialName)
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
    }, [visible, initialName])

    return (
        <Modal transparent visible={visible} statusBarTranslucent>
            <View style={styles.backdrop}>
                <Animated.View
                    style={[
                        styles.modal,
                        { opacity, transform: [{ scale }] },
                    ]}
                >
                    <Text style={styles.title}>Rename Category</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="New name"
                        placeholderTextColor="#888"
                        autoFocus
                    />

                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            onPress={onCancel}
                            style={[styles.button, styles.cancelBtn]}
                        >
                            <Text style={[styles.btnText, styles.cancelText]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => onSubmit(name.trim())}
                            style={[styles.button]}
                        >
                            <Text style={[styles.btnText, styles.confirmText]}>OK</Text>
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
        padding: 20,
        paddingBottom: 0,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCC',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#000',
        marginBottom: 20,
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
    cancelBtn: {
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: '#CCC',
    },
    cancelText: {
        color: '#007AFF',
    },
    confirmText: {
        color: '#007AFF',
    },
    btnText: {
        fontSize: 17,
    },
})

export default RenameCategoryModal
