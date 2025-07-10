export interface Task {
	id: string;
	title: string;
	description: string;
	category: string;
	priority: 1 | 2 | 3 | 4 | 5; // 1: critical, 2: high, 3: moderate, 4: low, 5: planning
	tags: string[];
	status: 1 | 2 | 3 | 7 | 8; // 1: new, 2: in progress, 3: on hold, 7: closed, 8: canceled
	recurrence: "none" | "daily" | "weekly" | "monthly" | "yearly";
	dueDate?: Date;
	startDate?: Date;
	notes: string;
	createdAt: Date;
}

export type Priority = 1 | 2 | 3 | 4 | 5;
export type Status = 1 | 2 | 3 | 7 | 8;
export type Recurrence = "none" | "daily" | "weekly" | "monthly" | "yearly";

export type FilterStatus = "all" | Status;
export type FilterPriority = "all" | Priority;
export type SortBy = "dueDate" | "priority" | "createdAt" | "title" | "status";
export type SortOrder = "asc" | "desc";

export interface NewTask {
	title: string;
	description: string;
	category: string;
	priority: Priority;
	tags: string[];
	status: Status;
	recurrence: Recurrence;
	dueDate: string;
	startDate: string;
	notes: string;
}
