import { StyleSheet, Dimensions } from 'react-native'
import type { Theme } from '@/theme/colors'

const { width } = Dimensions.get('window')

export const createStyles = (colors: Theme) => StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 40,
    },

    emptyCard: {
        minHeight: 280,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
        elevation: 12,
    },

    cardBlur: {
        flex: 1,
        borderWidth: 2,
        borderColor: colors.border,
        borderStyle: 'dashed',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },

    cardGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 32,
    },

    content: {
        alignItems: 'center',
        zIndex: 2,
    },

    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: `${colors.accent}26`,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: `${colors.accent}4D`,
        borderStyle: 'dashed',
    },

    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        letterSpacing: 0.5,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        letterSpacing: 0.3,
        textAlign: 'center',
        lineHeight: 22,
    },
});

export const styles = createStyles({} as any); // fallback for legacy usage