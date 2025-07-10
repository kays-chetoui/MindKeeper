import { useState } from 'react';
import type { TableColumn, ColumnConfig } from '../types/columns';
import { defaultColumns } from '../types/columns';

const STORAGE_KEY = 'mindkeeper-table-columns';

export const useTableColumns = () => {
	const [columns, setColumns] = useState<TableColumn[]>(() => {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				const config: ColumnConfig = JSON.parse(stored);
				// Merge with default columns to handle new columns added in updates
				const mergedColumns = defaultColumns.map(defaultCol => {
					const storedCol = config.columns.find(col => col.id === defaultCol.id);
					return storedCol ? { ...defaultCol, ...storedCol } : defaultCol;
				});
				// Add any new columns that weren't in storage
				const newColumns = defaultColumns.filter(
					defaultCol => !config.columns.some(col => col.id === defaultCol.id)
				);
				return [...mergedColumns, ...newColumns].sort((a, b) => a.order - b.order);
			}
		} catch (error) {
			console.error('Error loading column configuration:', error);
		}
		return defaultColumns;
	});

	const saveColumns = (newColumns: TableColumn[]) => {
		try {
			const config: ColumnConfig = { columns: newColumns };
			localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
			setColumns(newColumns);
		} catch (error) {
			console.error('Error saving column configuration:', error);
		}
	};

	const toggleColumnVisibility = (columnId: string) => {
		const newColumns = columns.map(col =>
			col.id === columnId ? { ...col, visible: !col.visible } : col
		);
		saveColumns(newColumns);
	};

	const reorderColumns = (newColumns: TableColumn[]) => {
		const reorderedColumns = newColumns.map((col, index) => ({
			...col,
			order: index
		}));
		saveColumns(reorderedColumns);
	};

	const resetToDefault = () => {
		saveColumns(defaultColumns);
	};

	const visibleColumns = columns
		.filter(col => col.visible)
		.sort((a, b) => a.order - b.order);

	return {
		columns,
		visibleColumns,
		toggleColumnVisibility,
		reorderColumns,
		resetToDefault,
		saveColumns
	};
};
