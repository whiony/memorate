import { StyleSheet } from 'react-native';
import type { Theme } from '@/theme/colors';

export const createStyles = (colors: Theme) => StyleSheet.create({
    screen: {
        padding: 20,
        paddingBottom: 40,
        flex: 1,
        gap: 16,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'transparent',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        textShadowColor: 'rgba(255,255,255,0.8)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
});

export const styles = createStyles({} as any); // fallback for legacy usage
