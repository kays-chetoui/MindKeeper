import { useState } from "react";
import type { Task, NewTask } from "../types/task";
import { getNextStatus } from "../utils/taskUtils";

const initialTasks: Task[] = [
	{
		id: "1",
		title: "Finaliser le rapport mensuel",
		description: "Compiler les données et créer le rapport pour la direction",
		category: "Travail",
		priority: 1, // critical
		tags: ["rapport", "urgent", "direction"],
		status: 2, // in progress
		recurrence: "monthly",
		dueDate: new Date("2025-01-15"),
		startDate: new Date("2025-01-05"),
		notes: "Important pour la réunion du conseil d'administration",
		active: true,
		createdAt: new Date("2025-01-05"),
	},
	{
		id: "2",
		title: "Réunion équipe projet",
		description: "Point hebdomadaire avec l'équipe de développement",
		category: "Meetings",
		priority: 3, // moderate
		tags: ["réunion", "équipe", "hebdomadaire"],
		status: 7, // closed
		recurrence: "weekly",
		dueDate: new Date("2025-01-10"),
		startDate: new Date("2025-01-03"),
		notes: "Préparer l'ordre du jour avant la réunion",
		active: false, // Fermée donc inactive
		createdAt: new Date("2025-01-03"),
	},
	{
		id: "3",
		title: "Révision budget 2025",
		description: "Analyser les dépenses et ajuster le budget prévisionnel",
		category: "Finance",
		priority: 2, // high
		tags: ["budget", "analyse", "2025"],
		status: 1, // new
		recurrence: "yearly",
		dueDate: new Date("2025-01-20"),
		startDate: new Date("2025-01-02"),
		notes: "Consulter les rapports financiers du Q4 2024",
		active: true,
		createdAt: new Date("2025-01-02"),
	},
	{
		id: "4",
		title: "Formation sécurité informatique",
		description: "Module e-learning obligatoire sur la cybersécurité",
		category: "Formation",
		priority: 4, // low
		tags: ["formation", "sécurité", "IT"],
		status: 1, // new
		recurrence: "yearly",
		dueDate: new Date("2025-02-01"),
		startDate: new Date("2025-01-15"),
		notes: "Certificat requis pour le renouvellement des accès",
		active: true,
		createdAt: new Date("2025-01-08"),
	},
	{
		id: "5",
		title: "Développer API REST",
		description: "Créer les endpoints pour le module utilisateurs",
		category: "Développement",
		priority: 1, // critical
		tags: ["API", "backend", "users"],
		status: 2, // in progress
		recurrence: "none",
		dueDate: new Date("2025-01-18"),
		startDate: new Date("2025-01-10"),
		notes: "Utiliser FastAPI avec authentification JWT",
		active: true,
		createdAt: new Date("2025-01-10"),
	},
	{
		id: "6",
		title: "Planifier les vacances d'été",
		description: "Choisir la destination et réserver les billets",
		category: "Personnel",
		priority: 4, // low
		tags: ["vacances", "famille", "voyage"],
		status: 3, // on hold
		recurrence: "none",
		dueDate: new Date("2025-03-01"),
		startDate: new Date("2025-01-20"),
		notes: "Attendre les promotions de février avant de réserver",
		active: false, // En pause donc inactive
		createdAt: new Date("2025-01-07"),
	},
	{
		id: "7",
		title: "Mise à jour documentation",
		description: "Réviser et mettre à jour la documentation technique",
		category: "Documentation",
		priority: 3, // moderate
		tags: ["docs", "technique", "update"],
		status: 7, // closed
		recurrence: "monthly",
		dueDate: new Date("2025-01-12"),
		startDate: new Date("2025-01-01"),
		notes: "Inclure les nouvelles fonctionnalités du sprint 12",
		active: false, // Fermée donc inactive
		createdAt: new Date("2025-01-01"),
	},
	{
		id: "8",
		title: "Entretien véhicule",
		description: "Vidange et contrôle technique annuel",
		category: "Personnel",
		priority: 2, // high
		tags: ["voiture", "entretien", "contrôle"],
		status: 1, // new
		recurrence: "yearly",
		dueDate: new Date("2025-01-25"),
		startDate: undefined,
		notes: "RDV chez le concessionnaire, penser aux papiers",
		active: true,
		createdAt: new Date("2025-01-06"),
	},
	{
		id: "9",
		title: "Optimiser performances base de données",
		description: "Analyser et optimiser les requêtes lentes",
		category: "Développement",
		priority: 2, // high
		tags: ["database", "performance", "SQL"],
		status: 2, // in progress
		recurrence: "none",
		dueDate: new Date("2025-01-22"),
		startDate: new Date("2025-01-12"),
		notes: "Utiliser EXPLAIN ANALYZE pour identifier les goulots",
		active: true,
		createdAt: new Date("2025-01-12"),
	},
	{
		id: "10",
		title: "Préparer présentation client",
		description: "Slides pour demo du nouveau produit",
		category: "Commercial",
		priority: 1, // critical
		tags: ["présentation", "client", "demo"],
		status: 3, // on hold
		recurrence: "none",
		dueDate: new Date("2025-01-16"),
		startDate: new Date("2025-01-14"),
		notes: "Attendre validation des fonctionnalités par l'équipe produit",
		active: false, // En pause donc inactive
		createdAt: new Date("2025-01-14"),
	},
	{
		id: "11",
		title: "Exercice quotidien",
		description: "30 minutes de sport chaque matin",
		category: "Santé",
		priority: 3, // moderate
		tags: ["sport", "santé", "routine"],
		status: 2, // in progress
		recurrence: "daily",
		dueDate: undefined,
		startDate: new Date("2025-01-01"),
		notes: "Objectif : maintenir la régularité pendant 3 mois",
		active: true,
		createdAt: new Date("2025-01-01"),
	},
	{
		id: "12",
		title: "Audit sécurité serveurs",
		description: "Vérification complète de la sécurité infrastructure",
		category: "Sécurité",
		priority: 1, // critical
		tags: ["audit", "sécurité", "serveurs"],
		status: 8, // canceled
		recurrence: "none",
		dueDate: new Date("2025-01-11"),
		startDate: new Date("2025-01-09"),
		notes: "Reporté suite à la migration cloud prévue",
		active: false, // Annulée donc inactive
		createdAt: new Date("2025-01-09"),
	},
];

