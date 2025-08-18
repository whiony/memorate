import { StyleSheet } from 'react-native';
import { fonts } from '@/theme/index';
import type { Theme } from '@/theme/colors';

export const createStyles = (colors: Theme) => StyleSheet.create({
    container: {
        height: 140,
        backgroundColor: colors.cardBackground,
        borderRadius: 16,
        overflow: 'hidden',
        borderWidth: 1.5,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    imagesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        gap: 12,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: colors.border,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    editOverlay: {
        position: 'absolute',
        bottom: 4,
        left: 4,
        backgroundColor: `${colors.accent}CC`,
        borderRadius: 12,
        width: 28,
        height: 28,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
    },
    removeButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: colors.cardBackground,
        borderWidth: 2,
        borderColor: `${colors.accent}4D`,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    addButtonText: {
        fontSize: 12,
        fontFamily: fonts.mainFont,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 14,
    },
});

export const styles = createStyles({} as any); // fallback for legacy usage
