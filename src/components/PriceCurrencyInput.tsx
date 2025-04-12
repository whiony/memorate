import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles/PriceCurrencyInput.styles';

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
}) => (
    <View style={styles.section}>
        <Text style={styles.label}>Price</Text>
        <View style={styles.row}>
            <TextInput
                style={styles.priceInput}
                value={price}
                onChangeText={onChangePrice}
                keyboardType="numeric"
                placeholder="Enter price"
                placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={onToggleCurrency} style={styles.currencyToggle}>
                <Text style={styles.currencyText}>{currency}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

export default PriceCurrencyInput;
