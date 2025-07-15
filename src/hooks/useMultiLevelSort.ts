import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { Task } from '../types/task';
import type { 
  MultiLevelSort, 
  SortCriteria, 
  SortField, 
  SortDirection,
  SortFieldConfig
} from '../types/multiLevelSort';
import { applyMultiLevelSort as applySorting } from '../types/multiLevelSort';

export const useMultiLevelSort = (tasks: Task[]) => {
  const { t } = useTranslation();
  
  const [sortConfig, setSortConfig] = useState<MultiLevelSort>({
    criteria: [],
    enabled: true, // Toujours activé maintenant
  });

  // Configuration des champs de tri disponibles
  const sortFieldConfigs: SortFieldConfig[] = useMemo(() => [
    {
      field: 'title',
      label: t('tasks.taskTitle'),
      type: 'text',
    },
    {
      field: 'priority',
      label: t('tasks.priority'),
      type: 'number',
    },
    {
      field: 'status',
      label: t('tasks.status'),
      type: 'number',
    },
    {
      field: 'category',
      label: t('tasks.category'),
      type: 'text',
    },
    {
      field: 'dueDate',
      label: t('tasks.dueDate'),
      type: 'date',
    },
    {
      field: 'startDate',
      label: t('tasks.startDate'),
      type: 'date',
    },
    {
      field: 'active',
      label: t('tasks.active'),
      type: 'boolean',
    },
    {
      field: 'createdAt',
      label: t('tasks.createdAt'),
      type: 'date',
    },
  ], [t]);

  // Labels pour les directions de tri
  const directionLabels = useMemo(() => ({
    asc: t('tasks.ascending'),
    desc: t('tasks.descending'),
  }), [t]);

  const addSortCriteria = (field: SortField, direction: SortDirection = 'asc') => {
    // Vérifier si le champ n'est pas déjà utilisé
    if (sortConfig.criteria.some(criteria => criteria.field === field)) {
      return;
    }

    const newCriteria: SortCriteria = {
      id: Date.now().toString(),
      field,
      direction,
      order: sortConfig.criteria.length, // Nouveau critère à la fin
    };
    
    setSortConfig(prev => ({
      ...prev,
      criteria: [...prev.criteria, newCriteria],
    }));
  };

  const updateSortCriteria = (id: string, updates: Partial<Omit<SortCriteria, 'id'>>) => {
    setSortConfig(prev => ({
      ...prev,
      criteria: prev.criteria.map(criteria =>
        criteria.id === id ? { ...criteria, ...updates } : criteria
      ),
    }));
  };

  const removeSortCriteria = (id: string) => {
    setSortConfig(prev => {
      const newCriteria = prev.criteria
        .filter(criteria => criteria.id !== id)
        .map((criteria, index) => ({ ...criteria, order: index })); // Réajuster l'ordre
      
      return {
        ...prev,
        criteria: newCriteria,
      };
    });
  };

  const moveSortCriteria = (id: string, direction: 'up' | 'down') => {
    setSortConfig(prev => {
      const criteria = [...prev.criteria];
      const index = criteria.findIndex(c => c.id === id);
      
      if (index === -1) return prev;
      
      let newIndex = index;
      if (direction === 'up' && index > 0) {
        newIndex = index - 1;
      } else if (direction === 'down' && index < criteria.length - 1) {
        newIndex = index + 1;
      } else {
        return prev; // Pas de changement possible
      }
      
      // Échanger les positions
      [criteria[index], criteria[newIndex]] = [criteria[newIndex], criteria[index]];
      
      // Réajuster les ordres
      criteria.forEach((criteria, idx) => {
        criteria.order = idx;
      });
      
      return {
        ...prev,
        criteria,
      };
    });
  };

  const clearAllCriteria = () => {
    setSortConfig(prev => ({
      ...prev,
      criteria: [],
    }));
  };

  const getFieldConfig = (field: SortField): SortFieldConfig | undefined => {
    return sortFieldConfigs.find(config => config.field === field);
  };

  const getAvailableFields = (): SortFieldConfig[] => {
    const usedFields = sortConfig.criteria.map(c => c.field);
    return sortFieldConfigs.filter(config => !usedFields.includes(config.field));
  };

  // Application du tri multi-niveaux
  const sortedTasks = useMemo(() => {
    const result = applySorting(tasks, sortConfig, sortFieldConfigs);
    
    // Log temporaire pour débogage - plus détaillé
    if (sortConfig.criteria.length > 0) {
      console.log('=== DÉBOGAGE TRI MULTI-NIVEAUX ===');
      console.log('Configuration de tri:', sortConfig.criteria.map(c => ({ 
        field: c.field, 
        direction: c.direction, 
        order: c.order 
      })));
      
      console.log('Tâches AVANT tri:');
      tasks.forEach((t, i) => {
        console.log(`  ${i+1}. "${t.title}" - Priorité: ${t.priority} - Statut: ${t.status}`);
      });
      
      console.log('Tâches APRÈS tri:');
      result.forEach((t, i) => {
        console.log(`  ${i+1}. "${t.title}" - Priorité: ${t.priority} - Statut: ${t.status}`);
      });
      console.log('=== FIN DÉBOGAGE ===');
    }
    
    return result;
  }, [tasks, sortConfig, sortFieldConfigs]);

  return {
    sortConfig,
    setSortConfig,
    sortFieldConfigs,
    directionLabels,
    addSortCriteria,
    updateSortCriteria,
    removeSortCriteria,
    moveSortCriteria,
    clearAllCriteria,
    getFieldConfig,
    getAvailableFields,
    sortedTasks,
  };
};
