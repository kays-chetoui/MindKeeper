import type { Task } from './task';

export type FilterField = 
  | 'title'
  | 'description'
  | 'category'
  | 'priority'
  | 'status'
  | 'tags'
  | 'dueDate'
  | 'startDate'
  | 'createdAt'
  | 'notes'
  | 'active';

export type FilterOperator = 
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'startsWith'
  | 'endsWith'
  | 'isOneOf'
  | 'isNotOneOf';

export type LogicalOperator = 'and' | 'or';

export interface FilterCondition {
  id: string;
  field: FilterField;
  operator: FilterOperator;
  value: string | string[] | number | Date | boolean | null;
  logicalOperator?: LogicalOperator; // For combining with next condition
}

export interface AdvancedFilter {
  conditions: FilterCondition[];
  enabled: boolean;
}

// Field configurations for UI and validation
export interface FilterFieldConfig {
  field: FilterField;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'multiSelect';
  options?: { value: string | number; label: string }[];
  supportedOperators: FilterOperator[];
}

// Utility functions for filtering
export const getFieldValue = (task: Task, field: FilterField): string | number | Date | string[] | boolean | undefined => {
  switch (field) {
    case 'title':
      return task.title;
    case 'description':
      return task.description;
    case 'category':
      return task.category;
    case 'priority':
      return task.priority;
    case 'status':
      return task.status;
    case 'tags':
      return task.tags;
    case 'dueDate':
      return task.dueDate;
    case 'startDate':
      return task.startDate;
    case 'createdAt':
      return task.createdAt;
    case 'notes':
      return task.notes;
    case 'active':
      return task.active;
    default:
      return undefined;
  }
};

export const evaluateCondition = (task: Task, condition: FilterCondition): boolean => {
  const fieldValue = getFieldValue(task, condition.field);
  const { operator, value } = condition;

  if (fieldValue === null || fieldValue === undefined) {
    return operator === 'isEmpty' || operator === 'notEquals';
  }

  switch (operator) {
    case 'equals':
      if (Array.isArray(fieldValue)) {
        return Array.isArray(value) ? 
          fieldValue.length === value.length && fieldValue.every(v => value.includes(v)) :
          fieldValue.includes(value as string);
      }
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() === value.getTime();
      }
      // Gestion spéciale pour les valeurs booléennes
      if (typeof fieldValue === 'boolean' && typeof value === 'string') {
        return fieldValue.toString() === value;
      }
      return fieldValue === value;

    case 'notEquals':
      if (Array.isArray(fieldValue)) {
        return Array.isArray(value) ? 
          !(fieldValue.length === value.length && fieldValue.every(v => value.includes(v))) :
          !fieldValue.includes(value as string);
      }
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() !== value.getTime();
      }
      // Gestion spéciale pour les valeurs booléennes
      if (typeof fieldValue === 'boolean' && typeof value === 'string') {
        return fieldValue.toString() !== value;
      }
      return fieldValue !== value;

    case 'contains':
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(v => v.toString().toLowerCase().includes((value as string).toLowerCase()));
      }
      return fieldValue.toString().toLowerCase().includes((value as string).toLowerCase());

    case 'notContains':
      if (Array.isArray(fieldValue)) {
        return !fieldValue.some(v => v.toString().toLowerCase().includes((value as string).toLowerCase()));
      }
      return !fieldValue.toString().toLowerCase().includes((value as string).toLowerCase());

    case 'startsWith':
      return fieldValue.toString().toLowerCase().startsWith((value as string).toLowerCase());

    case 'endsWith':
      return fieldValue.toString().toLowerCase().endsWith((value as string).toLowerCase());

    case 'greaterThan':
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() > value.getTime();
      }
      return Number(fieldValue) > Number(value);

    case 'lessThan':
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() < value.getTime();
      }
      return Number(fieldValue) < Number(value);

    case 'greaterThanOrEqual':
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() >= value.getTime();
      }
      return Number(fieldValue) >= Number(value);

    case 'lessThanOrEqual':
      if (fieldValue instanceof Date && value instanceof Date) {
        return fieldValue.getTime() <= value.getTime();
      }
      return Number(fieldValue) <= Number(value);

    case 'isEmpty':
      if (Array.isArray(fieldValue)) {
        return fieldValue.length === 0;
      }
      return !fieldValue || fieldValue.toString().trim() === '';

    case 'isNotEmpty':
      if (Array.isArray(fieldValue)) {
        return fieldValue.length > 0;
      }
      return Boolean(fieldValue && fieldValue.toString().trim() !== '');

    case 'isOneOf':
      if (!Array.isArray(value)) return false;
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(v => value.includes(v.toString()));
      }
      return value.includes(fieldValue.toString());

    case 'isNotOneOf':
      if (!Array.isArray(value)) return true;
      if (Array.isArray(fieldValue)) {
        return !fieldValue.some(v => value.includes(v.toString()));
      }
      return !value.includes(fieldValue.toString());

    default:
      return true;
  }
};

export const applyAdvancedFilter = (tasks: Task[], filter: AdvancedFilter): Task[] => {
  if (!filter.enabled || filter.conditions.length === 0) {
    return tasks;
  }

  return tasks.filter(task => {
    let result = true;
    
    for (let i = 0; i < filter.conditions.length; i++) {
      const condition = filter.conditions[i];
      const conditionResult = evaluateCondition(task, condition);
      
      if (i === 0) {
        result = conditionResult;
      } else {
        const prevCondition = filter.conditions[i - 1];
        if (prevCondition.logicalOperator === 'or') {
          result = result || conditionResult;
        } else { // 'and' is default
          result = result && conditionResult;
        }
      }
    }
    
    return result;
  });
};
