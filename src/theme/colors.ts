export const lightTheme = {
    background: ['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8'],
    cardBackground: 'rgba(255,255,255,0.4)',
    cardGradient: [
        'rgba(255,255,255,0.4)',
        'rgba(255,255,255,0.2)',
        'rgba(99, 102, 241, 0.1)'
    ],
    cardMainGradient: ['rgba(255,255,255,0.4)', 'rgba(255,255,255,0)'],
    cardBodyGradient: [
        'rgba(255,255,255,0.35)',
        'rgba(255,255,255,0.15)',
        'rgba(99, 102, 241, 0.08)'
    ],
    searchButtonGradient: ['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)'],
    noteDetailsGradient: [
        'rgba(255,255,255,0.6)',
        'rgba(255,255,255,0.4)',
        'rgba(99, 102, 241, 0.1)'
    ],
    popupMenuGradient: [
        'rgba(255,255,255,0.4)',
        'rgba(255,255,255,0.25)',
        'rgba(99, 102, 241, 0.08)'
    ],
    text: '#111',
    textSecondary: '#666',
    textMuted: '#999',
    border: 'rgba(255,255,255,0.3)',
    shadow: 'rgba(99, 102, 241, 0.4)',
    accent: '#6366F1',
    danger: '#E53935',
    success: '#4CAF50',
    warning: '#FFA726',
    searchBackground: 'rgba(255,255,255,0.25)',
    modalBackground: '#fff',
    statsContainer: 'rgba(255,255,255,0.25)',
    tabBarBackground: 'rgba(99, 102, 241, 0.15)',
    tabBarIcon: '#fff',
}

export const darkTheme = {
    background: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
    cardBackground: 'rgba(40,40,60,0.8)',
    cardGradient: [
        'rgba(40,40,60,0.8)',
        'rgba(30,30,50,0.6)',
        'rgba(99, 102, 241, 0.2)'
    ],
    cardMainGradient: ['rgba(40,40,60,0.8)', 'rgba(30,30,50,0)'],
    cardBodyGradient: [
        'rgba(40,40,60,0.8)',
        'rgba(30,30,50,0.6)',
        'rgba(139, 92, 246, 0.2)'
    ],
    searchButtonGradient: ['rgba(40,40,60,0.6)', 'rgba(30,30,50,0.4)'],
    noteDetailsGradient: [
        'rgba(40,40,60,0.9)',
        'rgba(30,30,50,0.7)',
        'rgba(139, 92, 246, 0.2)'
    ],
    popupMenuGradient: [
        'rgba(40,40,60,0.9)',
        'rgba(30,30,50,0.7)',
        'rgba(139, 92, 246, 0.15)'
    ],
    text: '#fff',
    textSecondary: '#bbb',
    textMuted: '#888',
    border: 'rgba(255,255,255,0.2)',
    shadow: 'rgba(99, 102, 241, 0.6)',
    accent: '#8B5CF6',
    danger: '#EF4444',
    success: '#10B981',
    warning: '#F59E0B',
    searchBackground: 'rgba(40,40,60,0.6)',
    modalBackground: '#2d2d2d',
    statsContainer: 'rgba(40,40,60,0.6)',
    tabBarBackground: 'rgba(139, 92, 246, 0.3)',
    tabBarIcon: '#fff',
}

export type Theme = typeof lightTheme