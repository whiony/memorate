import { StyleSheet } from 'react-native';
import { borders, colors } from '@/theme/index';
import type { Theme } from '@/theme/colors';

export const createStyles = (themeColors: Theme) => StyleSheet.create({
    priceInput: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: themeColors.border,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: themeColors.cardBackground,
        fontSize: 15,
        marginRight: 12,
        color: themeColors.text,
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
        backgroundColor: themeColors.cardBackground,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: themeColors.border,
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
        color: themeColors.text,
        fontWeight: '600',
    },
});

export const styles = createStyles({} as any); // fallback for legacy usage
