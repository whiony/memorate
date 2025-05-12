import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import LabeledInput from '@/ui/Input/LabeledInput'
import { styles } from './PriceCurrencyInput.styles'

interface PriceCurrencyInputProps {
    price: string
    onChangePrice: (price: string) => void
    currency: string
    onToggleCurrency: () => void
}

const PriceCurrencyInput: React.FC<PriceCurrencyInputProps> = ({
    price,
    onChangePrice,
    currency,
    onToggleCurrency,
}) => {
    const handleChange = (raw: string) => {
        let cleaned = raw.replace(/[^0-9.,]/g, '')
        const parts = cleaned.split(/[.,]/)
        parts[0] = parts[0].slice(0, 7)
        if (parts[1] !== undefined) {
            parts[1] = parts[1].slice(0, 2)
            cleaned = `${parts[0]},${parts[1]}`
        } else {
            cleaned = parts[0]
        }
        onChangePrice(cleaned)
    }

    const rightElement = (
        <TouchableOpacity onPress={onToggleCurrency} style={styles.currencyToggle}>
            <Text style={styles.currencyText}>{currency}</Text>
        </TouchableOpacity>
    )

    return (
        <LabeledInput
            label="Price"
            value={price}
            onChangeText={handleChange}
            placeholder="Enter price"
            keyboardType="numeric"
            inputStyle={styles.priceInput}
            rightElement={rightElement}
        />
    )
}

export default PriceCurrencyInput