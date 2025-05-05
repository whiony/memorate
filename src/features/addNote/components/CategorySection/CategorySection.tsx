import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './CategorySection.styles';
import { globalStyles } from '@/theme/index';
import { CategoriesProvider } from '@/hooks/useCategories';

interface CategorySectionProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    categories: string[];
    openDropdown: boolean;
    setOpenDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    showCategoryInput: boolean;
    setShowCategoryInput: React.Dispatch<React.SetStateAction<boolean>>;
    newCategory: string;
    setNewCategory: React.Dispatch<React.SetStateAction<string>>;
    handleAddCategory: () => void;
    loading: boolean;
    editableCategory?: boolean;
    style?: StyleProp<ViewStyle>
}

const CategorySection: React.FC<CategorySectionProps> = ({
    category,
    setCategory,
    categories,
    openDropdown,
    setOpenDropdown,
    showCategoryInput,
    setShowCategoryInput,
    newCategory,
    setNewCategory,
    handleAddCategory,
    loading,
    editableCategory,
    style
}) => (
    <CategoriesProvider>
        <View style={[styles.section, style]}>
            {editableCategory !== false && (
                <Text style={globalStyles.label}>Category</Text>
            )}
            <View style={styles.categoryRow}>
                <View style={{ flex: 1 }}>
                    <DropDownPicker
                        open={openDropdown}
                        setOpen={setOpenDropdown}
                        items={categories.map(c => ({ label: c, value: c }))}
                        value={category}
                        setValue={setCategory}
                        placeholder="Select category"
                        style={[
                            globalStyles.standartDropdown,
                            editableCategory === false && { borderWidth: 0, borderColor: 'transparent' },
                        ]}
                        dropDownContainerStyle={[
                            globalStyles.standartDropdownContainer,
                            editableCategory === false && {
                                borderWidth: 1,
                                borderColor: '#e2e2e2',
                            },
                        ]}
                        textStyle={globalStyles.standartDropdownText}
                        listMode="SCROLLVIEW"
                        scrollViewProps={{ nestedScrollEnabled: true }}
                        zIndex={2000}
                        disabled={loading}
                    />
                </View>
                {editableCategory !== false && (
                    <TouchableOpacity
                        onPress={() => setShowCategoryInput(!showCategoryInput)}
                        style={[styles.categoryButton, globalStyles.standartButton]}
                    >
                        <Text style={styles.addCategoryButtonText}>+ Add</Text>
                    </TouchableOpacity>
                )}
            </View>
            {showCategoryInput && (
                <View style={[styles.row, { marginTop: 8 }]}>
                    <TextInput
                        style={[globalStyles.standartInput, { flex: 3 }]}
                        placeholder="Enter new category"
                        value={newCategory}
                        onChangeText={setNewCategory}
                        placeholderTextColor="#888"
                    />
                    <TouchableOpacity onPress={handleAddCategory} style={[styles.categoryButton, globalStyles.standartButton]}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    </CategoriesProvider>
);

export default CategorySection;
