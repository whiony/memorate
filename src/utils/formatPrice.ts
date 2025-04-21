export function formatPrice(value: number): string {
    // Millions
    if (value >= 1_000_000) {
        const m = (value / 1_000_000)
            .toFixed(1)
            .replace(/\.0$/, '')    // drop trailing .0
            .replace('.', ',')      // comma decimal
        return `${m}M`            // non‑breaking space + M
    }
    // Thousands
    if (value >= 1_000) {
        const k = (value / 1_000)
            .toFixed(1)
            .replace(/\.0$/, '')
            .replace('.', ',')
        return `${k}K`
    }
    // Under 1,000 — up to 1 decimal, comma‑separated
    const s = value % 1 === 0
        ? String(value)
        : value.toFixed(1).replace('.', ',')
    return s
}
