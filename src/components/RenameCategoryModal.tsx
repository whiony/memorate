import React, { useState, FC } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props { visible: boolean; initialName: string; onCancel: () => void; onSubmit: (newName: string) => void; }

const RenameCategoryModal: FC<Props> = ({ visible, initialName, onCancel, onSubmit }) => {
    const [name, setName] = useState(initialName);
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Rename Category</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="New name" />
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={onCancel} style={[styles.btn, styles.cancel]}><Text style={styles.btnText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity onPress={() => onSubmit(name.trim())} style={[styles.btn, styles.ok]}><Text style={styles.btnText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({ overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' }, container: { width: '80%', backgroundColor: '#fff', borderRadius: 12, padding: 20 }, title: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 }, input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16 }, buttons: { flexDirection: 'row', justifyContent: 'flex-end' }, btn: { paddingHorizontal: 16, paddingVertical: 8, marginLeft: 8, borderRadius: 8 }, cancel: { backgroundColor: '#aaa' }, ok: { backgroundColor: '#4C4F6D' }, btnText: { color: '#fff', fontWeight: 'bold' } });

export default RenameCategoryModal;
