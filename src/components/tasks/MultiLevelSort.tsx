import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowUpIcon, ArrowDownIcon, XMarkIcon, PlusIcon, ArrowsUpDownIcon, ChevronUpIcon, ChevronDownIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { SortField, SortDirection } from "../../types/multiLevelSort";
import { useMultiLevelSort } from "../../hooks/useMultiLevelSort";
import type { Task } from "../../types/task";

interface MultiLevelSortProps {
	tasks: Task[];
	onTasksChange: (tasks: Task[]) => void;
}

export const MultiLevelSort: React.FC<MultiLevelSortProps> = ({ tasks, onTasksChange }) => {
	const { t } = useTranslation();
	const { sortConfig, directionLabels, addSortCriteria, updateSortCriteria, removeSortCriteria, moveSortCriteria, clearAllCriteria, getFieldConfig, getAvailableFields, sortedTasks } =
		useMultiLevelSort(tasks);

	// Mettre à jour les tâches quand le tri change
	React.useEffect(() => {
		onTasksChange(sortedTasks);
	}, [sortedTasks, onTasksChange]);

	const [isExpanded, setIsExpanded] = React.useState(true);
	const [selectedField, setSelectedField] = React.useState<SortField | "">("");

	const availableFields = getAvailableFields();

	const handleAddCriteria = () => {
		if (selectedField !== "") {
			addSortCriteria(selectedField as SortField);
			setSelectedField("");
		}
	};

	const getSortDirectionIcon = (direction: SortDirection) => {
		return direction === "asc" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />;
	};

	const toggleDirection = (id: string, currentDirection: SortDirection) => {
		const newDirection = currentDirection === "asc" ? "desc" : "asc";
		updateSortCriteria(id, { direction: newDirection });
	};

	// Version réduite quand c'est fermé
	if (!isExpanded) {
		return (
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
				<div className="px-4 py-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-3">
							<div className="flex items-center space-x-2">
								<ArrowsUpDownIcon className="w-5 h-5 text-gray-500" />
								<h3 className="text-sm font-medium text-gray-900">{t("tasks.multiLevelSort")}</h3>
							</div>
							{sortConfig.criteria.length > 0 && (
								<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{sortConfig.criteria.length}</span>
							)}
						</div>
						<button onClick={() => setIsExpanded(true)} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
							<ChevronDownIcon className="w-4 h-4" />
						</button>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
			<div className="px-4 py-3 border-b border-gray-200">
				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<div className="flex items-center space-x-2">
							<ArrowsUpDownIcon className="w-5 h-5 text-gray-500" />
							<h3 className="text-sm font-medium text-gray-900">{t("tasks.multiLevelSort")}</h3>
						</div>
						{sortConfig.criteria.length > 0 && (
							<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{sortConfig.criteria.length}</span>
						)}
					</div>
					<button onClick={() => setIsExpanded(false)} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
						<ChevronUpIcon className="w-4 h-4" />
					</button>
				</div>
			</div>

			<div className="p-4">
				{/* Liste des critères de tri */}
				{sortConfig.criteria.length > 0 && (
					<div className="space-y-2 mb-4">
						{sortConfig.criteria.map((criteria, index) => {
							const fieldConfig = getFieldConfig(criteria.field);

							return (
								<div key={criteria.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
									<div className="flex items-center space-x-3 flex-1">
										<div className="flex items-center space-x-2 text-sm text-gray-600">
											<span className="flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">{index + 1}</span>
											<span>{index === 0 ? t("tasks.sortBy") : t("tasks.thenBy")}</span>
										</div>

										<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
											{fieldConfig?.label || criteria.field}
										</span>

										<button
											onClick={() => toggleDirection(criteria.id, criteria.direction)}
											className="inline-flex items-center space-x-1 px-2 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
											title={t("tasks.changeSortDirection")}
										>
											{getSortDirectionIcon(criteria.direction)}
											<span>{directionLabels[criteria.direction]}</span>
										</button>
									</div>

									<div className="flex items-center space-x-1">
										<button
											onClick={() => moveSortCriteria(criteria.id, "up")}
											disabled={index === 0}
											className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
											title={t("tasks.moveUp")}
										>
											<ChevronUpIcon className="w-4 h-4" />
										</button>

										<button
											onClick={() => moveSortCriteria(criteria.id, "down")}
											disabled={index === sortConfig.criteria.length - 1}
											className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
											title={t("tasks.moveDown")}
										>
											<ChevronDownIcon className="w-4 h-4" />
										</button>

										<button onClick={() => removeSortCriteria(criteria.id)} className="p-1 text-red-400 hover:text-red-600" title={t("tasks.removeSortCriteria")}>
											<XMarkIcon className="w-4 h-4" />
										</button>
									</div>
								</div>
							);
						})}
					</div>
				)}

				{/* Ajouter un nouveau critère */}
				{availableFields.length > 0 && (
					<div className="flex items-center space-x-3 mb-4">
						<select
							value={selectedField}
							onChange={(e) => setSelectedField(e.target.value as SortField)}
							className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
						>
							<option value="">{t("tasks.selectFieldToSort")}</option>
							{availableFields.map((config) => (
								<option key={config.field} value={config.field}>
									{config.label}
								</option>
							))}
						</select>

						<button
							onClick={handleAddCriteria}
							disabled={!selectedField}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<PlusIcon className="w-4 h-4 mr-1" />
							{t("tasks.addSortCriteria")}
						</button>
					</div>
				)}

				{/* Actions globales */}
				{sortConfig.criteria.length > 0 && (
					<div className="flex justify-between items-center pt-3 border-t border-gray-200">
						<div className="text-sm text-gray-600">{t("tasks.sortCriteriaCount", { count: sortConfig.criteria.length })}</div>

						<button onClick={clearAllCriteria} className="inline-flex items-center text-sm text-red-600 hover:text-red-700">
							<TrashIcon className="w-4 h-4 mr-1" />
							{t("tasks.clearAllSort")}
						</button>
					</div>
				)}

				{/* Message si aucun critère */}
				{sortConfig.criteria.length === 0 && availableFields.length === 0 && (
					<div className="text-center py-6 text-gray-500">
						<ArrowsUpDownIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
						<p className="text-sm">Tous les champs sont déjà utilisés pour le tri</p>
					</div>
				)}
			</div>
		</div>
	);
};
