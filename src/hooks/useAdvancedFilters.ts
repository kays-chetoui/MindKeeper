import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Task } from '../types/task';
import type { 
  AdvancedFilter, 
  FilterCondition, 
  FilterField, 
  FilterFieldConfig,
  FilterOperator,
  LogicalOperator
} from '../types/advancedFilter';
import { applyAdvancedFilter as applyFilter } from '../types/advancedFilter';
import { useCategories } from './useCategories';

export const useAdvancedFilters = (tasks: Task[]) => {
  const { t } = useTranslation();
  const { categories } = useCategories();
  
  const [advancedFilter, setAdvancedFilter] = useState<AdvancedFilter>({
    conditions: [],
    enabled: true, // Toujours activé maintenant
  });

  // Configuration des champs disponibles pour le filtrage
  const filterFieldConfigs: FilterFieldConfig[] = useMemo(() => [
    {
      field: 'title',
      label: t('tasks.taskTitle'),
      type: 'text',
      supportedOperators: ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'description',
      label: t('tasks.taskDescription'),
      type: 'text',
      supportedOperators: ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'category',
      label: t('tasks.category'),
      type: 'select',
      options: [
        ...categories.map(cat => ({ value: cat.name, label: cat.name })),
        { value: '', label: t('tasks.noCategory') }
      ],
      supportedOperators: ['equals', 'notEquals', 'isOneOf', 'isNotOneOf', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'priority',
      label: t('tasks.priority'),
      type: 'select',
      options: [
        { value: 1, label: t('tasks.priority1') },
        { value: 2, label: t('tasks.priority2') },
        { value: 3, label: t('tasks.priority3') },
        { value: 4, label: t('tasks.priority4') },
        { value: 5, label: t('tasks.priority5') },
      ],
      supportedOperators: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'isOneOf', 'isNotOneOf'],
    },
    {
      field: 'status',
      label: t('tasks.status'),
      type: 'select',
      options: [
        { value: 1, label: t('tasks.status1') },
        { value: 2, label: t('tasks.status2') },
        { value: 3, label: t('tasks.status3') },
        { value: 7, label: t('tasks.status7') },
        { value: 8, label: t('tasks.status8') },
      ],
      supportedOperators: ['equals', 'notEquals', 'isOneOf', 'isNotOneOf'],
    },
    {
      field: 'tags',
      label: t('tasks.tags'),
      type: 'multiSelect',
      options: [], // Will be populated dynamically
      supportedOperators: ['contains', 'notContains', 'isOneOf', 'isNotOneOf', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'dueDate',
      label: t('tasks.dueDate'),
      type: 'date',
      supportedOperators: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'startDate',
      label: t('tasks.startDate'),
      type: 'date',
      supportedOperators: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual', 'isEmpty', 'isNotEmpty'],
    },
    {
      field: 'createdAt',
      label: t('tasks.createdAt'),
      type: 'date',
      supportedOperators: ['equals', 'notEquals', 'greaterThan', 'lessThan', 'greaterThanOrEqual', 'lessThanOrEqual'],
    },
    {
      field: 'notes',
      label: t('tasks.notes'),
      type: 'text',
      supportedOperators: ['equals', 'notEquals', 'contains', 'notContains', 'startsWith', 'endsWith', 'isEmpty', 'isNotEmpty'],
    },
  ], [t, categories]);

  // Labels pour les opérateurs
  const operatorLabels: Record<FilterOperator, string> = useMemo(() => ({
    equals: t('filters.operators.equals'),
    notEquals: t('filters.operators.notEquals'),
    contains: t('filters.operators.contains'),
    notContains: t('filters.operators.notContains'),
    greaterThan: t('filters.operators.greaterThan'),
    lessThan: t('filters.operators.lessThan'),
    greaterThanOrEqual: t('filters.operators.greaterThanOrEqual'),
    lessThanOrEqual: t('filters.operators.lessThanOrEqual'),
    isEmpty: t('filters.operators.isEmpty'),
    isNotEmpty: t('filters.operators.isNotEmpty'),
    startsWith: t('filters.operators.startsWith'),
    endsWith: t('filters.operators.endsWith'),
    isOneOf: t('filters.operators.isOneOf'),
    isNotOneOf: t('filters.operators.isNotOneOf'),
  }), [t]);

  // Labels pour les opérateurs logiques
  const logicalOperatorLabels: Record<LogicalOperator, string> = useMemo(() => ({
    and: t('filters.logicalOperators.and'),
    or: t('filters.logicalOperators.or'),
  }), [t]);

  const addCondition = () => {
    const newCondition: FilterCondition = {
      id: Date.now().toString(),
      field: 'title',
      operator: 'contains',
      value: '',
      logicalOperator: 'and',
    };
    
    setAdvancedFilter(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition],
    }));
  };

  const updateCondition = (id: string, updates: Partial<FilterCondition>) => {
    setAdvancedFilter(prev => ({
      ...prev,
      conditions: prev.conditions.map(condition =>
        condition.id === id ? { ...condition, ...updates } : condition
      ),
    }));
  };

  const removeCondition = (id: string) => {
    setAdvancedFilter(prev => ({
      ...prev,
      conditions: prev.conditions.filter(condition => condition.id !== id),
    }));
  };

  const clearAllConditions = () => {
    setAdvancedFilter(prev => ({
      ...prev,
      conditions: [],
    }));
  };

  const getFieldConfig = (field: FilterField): FilterFieldConfig | undefined => {
    return filterFieldConfigs.find(config => config.field === field);
  };

  // Application des filtres avancés
  const filteredTasks = useMemo(() => {
    return applyFilter(tasks, advancedFilter);
  }, [tasks, advancedFilter]);

  return {
    advancedFilter,
    setAdvancedFilter,
    filterFieldConfigs,
    operatorLabels,
    logicalOperatorLabels,
    addCondition,
    updateCondition,
    removeCondition,
    clearAllConditions,
    getFieldConfig,
    filteredTasks,
  };
};
