import { StyleSheet } from 'react-native';
import { borders, colors } from '@/theme/index';

export const styles = StyleSheet.create({
    priceInput: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        fontSize: 15,
        marginRight: 12,
        color: '#000',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    currencyToggle: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: 'rgba(255,255,255,0.3)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        minWidth: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    currencyText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
    },
});
