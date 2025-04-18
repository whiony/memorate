import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: { borderRadius: 20, marginBottom: 14, overflow: 'hidden' },
    mainRow: { flexDirection: 'row', paddingVertical: 16, paddingHorizontal: 16 },
    imageWrapper: { width: 96, height: 96, borderRadius: 12, backgroundColor: '#fff', padding: 8, marginRight: 12 },
    image: { width: '100%', height: '100%', borderRadius: 8 },
    mainContent: { flex: 1, justifyContent: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
    comment: { fontSize: 14, color: '#333', lineHeight: 20 },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.1)', marginHorizontal: 16 },
    footer: { position: 'relative', height: 32, marginTop: 12, marginBottom: 12 },
    date: { position: 'absolute', left: 16, fontSize: 12, color: '#555', bottom: 0 },
    centerStars: { position: 'absolute', left: 0, right: 0, alignItems: 'center', bottom: 0 },
    price: { position: 'absolute', right: 16, fontSize: 14, fontWeight: 'bold', bottom: 0 },
    pricePlaceholder: { position: 'absolute', right: 16, width: 40, bottom: 0 },
    actions: { flexDirection: 'row', position: 'absolute', top: 0, right: 0, bottom: 0 },
    actionButton: { width: 60, justifyContent: 'center', alignItems: 'center' },
});