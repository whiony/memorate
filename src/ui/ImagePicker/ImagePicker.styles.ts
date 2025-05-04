import { StyleSheet } from 'react-native';
import { fonts } from '@/theme/index';

export const styles = StyleSheet.create({
    container: {
        height: 220,
        backgroundColor: '#EAEAEA',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: '#999',
        fontSize: 14,
        fontFamily: fonts.mainFont,
    },
});
