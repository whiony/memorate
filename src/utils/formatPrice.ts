export function formatPrice(value: number): string {
    if (value >= 1_000_000) {
        const m = (value / 1_000_000)
            .toFixed(1)
            .replace(/\.0$/, '')
            .replace('.', ',')
        return `${m}M`
    }
    if (value >= 1_000) {
        const k = (value / 1_000)
            .toFixed(1)
            .replace(/\.0$/, '')
            .replace('.', ',')
        return `${k}K`
    }
    const s = value % 1 === 0
        ? String(value)
        : value.toFixed(1)
    return s
}
