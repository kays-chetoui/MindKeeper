import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon, EyeIcon, EyeSlashIcon, ArrowUpIcon, ArrowDownIcon, Cog6ToothIcon, ArrowUturnLeftIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/solid";
import type { TableColumn } from "../../types/columns";

interface ColumnConfigModalProps {
	isOpen: boolean;
	onClose: () => void;
	columns: TableColumn[];
	onToggleColumn: (columnId: string) => void;
	onReorderColumns: (columns: TableColumn[]) => void;
	onResetToDefault: () => void;
}

export const ColumnConfigModal: React.FC<ColumnConfigModalProps> = ({ isOpen, onClose, columns, onToggleColumn, onReorderColumns, onResetToDefault }) => {
	const { t } = useTranslation();
	const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
	const [localColumns, setLocalColumns] = useState(columns);
	const [showResetConfirmation, setShowResetConfirmation] = useState(false);

	React.useEffect(() => {
		// Filter out the actions column from the configurator
		const filteredColumns = [...columns].filter((col) => col.id !== "actions").sort((a, b) => a.order - b.order);
		setLocalColumns(filteredColumns);
	}, [columns]);

	if (!isOpen) return null;

	const handleDragStart = (e: React.DragEvent, index: number) => {
		setDraggedIndex(index);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	const handleDrop = (e: React.DragEvent, dropIndex: number) => {
		e.preventDefault();
		if (draggedIndex === null) return;

		const newColumns = [...localColumns];
		const draggedColumn = newColumns[draggedIndex];
		newColumns.splice(draggedIndex, 1);
		newColumns.splice(dropIndex, 0, draggedColumn);

		setLocalColumns(newColumns);
		setDraggedIndex(null);
	};

	const moveColumn = (index: number, direction: "up" | "down") => {
		const newColumns = [...localColumns];
		const targetIndex = direction === "up" ? index - 1 : index + 1;

		if (targetIndex < 0 || targetIndex >= newColumns.length) return;

		[newColumns[index], newColumns[targetIndex]] = [newColumns[targetIndex], newColumns[index]];
		setLocalColumns(newColumns);
	};

	const handleSave = () => {
		// Add back the actions column with order 0 when saving
		const actionsColumn = columns.find((col) => col.id === "actions");
		const columnsWithActions = actionsColumn ? [{ ...actionsColumn, order: 0 }, ...localColumns.map((col, index) => ({ ...col, order: index + 1 }))] : localColumns;

		onReorderColumns(columnsWithActions);
		onClose();
	};

	const handleReset = () => {
		setShowResetConfirmation(true);
	};

	const confirmReset = () => {
		onResetToDefault();
		setShowResetConfirmation(false);
		onClose();
	};

	const cancelReset = () => {
		setShowResetConfirmation(false);
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
				{/* Overlay complètement transparent - clique pour fermer */}
				<div className="fixed inset-0" onClick={onClose} />

				{/* Modal */}
				<div className="relative bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl max-w-lg w-full border border-gray-200">
					{/* Header */}
					<div className="flex items-center justify-between p-4 border-b border-gray-200">
						<div className="flex items-center space-x-2">
							<Cog6ToothIcon className="h-5 w-5 text-gray-600" />
							<h3 className="text-lg font-semibold text-gray-900">{t("tasks.configureColumns")}</h3>
						</div>
						<button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
							<XMarkIcon className="h-5 w-5" />
						</button>
					</div>

					{/* Content */}
					<div className="p-4">
						<p className="text-sm text-gray-600 mb-4">{t("tasks.configureColumnsDescription")}</p>

						{/* Column List */}
						<div className="space-y-2 max-h-80 overflow-y-auto">
							{localColumns.map((column, index) => (
								<div
									key={column.id}
									draggable
									onDragStart={(e) => handleDragStart(e, index)}
									onDragOver={handleDragOver}
									onDrop={(e) => handleDrop(e, index)}
									className={`flex items-center justify-between p-3 bg-gray-50 rounded-lg border ${
										draggedIndex === index ? "opacity-50" : "hover:bg-gray-100"
									} cursor-move transition-colors`}
								>
									<div className="flex items-center space-x-3">
										<Bars3Icon className="h-4 w-4 text-gray-400" />
										<span className="text-sm font-medium text-gray-900">{t(column.labelKey)}</span>
									</div>

									<div className="flex items-center space-x-2">
										{/* Move buttons */}
										<button
											onClick={() => moveColumn(index, "up")}
											disabled={index === 0}
											className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
											title={t("tasks.moveUp")}
										>
											<ArrowUpIcon className="h-4 w-4" />
										</button>
										<button
											onClick={() => moveColumn(index, "down")}
											disabled={index === localColumns.length - 1}
											className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
											title={t("tasks.moveDown")}
										>
											<ArrowDownIcon className="h-4 w-4" />
										</button>

										{/* Visibility toggle */}
										<button
											onClick={() => onToggleColumn(column.id)}
											className={`p-1 transition-colors ${column.visible ? "text-blue-600 hover:text-blue-800" : "text-gray-400 hover:text-gray-600"}`}
											title={column.visible ? t("tasks.hideColumn") : t("tasks.showColumn")}
										>
											{column.visible ? <EyeIcon className="h-4 w-4" /> : <EyeSlashIcon className="h-4 w-4" />}
										</button>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50/80 backdrop-blur-sm">
						<button onClick={handleReset} className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
							<ArrowUturnLeftIcon className="h-4 w-4" />
							<span>{t("tasks.resetToDefault")}</span>
						</button>

						<div className="flex space-x-2">
							<button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
								{t("common.cancel")}
							</button>
							<button onClick={handleSave} className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
								{t("common.save")}
							</button>
						</div>
					</div>
				</div>

				{/* Popup de confirmation pour le reset */}
				{showResetConfirmation && (
					<div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
						<div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
							<div className="flex items-center space-x-3 mb-4">
								<ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />
								<h4 className="text-lg font-semibold text-gray-900">{t("common.confirmAction")}</h4>
							</div>
							<p className="text-sm text-gray-600 mb-6">{t("tasks.confirmResetColumns")}</p>
							<div className="flex space-x-3 justify-end">
								<button onClick={cancelReset} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
									{t("common.cancel")}
								</button>
								<button onClick={confirmReset} className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
									{t("common.confirm")}
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
