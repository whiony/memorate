import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface DeleteNoteProps {
    visible: boolean;
    noteName: string;
    onCancel: () => void;
    onConfirm: () => void;
}

const DeleteNoteModal: FC<DeleteNoteProps> = ({ visible, noteName, onCancel, onConfirm }) => (
    <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Delete Note</Text>
                <Text style={styles.message}>Are you sure you want to delete "{noteName}"?</Text>
                <View style={styles.buttonsRow}>
                    <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.btnCancel]}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm} style={[styles.btn, styles.btnDelete]}>
                        <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    container: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    message: { fontSize: 16, marginBottom: 16 },
    buttonsRow: { flexDirection: 'row', justifyContent: 'flex-end' },
    btn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
    btnCancel: { backgroundColor: '#aaa' },
    btnDelete: { backgroundColor: '#E53935' },
    btnText: { color: '#fff', fontWeight: 'bold' },
});

export default DeleteNoteModal;