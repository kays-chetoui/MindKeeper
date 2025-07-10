export interface TableColumn {
	id: string;
	key: keyof import('./task').Task | 'actions';
	labelKey: string;
	visible: boolean;
	order: number;
	width?: string;
	sortable?: boolean;
}

export type ColumnId = 
	| 'title'
	| 'description'
	| 'category'
	| 'priority'
	| 'status'
	| 'tags'
	| 'recurrence'
	| 'startDate'
	| 'dueDate'
	| 'notes'
	| 'createdAt'
	| 'actions';

export interface ColumnConfig {
	columns: TableColumn[];
}

export const defaultColumns: TableColumn[] = [
	{ id: 'title', key: 'title', labelKey: 'tasks.taskTitle', visible: true, order: 0, sortable: true },
	{ id: 'description', key: 'description', labelKey: 'tasks.taskDescription', visible: true, order: 1, sortable: false },
	{ id: 'category', key: 'category', labelKey: 'tasks.category', visible: true, order: 2, sortable: true },
	{ id: 'priority', key: 'priority', labelKey: 'tasks.priority', visible: true, order: 3, sortable: true },
	{ id: 'status', key: 'status', labelKey: 'tasks.status', visible: true, order: 4, sortable: true },
	{ id: 'tags', key: 'tags', labelKey: 'tasks.tags', visible: true, order: 5, sortable: false },
	{ id: 'recurrence', key: 'recurrence', labelKey: 'tasks.recurrence', visible: true, order: 6, sortable: true },
	{ id: 'startDate', key: 'startDate', labelKey: 'tasks.startDate', visible: true, order: 7, sortable: true },
	{ id: 'dueDate', key: 'dueDate', labelKey: 'tasks.dueDate', visible: true, order: 8, sortable: true },
	{ id: 'notes', key: 'notes', labelKey: 'tasks.notes', visible: false, order: 9, sortable: false },
	{ id: 'createdAt', key: 'createdAt', labelKey: 'tasks.createdAt', visible: false, order: 10, sortable: true },
	{ id: 'actions', key: 'actions', labelKey: 'tasks.actions', visible: true, order: 11, sortable: false },
];
