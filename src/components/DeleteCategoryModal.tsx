import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props { visible: boolean; category: string; onCancel: () => void; onConfirm: () => void; }

const DeleteCategoryModal: FC<Props> = ({ visible, category, onCancel, onConfirm }) => (
    <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>Delete Category</Text>
                <Text style={styles.message}>Delete "{category}"?</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.cancel]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity onPress={onConfirm} style={[styles.btn, styles.delete]}><Text style={styles.btnText}>Delete</Text></TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }, container: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20 }, title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 }, message: { fontSize: 16, marginBottom: 16 }, buttons: { flexDirection: 'row', justifyContent: 'flex-end' }, btn: { paddingHorizontal: 16, paddingVertical: 8, marginLeft: 8, borderRadius: 8 }, cancel: { backgroundColor: '#aaa' }, delete: { backgroundColor: '#E53935' }, btnText: { color: '#fff', fontWeight: 'bold' } });

export default DeleteCategoryModal;