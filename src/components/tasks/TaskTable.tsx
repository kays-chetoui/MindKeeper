import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
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
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, totalTasksCount, onDeleteTask }) => {
	const { t } = useTranslation();
	const { columns, visibleColumns, toggleColumnVisibility, reorderColumns, resetToDefault } = useTableColumns();
	const { getCategoryColor } = useCategories();
	const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

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

			case "actions":
				return (
					<button
						onClick={() => onDeleteTask(task.id)}
						className="inline-flex items-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
						title={t("tasks.deleteTask")}
					>
						<XMarkIcon className="h-4 w-4" />
					</button>
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
								<button
									onClick={() => onDeleteTask(task.id)}
									className="ml-2 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 shrink-0"
									title={t("tasks.deleteTask")}
								>
									<XMarkIcon className="h-4 w-4" />
								</button>
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

								{/* Ligne 4: Recurrence */}
								<div>
									<span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
										{t(`tasks.recurrence${task.recurrence.charAt(0).toUpperCase() + task.recurrence.slice(1)}`)}
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
			<div className="hidden lg:block">
				<div className="overflow-x-auto">
					<table className="w-full min-w-max">
						<thead className="bg-gray-50/70">
							<tr>
								{visibleColumns.map((column) => (
									<th
										key={column.id}
										className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.id === "actions" ? "text-right w-16" : "min-w-0"}`}
									>
										{t(column.labelKey)}
									</th>
								))}
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
									{visibleColumns.map((column) => (
										<td
											key={column.id}
											className={`px-6 py-4 ${
												column.id === "actions"
													? "text-right"
													: column.id === "startDate" || column.id === "dueDate" || column.id === "createdAt"
													? "whitespace-nowrap"
													: column.id === "category" || column.id === "priority" || column.id === "status" || column.id === "recurrence"
													? "whitespace-nowrap"
													: ""
											}`}
										>
											{renderCell(task, column)}
										</td>
									))}
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
		</div>
	);
};
