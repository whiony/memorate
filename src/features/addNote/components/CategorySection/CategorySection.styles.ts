import { StyleSheet } from 'react-native';
import { colors, fonts } from "@/theme";
import type { Theme } from '@/theme/colors';

export const createStyles = (themeColors: Theme) => StyleSheet.create({
    section: {},
    categoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 2000,
    },
    categoryButton: {
        marginLeft: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        backgroundColor: themeColors.accent,
        shadowColor: themeColors.accent,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
        borderWidth: 1,
        borderColor: themeColors.border,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: themeColors.border,
        backgroundColor: themeColors.cardBackground,
        fontSize: 15,
        color: themeColors.text,
        marginBottom: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: fonts.mainFont,
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagPill: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,

        backgroundColor: `${themeColors.accent}20`,
        borderWidth: 1,
        borderColor: `${themeColors.accent}40`,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
    tagText: {
        color: themeColors.accent,
        fontSize: 14,
        fontFamily: fonts.mainFont,
        fontWeight: '600',
    },
    tagOption: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        marginBottom: 8,

        backgroundColor: `${themeColors.accent}15`,
        borderWidth: 1,
        borderColor: `${themeColors.accent}30`,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
    },
});

export const styles = createStyles({} as any); // fallback for legacy usage
