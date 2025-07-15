import { useState, useEffect } from 'react';

export interface CategoryConfig {
  id: string;
  name: string;
  color: string;
  isDefault?: boolean;
}

const defaultCategories: CategoryConfig[] = [
  { id: '1', name: 'Travail', color: 'blue', isDefault: true },
  { id: '2', name: 'Personnel', color: 'green', isDefault: true },
  { id: '3', name: 'Développement', color: 'purple', isDefault: true },
  { id: '4', name: 'Formation', color: 'yellow', isDefault: true },
  { id: '5', name: 'Finance', color: 'red', isDefault: true },
  { id: '6', name: 'Documentation', color: 'gray', isDefault: true },
  { id: '7', name: 'Commercial', color: 'indigo', isDefault: true },
  { id: '8', name: 'Santé', color: 'pink', isDefault: true },
];

const CATEGORIES_STORAGE_KEY = 'mindkeeper_categories';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryConfig[]>(() => {
    const stored = localStorage.getItem(CATEGORIES_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultCategories;
      }
    }
    return defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string, color: string = 'gray') => {
    const newCategory: CategoryConfig = {
      id: Date.now().toString(),
      name: name.trim(),
      color,
      isDefault: false,
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updates: Partial<Omit<CategoryConfig, 'id'>>) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id && !cat.isDefault));
  };

  const resetToDefault = () => {
    setCategories(defaultCategories);
  };

  const getCategoryByName = (name: string): CategoryConfig | undefined => {
    return categories.find(cat => cat.name === name);
  };

  const getCategoryColor = (categoryName: string): string => {
    const category = getCategoryByName(categoryName);
    return category?.color || 'gray';
  };

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefault,
    getCategoryByName,
    getCategoryColor,
  };
};
