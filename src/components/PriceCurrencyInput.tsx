// src/components/PriceCurrencyInput.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LabeledInput from './LabeledInput';

interface PriceCurrencyInputProps {
    price: string;
    onChangePrice: (price: string) => void;
    currency: string;
    onToggleCurrency: () => void;
}

const PriceCurrencyInput: React.FC<PriceCurrencyInputProps> = ({
    price,
    onChangePrice,
    currency,
    onToggleCurrency,
}) => {
    const rightElement = (
        <TouchableOpacity onPress={onToggleCurrency} style={styles.currencyToggle}>
            <Text style={styles.currencyText}>{currency}</Text>
        </TouchableOpacity>
    );
    return (
        <LabeledInput
            label="Price"
            value={price}
            onChangeText={onChangePrice}
            placeholder="Enter price"
            keyboardType="numeric"
            inputStyle={styles.priceInput}
            rightElement={rightElement}
        />
    );
};

export default PriceCurrencyInput;

const styles = StyleSheet.create({
    priceInput: {
    },
    currencyToggle: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#D0D0D0',
        marginLeft: 8,
    },
    currencyText: {
        fontSize: 16,
        color: '#333',
    },
});
