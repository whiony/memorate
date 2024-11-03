import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/CategoryList.styles';

interface CategoryListProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, selectedCategory, onSelectCategory }) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'All' && styles.selectedCategoryButton]}
            onPress={() => onSelectCategory('All')}
        >
            <Text style={styles.categoryButtonText}>All</Text>
        </TouchableOpacity>
        {categories.map((cat, index) => (
            <TouchableOpacity
                key={`category-${index}`}
                style={[styles.categoryButton, selectedCategory === cat && styles.selectedCategoryButton]}
                onPress={() => onSelectCategory(cat)}
            >
                <Text style={styles.categoryButtonText}>{cat}</Text>
            </TouchableOpacity>
        ))}
    </ScrollView>
);

export default CategoryList;