const initialNewTask: NewTask = {
	title: "",
	description: "",
	category: "",
	priority: 3, // moderate par défaut
	tags: [],
	status: 1, // new par défaut
	recurrence: "none",
	dueDate: "",
	startDate: "",
	notes: "",
	active: true, // Par défaut, une nouvelle tâche est active
};

export const useTasks = () => {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [newTask, setNewTask] = useState<NewTask>(initialNewTask);
	const [isAddingTask, setIsAddingTask] = useState(false);
	const [editingTask, setEditingTask] = useState<Task | null>(null);

	const addTask = () => {
		if (newTask.title.trim()) {
			const task: Task = {
				id: Date.now().toString(),
				title: newTask.title.trim(),
				description: newTask.description.trim(),
				category: newTask.category.trim(),
				priority: newTask.priority,
				tags: newTask.tags,
				status: newTask.status,
				recurrence: newTask.recurrence,
				dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
				startDate: newTask.startDate ? new Date(newTask.startDate) : undefined,
				notes: newTask.notes.trim(),
				active: newTask.active,
				createdAt: new Date(),
			};
			setTasks([...tasks, task]);
			setNewTask(initialNewTask);
			setIsAddingTask(false);
		}
	};

	const updateTask = (updatedTask: Task) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === updatedTask.id) {
					return updatedTask;
				}
				return task;
			})
		);
		setEditingTask(null);
	};

	const toggleTask = (id: string) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === id) {
					return { ...task, status: getNextStatus(task.status) };
				}
				return task;
			})
		);
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const startEditingTask = (task: Task) => {
		setEditingTask(task);
		setIsAddingTask(false); // Fermer le formulaire d'ajout si ouvert
	};

	const cancelEditingTask = () => {
		setEditingTask(null);
	};

	return {
		tasks,
		newTask,
		setNewTask,
		isAddingTask,
		setIsAddingTask,
		addTask,
		toggleTask,
		deleteTask,
		editingTask,
		updateTask,
		startEditingTask,
		cancelEditingTask,
	};
};
