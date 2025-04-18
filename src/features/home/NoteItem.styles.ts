import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: { borderRadius: 20, marginBottom: 14, overflow: 'hidden' },
    mainRow: { flexDirection: 'row', paddingTop: 16, paddingHorizontal: 16 },
    imageWrapper: { width: 100, height: 100, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
    image: { width: 84, height: 84, borderRadius: 8 },
    mainContent: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    comment: { fontSize: 14, color: '#333', lineHeight: 20 },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 16, marginHorizontal: 16 },
    footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
    date: { fontSize: 12, color: '#555' },
    stars: { flexDirection: 'row' },
    price: { fontSize: 14, fontWeight: 'bold' },
    actions: { flexDirection: 'row', position: 'absolute', top: 0, right: 0, height: '100%' },
    actionButton: { width: 60, justifyContent: 'center', alignItems: 'center' },
});