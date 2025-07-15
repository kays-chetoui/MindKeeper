// Test du tri multi-niveaux
import { applyMultiLevelSort, getTaskFieldValue } from "../src/types/multiLevelSort.js";

// Données de test
const testTasks = [
	{
		id: "1",
		title: "Tâche Alpha",
		priority: 2,
		status: 1,
		category: "Travail",
		dueDate: new Date("2025-07-20"),
		startDate: new Date("2025-07-15"),
		createdAt: new Date("2025-07-10"),
		description: "Description alpha",
		tags: [],
		recurrence: "none",
		notes: "",
	},
	{
		id: "2",
		title: "Tâche Beta",
		priority: 1,
		status: 1,
		category: "Travail",
		dueDate: new Date("2025-07-18"),
		startDate: new Date("2025-07-15"),
		createdAt: new Date("2025-07-12"),
		description: "Description beta",
		tags: [],
		recurrence: "none",
		notes: "",
	},
	{
		id: "3",
		title: "Tâche Gamma",
		priority: 1,
		status: 2,
		category: "Personnel",
		dueDate: new Date("2025-07-19"),
		startDate: new Date("2025-07-15"),
		createdAt: new Date("2025-07-11"),
		description: "Description gamma",
		tags: [],
		recurrence: "none",
		notes: "",
	},
	{
		id: "4",
		title: "Tâche Delta",
		priority: 2,
		status: 1,
		category: "Personnel",
		dueDate: new Date("2025-07-17"),
		startDate: new Date("2025-07-15"),
		createdAt: new Date("2025-07-13"),
		description: "Description delta",
		tags: [],
		recurrence: "none",
		notes: "",
	},
];

const fieldConfigs = [
	{ field: "priority", label: "Priorité", type: "number" },
	{ field: "status", label: "Statut", type: "number" },
	{ field: "title", label: "Titre", type: "text" },
	{ field: "category", label: "Catégorie", type: "text" },
	{ field: "dueDate", label: "Échéance", type: "date" },
];

// Test 1: Tri par priorité uniquement
console.log("=== Test 1: Tri par priorité (asc) ===");
const sortConfig1 = {
	criteria: [{ id: "1", field: "priority", direction: "asc", order: 0 }],
	enabled: true,
};

const result1 = applyMultiLevelSort(testTasks, sortConfig1, fieldConfigs);
console.log(
	"Résultat:",
	result1.map((t) => `${t.title} (priorité: ${t.priority})`)
);

// Test 2: Tri par priorité puis par statut
console.log("\n=== Test 2: Tri par priorité (asc) puis par statut (asc) ===");
const sortConfig2 = {
	criteria: [
		{ id: "1", field: "priority", direction: "asc", order: 0 },
		{ id: "2", field: "status", direction: "asc", order: 1 },
	],
	enabled: true,
};

const result2 = applyMultiLevelSort(testTasks, sortConfig2, fieldConfigs);
console.log(
	"Résultat:",
	result2.map((t) => `${t.title} (priorité: ${t.priority}, statut: ${t.status})`)
);

// Test 3: Tri par priorité puis par titre
console.log("\n=== Test 3: Tri par priorité (asc) puis par titre (asc) ===");
const sortConfig3 = {
	criteria: [
		{ id: "1", field: "priority", direction: "asc", order: 0 },
		{ id: "2", field: "title", direction: "asc", order: 1 },
	],
	enabled: true,
};

const result3 = applyMultiLevelSort(testTasks, sortConfig3, fieldConfigs);
console.log(
	"Résultat:",
	result3.map((t) => `${t.title} (priorité: ${t.priority})`)
);
