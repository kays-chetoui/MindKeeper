import type { Task } from './task';

export type SortField = 
  | 'title'
  | 'priority'
  | 'status'
  | 'category'
  | 'dueDate'
  | 'startDate'
  | 'active'
  | 'createdAt';

export type SortDirection = 'asc' | 'desc';

export interface SortCriteria {
  id: string;
  field: SortField;
  direction: SortDirection;
  order: number; // Ordre de priorité du tri (0 = plus prioritaire)
}

export interface MultiLevelSort {
  criteria: SortCriteria[];
  enabled: boolean;
}

// Configuration des champs de tri disponibles
export interface SortFieldConfig {
  field: SortField;
  label: string;
  type: 'text' | 'number' | 'date' | 'boolean';
}

// Fonction utilitaire pour comparer deux valeurs selon leur type
export const compareValues = (a: string | number | Date | boolean | null | undefined, b: string | number | Date | boolean | null | undefined, type: 'text' | 'number' | 'date' | 'boolean'): number => {
  // Gérer les valeurs nulles ou undefined
  if (a === null || a === undefined) {
    if (b === null || b === undefined) return 0;
    return 1; // Mettre les valeurs nulles à la fin
  }
  if (b === null || b === undefined) {
    return -1; // Mettre les valeurs nulles à la fin
  }

  switch (type) {
    case 'text':
      return a.toString().localeCompare(b.toString());
    case 'number': {
      const numA = Number(a);
      const numB = Number(b);
      if (isNaN(numA) && isNaN(numB)) return 0;
      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;
      return numA - numB;
    }
    case 'boolean': {
      // Convertir les booléens en nombres pour la comparaison (true = 1, false = 0)
      const boolA = a ? 1 : 0;
      const boolB = b ? 1 : 0;
      return boolA - boolB;
    }
    case 'date': {
      let dateA: Date, dateB: Date;
      
      if (a instanceof Date) {
        dateA = a;
      } else {
        dateA = new Date(a as string | number);
      }
      
      if (b instanceof Date) {
        dateB = b;
      } else {
        dateB = new Date(b as string | number);
      }
      
      // Vérifier si les dates sont valides
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      
      return dateA.getTime() - dateB.getTime();
    }
    default:
      return 0;
  }
};

// Fonction pour obtenir la valeur d'un champ d'une tâche
export const getTaskFieldValue = (task: Task, field: SortField): string | number | Date | boolean | undefined => {
  switch (field) {
    case 'title':
      return task.title;
    case 'priority':
      return task.priority;
    case 'status':
      return task.status;
    case 'category':
      return task.category;
    case 'dueDate':
      return task.dueDate;
    case 'startDate':
      return task.startDate;
    case 'active':
      return task.active;
    case 'createdAt':
      return task.createdAt;
    default:
      return undefined;
  }
};

// Fonction pour appliquer le tri multi-niveaux
export const applyMultiLevelSort = (tasks: Task[], sortConfig: MultiLevelSort, fieldConfigs: SortFieldConfig[]): Task[] => {
  // Si pas de critères de tri, retourner les tâches telles quelles
  if (sortConfig.criteria.length === 0) {
    return tasks;
  }

  // Trier les critères par ordre de priorité
  const sortedCriteria = [...sortConfig.criteria].sort((a, b) => a.order - b.order);

  return [...tasks].sort((taskA, taskB) => {
    for (const criteria of sortedCriteria) {
      const fieldConfig = fieldConfigs.find(config => config.field === criteria.field);
      if (!fieldConfig) continue;

      const valueA = getTaskFieldValue(taskA, criteria.field);
      const valueB = getTaskFieldValue(taskB, criteria.field);
      
      const comparison = compareValues(valueA, valueB, fieldConfig.type);
      
      if (comparison !== 0) {
        return criteria.direction === 'asc' ? comparison : -comparison;
      }
      // Si les valeurs sont égales, on continue avec le critère suivant
    }
    
    return 0; // Si tous les critères sont égaux
  });
};
