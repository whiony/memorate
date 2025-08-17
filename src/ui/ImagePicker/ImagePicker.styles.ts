import { StyleSheet } from 'react-native';
import { fonts } from '@/theme/index';

export const styles = StyleSheet.create({
    container: {
        height: 220,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    placeholder: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 14,
    },
    imagePlaceholder: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 14,
        fontFamily: fonts.mainFont,
        fontWeight: '500',
    },
});
