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
        dueDate: "Due Date",
        cancel: "Cancel",
        add: "Add",
        noTasks: "No tasks yet. Add your first task to get started!",
        created: "Created",
        due: "Due"
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
        dueDate: "Date d'échéance",
        cancel: "Annuler",
        add: "Ajouter",
        noTasks: "Aucune tâche pour le moment. Ajoutez votre première tâche pour commencer !",
        created: "Créée le",
        due: "Échéance"
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
