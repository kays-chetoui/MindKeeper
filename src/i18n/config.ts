import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      navigation: {
        tasks: "Tasks",
        budget: "Budget", 
        profile: "Profile",
        company: "Company",
        login: "Log in"
      },
      // Brand
      brand: {
        name: "Mind Keeper"
      },
      // Hero section
      hero: {
        announcement: "🎉 Now live: The all-in-one app to manage your tasks and budget with ease.",
        title: "Master your day. Own your budget",
        subtitle: "Stay organized, focused, and financially aware - all in one place.",
        getStarted: "Get started",
        seeHowItWorks: "See How It Works"
      },
      // Accessibility
      accessibility: {
        openMainMenu: "Open main menu",
        closeMenu: "Close menu"
      },
      // Tasks
      tasks: {
        title: "Tasks",
        subtitle: "Manage your daily tasks and stay organized",
        addTask: "Add Task",
        newTask: "New Task",
        taskTitle: "Title",
        taskTitlePlaceholder: "Enter task title...",
        taskDescription: "Description",
        taskDescriptionPlaceholder: "Enter task description...",
        priority: "Priority",
        priorityLow: "Low",
        priorityMedium: "Medium",
        priorityHigh: "High",
        // Priorités numériques (1=critique, 2=haute, 3=modérée, 4=basse, 5=planification)
        priority1: "1 - Critical",
        priority2: "2 - High", 
        priority3: "3 - Moderate",
        priority4: "4 - Low",
        priority5: "5 - Planning",
        dueDate: "Due Date",
        cancel: "Cancel",
        add: "Add",
        noTasks: "No tasks yet. Add your first task to get started!",
        created: "Created",
        due: "Due",
        // Filtres et tri
        filters: "Filters & Sorting",
        status: "Status",
        allTasks: "All Tasks",
        pendingTasks: "Pending",
        completedTasks: "Completed",
        allPriorities: "All Priorities",
        sortBy: "Sort By",
        sortOrder: "Order",
        ascending: "Ascending",
        descending: "Descending",
        createdDate: "Created Date",
        createdAt: "Created At",
        task: "task",
        tasks: "tasks",
        total: "total",
        noTasksMatchingFilters: "No tasks match the current filters.",
        // Tableau
        actions: "Actions",
        noDescription: "No description",
        noDueDate: "No due date",
        deleteTask: "Delete task",
        editTask: "Edit task",
        updateTask: "Update Task",
        tagsPlaceholder: "Enter tags separated by commas",
        notesPlaceholder: "Enter notes...",
        // Nouveaux champs
        category: "Category",
        tags: "Tags",
        startDate: "Start Date",
        recurrence: "Recurrence",
        notes: "Notes",
        noCategory: "No category",
        noTags: "No tags",
        noStartDate: "No start date",
        allCategories: "All Categories",
        // Category management
        manageCategories: "Manage Categories",
        addNewCategory: "Add New Category",
        categoryNamePlaceholder: "Category name...",
        selectCategory: "Select a category",
        manage: "Manage",
        defaultCategory: "Default",
        // Advanced Filters  
        advancedFilters: "Filters",
        addCondition: "Add Condition",
        field: "Field",
        operator: "Operator", 
        value: "Value",
        logicalOperator: "Logical Operator",
        removeCondition: "Remove Condition",
        clearAllConditions: "Clear All",
        enableAdvancedFilters: "Enable Advanced Filters",
        selectValue: "Select a value",
        enterValue: "Enter a value",
        enterTagsCommaSeparated: "Enter tags separated by commas",
        noConditionsYet: "No conditions yet",
        addConditionToStart: "Add a condition to start filtering",
        // Statuts numériques (1=nouveau, 2=en cours, 3=en attente, 7=fermé, 8=annulé)
        status1: "New",
        status2: "In Progress",
        status3: "On Hold",
        status7: "Closed",
        status8: "Canceled",
        // Récurrence
        recurrenceNone: "None",
        recurrenceDaily: "Daily",
        recurrenceWeekly: "Weekly",
        recurrenceMonthly: "Monthly",
        recurrenceYearly: "Yearly",
        noNotes: "No notes",
        // Configuration des colonnes
        configureColumns: "Configure Columns",
        configureColumnsDescription: "Select which columns to display and drag to reorder them.",
        moveUp: "Move up",
        moveDown: "Move down",
        hideColumn: "Hide column",
        showColumn: "Show column",
        resetToDefault: "Reset to default",
        // Multi-level sorting
        multiLevelSort: "Multi-Level Sort",
        thenBy: "then by",
        changeSortDirection: "Change sort direction",
        removeSortCriteria: "Remove sort criteria",
        selectFieldToSort: "Select a field to sort",
        addSortCriteria: "Add Sort Criteria",
        sortCriteriaCount: "{{count}} sort criteria",
        clearAllSort: "Clear All Sort"
      },
      // Common
      common: {
        cancel: "Cancel",
        save: "Save",
        close: "Close",
        add: "Add",
        edit: "Edit",
        delete: "Delete"
      },
      // Filters
      filters: {
        operators: {
          equals: "Equals",
          notEquals: "Not Equals",
          contains: "Contains",
          notContains: "Not Contains",
          greaterThan: "Greater Than",
          lessThan: "Less Than",
          greaterThanOrEqual: "Greater Than or Equal",
          lessThanOrEqual: "Less Than or Equal",
          isEmpty: "Is Empty",
          isNotEmpty: "Is Not Empty",
          startsWith: "Starts With",
          endsWith: "Ends With",
          isOneOf: "Is One Of",
          isNotOneOf: "Is Not One Of"
        },
        logicalOperators: {
          and: "AND",
          or: "OR"
        }
      }
    }
  },
  fr: {
    translation: {
      // Navigation
      navigation: {
        tasks: "Tâches",
        budget: "Budget",
        profile: "Profil", 
        company: "Entreprise",
        login: "Se connecter"
      },
      // Brand
      brand: {
        name: "Mind Keeper"
      },
      // Hero section
      hero: {
        announcement: "🎉 Maintenant disponible : L'application pour gérer vos tâches et votre budget en toute simplicité.",
        title: "Maîtrisez votre journée. Contrôlez votre budget",
        subtitle: "Restez organisé, concentré et conscient de vos finances - tout en un seul endroit.",
        getStarted: "Commencer",
        seeHowItWorks: "Comment ça marche"
      },
      // Accessibility
      accessibility: {
        openMainMenu: "Ouvrir le menu principal",
        closeMenu: "Fermer le menu"
      },
      // Tasks
      tasks: {
        title: "Tâches",
        subtitle: "Gérez vos tâches quotidiennes et restez organisé",
        addTask: "Ajouter une tâche",
        newTask: "Nouvelle tâche",
        taskTitle: "Titre",
        taskTitlePlaceholder: "Saisissez le titre de la tâche...",
        taskDescription: "Description",
        taskDescriptionPlaceholder: "Saisissez la description de la tâche...",
        priority: "Priorité",
        priorityLow: "Faible",
        priorityMedium: "Moyenne",
        priorityHigh: "Élevée",
        // Priorités numériques (1=critique, 2=haute, 3=modérée, 4=basse, 5=planification)
        priority1: "1 - Critique",
        priority2: "2 - Haute",
        priority3: "3 - Modérée",
        priority4: "4 - Basse", 
        priority5: "5 - Planification",
        dueDate: "Date d'échéance",
        cancel: "Annuler",
        add: "Ajouter",
        noTasks: "Aucune tâche pour le moment. Ajoutez votre première tâche pour commencer !",
        created: "Créée le",
        due: "Échéance",
        // Filtres et tri
        filters: "Filtres et tri",
        status: "Statut",
        allTasks: "Toutes les tâches",
        pendingTasks: "En cours",
        completedTasks: "Terminées",
        allPriorities: "Toutes les priorités",
        sortBy: "Trier par",
        sortOrder: "Ordre",
        ascending: "Croissant",
        descending: "Décroissant",
        createdDate: "Date de création",
        createdAt: "Créée le",
        task: "tâche",
        tasks: "tâches",
        total: "total",
        noTasksMatchingFilters: "Aucune tâche ne correspond aux filtres actuels.",
        // Tableau
        actions: "Actions",
        noDescription: "Aucune description",
        noDueDate: "Pas d'échéance",
        deleteTask: "Supprimer la tâche",
        editTask: "Modifier la tâche",
        updateTask: "Mettre à jour la tâche",
        tagsPlaceholder: "Saisir les étiquettes séparées par des virgules",
        notesPlaceholder: "Saisir les notes...",
        // Nouveaux champs
        category: "Catégorie",
        tags: "Étiquettes",
        startDate: "Date de début",
        recurrence: "Récurrence",
        notes: "Notes",
        noCategory: "Aucune catégorie",
        noTags: "Aucune étiquette",
        noStartDate: "Pas de date de début",
        allCategories: "Toutes les catégories",
        // Category management
        manageCategories: "Gérer les catégories",
        addNewCategory: "Ajouter une nouvelle catégorie",
        categoryNamePlaceholder: "Nom de la catégorie...",
        selectCategory: "Sélectionner une catégorie",
        manage: "Gérer",
        defaultCategory: "Par défaut",
        // Advanced Filters
        advancedFilters: "Filtres",
        addCondition: "Ajouter une Condition",
        field: "Champ",
        operator: "Opérateur",
        value: "Valeur",
        logicalOperator: "Opérateur Logique",
        removeCondition: "Supprimer la Condition",
        clearAllConditions: "Tout Effacer",
        enableAdvancedFilters: "Activer les Filtres Avancés",
        selectValue: "Sélectionner une valeur",
        enterValue: "Saisir une valeur",
        enterTagsCommaSeparated: "Saisir les étiquettes séparées par des virgules",
        noConditionsYet: "Aucune condition pour le moment",
        addConditionToStart: "Ajoutez une condition pour commencer le filtrage",
        // Statuts numériques (1=nouveau, 2=en cours, 3=en attente, 7=fermé, 8=annulé)
        status1: "Nouveau",
        status2: "En cours",
        status3: "En attente", 
        status7: "Fermé",
        status8: "Annulé",
        // Récurrence
        recurrenceNone: "Aucune",
        recurrenceDaily: "Quotidienne",
        recurrenceWeekly: "Hebdomadaire",
        recurrenceMonthly: "Mensuelle",
        recurrenceYearly: "Annuelle",
        noNotes: "Aucune note",
        // Configuration des colonnes
        configureColumns: "Configurer les colonnes",
        configureColumnsDescription: "Sélectionnez les colonnes à afficher et faites-les glisser pour les réorganiser.",
        moveUp: "Monter",
        moveDown: "Descendre",
        hideColumn: "Masquer la colonne",
        showColumn: "Afficher la colonne",
        resetToDefault: "Remettre par défaut",
        // Tri multi-niveaux
        multiLevelSort: "Tri Multi-Niveaux",
        thenBy: "puis par",
        changeSortDirection: "Changer la direction du tri",
        removeSortCriteria: "Supprimer le critère de tri",
        selectFieldToSort: "Sélectionner un champ à trier",
        addSortCriteria: "Ajouter un Critère de Tri",
        sortCriteriaCount: "{{count}} critères de tri",
        clearAllSort: "Effacer Tout le Tri"
      },
      // Common
      common: {
        cancel: "Annuler",
        save: "Sauvegarder",
        close: "Fermer",
        add: "Ajouter",
        edit: "Modifier",
        delete: "Supprimer"
      },
      // Filters
      filters: {
        operators: {
          equals: "Égal à",
          notEquals: "Différent de",
          contains: "Contient",
          notContains: "Ne contient pas",
          greaterThan: "Supérieur à",
          lessThan: "Inférieur à",
          greaterThanOrEqual: "Supérieur ou égal à",
          lessThanOrEqual: "Inférieur ou égal à",
          isEmpty: "Est vide",
          isNotEmpty: "N'est pas vide",
          startsWith: "Commence par",
          endsWith: "Se termine par",
          isOneOf: "Est l'un de",
          isNotOneOf: "N'est aucun de"
        },
        logicalOperators: {
          and: "ET",
          or: "OU"
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    }
  });

export default i18n;
