import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LabeledInput from '../../components/LabeledInput';
import { styles } from './PriceCurrencyInput.styles';

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