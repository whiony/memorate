import React, { FC } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props { visible: boolean; category: string; onCancel: () => void; onRename: () => void; onDelete: () => void; }

const ActionCategoryModal: FC<Props> = ({ visible, category, onCancel, onRename, onDelete }) => (
    <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
            <View style={styles.container}>
                <Text style={styles.title}>{category}</Text>
                <TouchableOpacity onPress={onRename} style={styles.option}><Text style={styles.text}>Rename</Text></TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.option}><Text style={[styles.text, styles.delete]}>Delete</Text></TouchableOpacity>
                <TouchableOpacity onPress={onCancel} style={styles.option}><Text style={styles.text}>Cancel</Text></TouchableOpacity>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }, container: { width: '70%', backgroundColor: '#fff', borderRadius: 12, paddingVertical: 20 }, title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 }, option: { paddingVertical: 12 }, text: { fontSize: 16, textAlign: 'center' }, delete: { color: '#E53935', fontWeight: 'bold' } });

export default ActionCategoryModal;