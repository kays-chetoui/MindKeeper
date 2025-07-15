import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon, Cog6ToothIcon, PencilIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Task } from "../../types/task";
import type { TableColumn } from "../../types/columns";
import { getPriorityColor, getStatusColor, formatDate, isTaskOverdue } from "../../utils/taskUtils";
import { useTableColumns } from "../../hooks/useTableColumns";
import { useCategories } from "../../hooks/useCategories";
import { ColumnConfigModal } from "./ColumnConfigModal";

interface TaskTableProps {
	tasks: Task[];
	totalTasksCount: number;
	onDeleteTask: (id: string) => void;
	onEditTask?: (task: Task) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, totalTasksCount, onDeleteTask, onEditTask }) => {
	const { t } = useTranslation();
	const { columns, visibleColumns, toggleColumnVisibility, reorderColumns, resetToDefault } = useTableColumns();
	const { getCategoryColor } = useCategories();
	const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
	const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

	const handleDeleteClick = (task: Task) => {
		setTaskToDelete(task);
		setShowDeleteConfirmation(true);
	};

	const confirmDelete = () => {
		if (taskToDelete) {
			onDeleteTask(taskToDelete.id);
			setTaskToDelete(null);
			setShowDeleteConfirmation(false);
		}
	};

	const cancelDelete = () => {
		setTaskToDelete(null);
		setShowDeleteConfirmation(false);
	};

	const getCategoryColorClass = (color: string) => {
		const colorClasses = {
			gray: "bg-gray-100 text-gray-800 border-gray-200",
			blue: "bg-blue-100 text-blue-800 border-blue-200",
			green: "bg-green-100 text-green-800 border-green-200",
			purple: "bg-purple-100 text-purple-800 border-purple-200",
			yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
			red: "bg-red-100 text-red-800 border-red-200",
			indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
			pink: "bg-pink-100 text-pink-800 border-pink-200",
		};
		return colorClasses[color as keyof typeof colorClasses] || colorClasses.gray;
	};

	const renderCell = (task: Task, column: TableColumn) => {
		switch (column.id) {
			case "title":
				return (
					<div className="max-w-xs">
						<h3 className={`font-semibold text-sm ${task.status === 7 ? "line-through text-gray-500" : "text-gray-900"}`}>{task.title}</h3>
					</div>
				);

			case "description":
				return (
					<div className="max-w-sm">
						{task.description ? <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p> : <span className="text-sm text-gray-400 italic">{t("tasks.noDescription")}</span>}
					</div>
				);

			case "category":
				return task.category ? (
					<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColorClass(getCategoryColor(task.category))}`}>{task.category}</span>
				) : (
					<span className="text-sm text-gray-400 italic">{t("tasks.noCategory")}</span>
				);

			case "priority":
				return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>{t(`tasks.priority${task.priority}`)}</span>;

			case "status":
				return <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>{t(`tasks.status${task.status}`)}</span>;

			case "tags":
				return (
					<div className="flex flex-wrap gap-0.5 max-w-xs">
						{task.tags.length > 0 ? (
							task.tags.slice(0, 2).map((tag, tagIndex) => (
								<span key={tagIndex} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
									{tag}
								</span>
							))
						) : (
							<span className="text-sm text-gray-400 italic">{t("tasks.noTags")}</span>
						)}
						{task.tags.length > 2 && <span className="text-xs text-gray-500 ml-1">+{task.tags.length - 2}</span>}
					</div>
				);

			case "recurrence":
				return (
					<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
						{t(`tasks.recurrence${task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}`)}
					</span>
				);

			case "startDate":
				return <span className="text-sm text-gray-600">{task.startDate ? formatDate(task.startDate) : <span className="text-gray-400 italic">{t("tasks.noStartDate")}</span>}</span>;

			case "dueDate":
				return task.dueDate ? (
					<span className={`text-sm ${isTaskOverdue(task) ? "text-red-600 font-semibold" : "text-gray-600"}`}>{formatDate(task.dueDate)}</span>
				) : (
					<span className="text-sm text-gray-400 italic">{t("tasks.noDueDate")}</span>
				);

			case "notes":
				return (
					<div className="max-w-xs">
						{task.notes ? <p className="text-sm text-gray-600 line-clamp-2">{task.notes}</p> : <span className="text-sm text-gray-400 italic">{t("tasks.noNotes")}</span>}
					</div>
				);

			case "createdAt":
				return <span className="text-sm text-gray-600">{formatDate(task.createdAt)}</span>;

			case "active":
				return (
					<span
						className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
							task.active ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"
						}`}
					>
						{task.active ? t("common.yes") : t("common.no")}
					</span>
				);

			case "actions":
				return (
					<div className="flex items-center space-x-2">
						{onEditTask && (
							<button
								onClick={() => onEditTask(task)}
								className="inline-flex items-center p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
								title={t("tasks.editTask")}
							>
								<PencilIcon className="h-4 w-4" />
							</button>
						)}
						<button
							onClick={() => handleDeleteClick(task)}
							className="inline-flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
							title={t("tasks.deleteTask")}
						>
							<XMarkIcon className="h-4 w-4" />
						</button>
					</div>
				);

			default:
				return null;
		}
	};

	if (tasks.length === 0) {
		return (
			<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 overflow-hidden">
				<div className="text-center py-16">
					<p className="text-gray-500 text-lg">{t("tasks.noTasksMatchingFilters")}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 overflow-hidden">
			{/* Compteur de tâches */}
			<div className="px-4 sm:px-6 py-4 border-b border-gray-200/60 bg-gray-50/50">
				<div className="flex justify-between items-center">
					<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
						{tasks.length} {tasks.length <= 1 ? t("tasks.task") : t("tasks.tasks")}
					</h2>
					<div className="flex items-center space-x-3">
						{tasks.length !== totalTasksCount && (
							<span className="text-sm text-gray-500">
								({totalTasksCount} {t("tasks.total")})
							</span>
						)}
						<button
							onClick={() => setIsConfigModalOpen(true)}
							className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 transition-colors"
							title={t("tasks.configureColumns")}
						>
							<Cog6ToothIcon className="h-4 w-4 mr-1" />
							{t("tasks.configureColumns")}
						</button>
					</div>
				</div>
			</div>

			{/* Vue en cartes pour mobile et tablette */}
			<div className="block lg:hidden">
				<div className="divide-y divide-gray-200/60">
					{tasks.map((task, index) => (
						<div
							key={task.id}
							className={`p-4 sm:p-6 hover:bg-gray-50/50 transition-all duration-200 ${task.status === 7 ? "opacity-75 bg-gray-25" : ""} ${
								index % 2 === 0 ? "bg-white/40" : "bg-gray-50/20"
							}`}
						>
							{/* En-tête de la carte */}
							<div className="flex items-start justify-between mb-3">
								<div className="flex items-start space-x-3 flex-1 min-w-0">
									{/* Titre et description */}
									<div className="flex-1 min-w-0">
										<h3 className={`font-semibold text-sm sm:text-base ${task.status === 7 ? "line-through text-gray-500" : "text-gray-900"}`}>{task.title}</h3>
										{task.description && <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>}
									</div>
								</div>

								{/* Actions */}
								<div className="flex items-center space-x-2 ml-2 shrink-0">
									{onEditTask && (
										<button
											onClick={() => onEditTask(task)}
											className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
											title={t("tasks.editTask")}
										>
											<PencilIcon className="h-4 w-4" />
										</button>
									)}
									<button
										onClick={() => handleDeleteClick(task)}
										className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
										title={t("tasks.deleteTask")}
									>
										<XMarkIcon className="h-4 w-4" />
									</button>
								</div>
							</div>

							{/* Métadonnées */}
							<div className="space-y-2">
								{/* Ligne 1: Priority, Status */}
								<div className="flex flex-wrap gap-2">
									<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
										{t(`tasks.priority${task.priority}`)}
									</span>
									<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
										{t(`tasks.status${task.status}`)}
									</span>
								</div>

								{/* Ligne 2: Category (si présente) */}
								{task.category && (
									<div>
										<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColorClass(getCategoryColor(task.category))}`}>
											{task.category}
										</span>
									</div>
								)}

								{/* Ligne 3: Tags (si présents) */}
								{task.tags.length > 0 && (
									<div className="flex flex-wrap gap-1">
										{task.tags.slice(0, 2).map((tag, tagIndex) => (
											<span key={tagIndex} className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
												{tag}
											</span>
										))}
										{task.tags.length > 2 && <span className="text-xs text-gray-500 px-1">+{task.tags.length - 2}</span>}
									</div>
								)}

								{/* Ligne 4: Recurrence et Active */}
								<div className="flex flex-wrap gap-2">
									<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
										{t(`tasks.recurrence${task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}`)}
									</span>
									<span
										className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
											task.active ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-100 text-gray-800 border-gray-200"
										}`}
										title={t("tasks.active")}
									>
										{t("tasks.active")}: {task.active ? t("common.yes") : t("common.no")}
									</span>
								</div>

								{/* Ligne 5: Dates */}
								<div className="flex flex-wrap gap-4 text-xs sm:text-sm text-gray-600">
									{task.startDate && (
										<div>
											<span className="font-medium">{t("tasks.startDate")}:</span> {formatDate(task.startDate)}
										</div>
									)}
									{task.dueDate && (
										<div>
											<span className="font-medium">{t("tasks.dueDate")}:</span>{" "}
											<span className={isTaskOverdue(task) ? "text-red-600 font-semibold" : ""}>{formatDate(task.dueDate)}</span>
										</div>
									)}
									<div>
										<span className="font-medium">{t("tasks.createdDate")}:</span> {formatDate(task.createdAt)}
									</div>
								</div>

								{/* Ligne 6: Notes (si présentes) */}
								{task.notes && (
									<div>
										<span className="font-medium text-xs sm:text-sm text-gray-600">{t("tasks.notes")}:</span>
										<p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{task.notes}</p>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Vue en tableau pour desktop */}
			<div className="hidden lg:block relative">
				{/* Table unifiée avec colonne actions intégrée */}
				<div className="overflow-x-auto">
					<table className="w-full min-w-max table-fixed">
						<colgroup>
							{visibleColumns
								.filter((col) => col.id !== "actions")
								.map((column) => (
									<col key={column.id} className="w-auto" />
								))}
							{visibleColumns.some((col) => col.id === "actions") && <col className="w-28" />}
						</colgroup>
						<thead className="bg-gray-50/70">
							<tr>
								{visibleColumns
									.filter((col) => col.id !== "actions")
									.map((column) => (
										<th key={column.id} className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
											{t(column.labelKey)}
										</th>
									))}
								{visibleColumns.some((col) => col.id === "actions") && (
									<th className="w-28 px-4 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wide bg-transparent backdrop-blur-sm border-l border-gray-200/40 sticky right-0 z-10">
										<span className="inline-flex items-center justify-center">
											<Cog6ToothIcon className="h-3.5 w-3.5 text-gray-400" />
										</span>
									</th>
								)}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200/60">
							{tasks.map((task, index) => (
								<tr
									key={task.id}
									className={`hover:bg-gray-50/50 transition-all duration-200 ${task.status === 7 ? "opacity-75 bg-gray-25" : ""} ${
										index % 2 === 0 ? "bg-white/40" : "bg-gray-50/20"
									}`}
								>
									{visibleColumns
										.filter((col) => col.id !== "actions")
										.map((column) => (
											<td
												key={column.id}
												className={`px-6 py-4 ${
													column.id === "startDate" || column.id === "dueDate" || column.id === "createdAt"
														? "whitespace-nowrap"
														: column.id === "category" || column.id === "priority" || column.id === "status" || column.id === "recurrence"
														? "whitespace-nowrap"
														: ""
												}`}
											>
												{renderCell(task, column)}
											</td>
										))}
									{visibleColumns.some((col) => col.id === "actions") && (
										<td
											className={`w-28 px-3 py-4 text-center bg-transparent backdrop-blur-md border-l border-gray-200/40 sticky right-0 z-10 shadow-[-8px_0_20px_-8px_rgba(0,0,0,0.15)] transition-all duration-300 group ${
												task.status === 7 ? "opacity-60" : ""
											} ${index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"} hover:bg-white/60`}
										>
											<div className="flex items-center space-x-1 justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-200">
												{onEditTask && (
													<button
														onClick={() => onEditTask(task)}
														className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50/80 rounded-full transition-all duration-200 hover:shadow-sm hover:scale-105"
														title={t("tasks.editTask")}
													>
														<PencilIcon className="h-4 w-4" />
													</button>
												)}
												<button
													onClick={() => handleDeleteClick(task)}
													className="inline-flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-500 hover:bg-red-50/80 rounded-full transition-all duration-200 hover:shadow-sm hover:scale-105"
													title={t("tasks.deleteTask")}
												>
													<XMarkIcon className="h-4 w-4" />
												</button>
											</div>
										</td>
									)}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Modal de configuration des colonnes */}
			<ColumnConfigModal
				isOpen={isConfigModalOpen}
				onClose={() => setIsConfigModalOpen(false)}
				columns={columns}
				onToggleColumn={toggleColumnVisibility}
				onReorderColumns={reorderColumns}
				onResetToDefault={resetToDefault}
			/>

			{/* Popup de confirmation pour la suppression */}
			{showDeleteConfirmation && taskToDelete && (
				<div className="fixed inset-0 z-50 overflow-y-auto">
					<div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
						{/* Overlay */}
						<div className="fixed inset-0 bg-black/50" onClick={cancelDelete} />

						{/* Modal */}
						<div className="relative bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4">
							<div className="flex items-center space-x-3 mb-4">
								<ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
								<h4 className="text-lg font-semibold text-gray-900">{t("common.confirmAction")}</h4>
							</div>
							<p className="text-sm text-gray-600 mb-6">{t("tasks.confirmDeleteTask", { taskTitle: taskToDelete.title })}</p>
							<div className="flex space-x-3 justify-end">
								<button onClick={cancelDelete} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
									{t("common.cancel")}
								</button>
								<button onClick={confirmDelete} className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors">
									{t("common.delete")}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
