import type { Task, Status, Priority } from "../types/task";

export const getPriorityColor = (priority: Priority): string => {
	switch (priority) {
		case 1: // critical
			return "bg-red-100 text-red-800 border-red-200";
		case 2: // high
			return "bg-orange-100 text-orange-800 border-orange-200";
		case 3: // moderate
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case 4: // low
			return "bg-blue-100 text-blue-800 border-blue-200";
		case 5: // planning
			return "bg-green-100 text-green-800 border-green-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const getStatusColor = (status: Status): string => {
	switch (status) {
		case 1: // new
			return "bg-blue-100 text-blue-800 border-blue-200";
		case 2: // in progress
			return "bg-orange-100 text-orange-800 border-orange-200";
		case 3: // on hold
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		case 7: // closed
			return "bg-green-100 text-green-800 border-green-200";
		case 8: // canceled
			return "bg-red-100 text-red-800 border-red-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export const formatDate = (date: Date): string => {
	return date.toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

export const getNextStatus = (currentStatus: Status): Status => {
	switch (currentStatus) {
		case 1: // new
			return 2; // in progress
		case 2: // in progress
			return 7; // closed
		case 7: // closed
			return 1; // new
		case 3: // on hold
			return 2; // in progress
		case 8: // canceled
			return 1; // new
		default:
			return 1; // new
	}
};

export const isTaskOverdue = (task: Task): boolean => {
	return !!(task.dueDate && task.dueDate < new Date() && task.status !== 7);
};

export const getUniqueCategories = (tasks: Task[]): string[] => {
	const categories = tasks
		.map((task) => task.category)
		.filter((category) => category.trim() !== "");
	return [...new Set(categories)];
};
