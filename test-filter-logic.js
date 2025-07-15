// Test rapide de la logique de filtrage
import { applyAdvancedFilter, FilterCondition, AdvancedFilter } from "../src/types/advancedFilter";
import type { Task } from "../src/types/task";

// Tâches d'exemple
const testTasks: Task[] = [
	{
		id: "1",
		title: "Tâche 1",
		description: "Description 1",
		category: "Travail",
		priority: 1,
		tags: ["urgent"],
		status: 1,
		recurrence: "none",
		notes: "",
		createdAt: new Date(),
	},
	{
		id: "2",
		title: "Tâche 2",
		description: "Description 2",
		category: "Personnel",
		priority: 3,
		tags: ["normal"],
		status: 2,
		recurrence: "none",
		notes: "",
		createdAt: new Date(),
	},
];

// Test 1: Aucune condition - doit retourner toutes les tâches
const noConditionsFilter: AdvancedFilter = {
	conditions: [],
	enabled: true,
};

const result1 = applyAdvancedFilter(testTasks, noConditionsFilter);
console.log("Test 1 - Aucune condition:", result1.length, "tâches (attendu: 2)");

// Test 2: Condition qui ne correspond à rien - doit retourner liste vide
const noMatchCondition: FilterCondition = {
	id: "1",
	field: "title",
	operator: "equals",
	value: "Tâche inexistante",
};

const noMatchFilter: AdvancedFilter = {
	conditions: [noMatchCondition],
	enabled: true,
};

const result2 = applyAdvancedFilter(testTasks, noMatchFilter);
console.log("Test 2 - Aucune correspondance:", result2.length, "tâches (attendu: 0)");

// Test 3: Condition qui correspond - doit retourner les tâches correspondantes
const matchCondition: FilterCondition = {
	id: "2",
	field: "category",
	operator: "equals",
	value: "Travail",
};

const matchFilter: AdvancedFilter = {
	conditions: [matchCondition],
	enabled: true,
};

const result3 = applyAdvancedFilter(testTasks, matchFilter);
console.log("Test 3 - Correspondance:", result3.length, "tâches (attendu: 1)");
