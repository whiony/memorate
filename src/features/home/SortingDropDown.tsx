// SortingDropDown.tsx
import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import type { DropDownPickerProps } from 'react-native-dropdown-picker';

import { globalStyles } from '../../theme/theme';

// Типы сортировки и пропсы, которые мы примем от HomeScreen
type SortBy = 'date' | 'price';
type SortOrder = 'asc' | 'desc';
type SortItem = NonNullable<DropDownPickerProps<string>['items']>[0];

interface SortingDropDownProps {
    sortBy: SortBy;
    setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
    sortOrder: SortOrder;
    setSortOrder: React.Dispatch<React.SetStateAction<SortOrder>>;
    openSortDropdown: boolean;
    setOpenSortDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

// Массив пунктов — "Date" и "Price"
const sortItems = [
    { label: 'Date', value: 'date' },
    { label: 'Price', value: 'price' },
];

const SortingDropDown: React.FC<SortingDropDownProps> = ({
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    openSortDropdown,
    setOpenSortDropdown,
}) => {
    /**
     * Когда пользователь нажимает на пункт в списке:
     * - Если уже выбран тот же пункт, переключаем порядок сортировки (asc<->desc)
     * - Иначе выбираем новую опцию с порядком по умолчанию (например, 'desc')
     */
    const handleItemPress = (value: SortBy) => {
        if (value === sortBy) {
            setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(value);
            setSortOrder('desc');
        }
        // Закрываем дропдаун
        setOpenSortDropdown(false);
    };

    /**
     * Кастомный рендер опций, чтобы выводить стрелочку (↑/↓) только у текущего пункта.
     */
    const renderListItem = ({ item }: { item: SortItem }) => {
        const isSelected = item.value === sortBy;
        const arrow = isSelected ? (sortOrder === 'asc' ? '↑' : '↓') : '';
        return (
            <TouchableOpacity
                style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                onPress={() => handleItemPress(item.value as SortBy)}
            >
                <Text style={globalStyles.standartDropdownText}>
                    {item.label ?? ''} {arrow}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ width: 120 }}>
            <DropDownPicker
                open={openSortDropdown}
                setOpen={setOpenSortDropdown}
                value={sortBy}
                setValue={setSortBy} // обязательно
                multiple={false} // обязательно

                items={sortItems}
                showArrowIcon
                style={[
                    globalStyles.standartDropdown,
                    {
                        borderWidth: 0,
                        backgroundColor: '#fff',
                    },
                ]}
                dropDownContainerStyle={[
                    globalStyles.standartDropdownContainer,
                    {
                        borderWidth: 1,
                        borderColor: '#e2e2e2',
                    },
                ]}
                labelStyle={globalStyles.standartDropdownText}
                listMode="SCROLLVIEW"
                renderListItem={renderListItem}
            />

        </View>
    );
};

export default SortingDropDown;
