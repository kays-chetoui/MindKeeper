import React from "react";
import { useTranslation } from "react-i18next";
import { FunnelIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import type { FilterStatus, FilterPriority, SortBy, SortOrder } from "../../types/task";
import { getUniqueCategories } from "../../utils/taskUtils";
import type { Task } from "../../types/task";

interface TaskFiltersProps {
	tasks: Task[];
	filterStatus: FilterStatus;
	setFilterStatus: (status: FilterStatus) => void;
	filterPriority: FilterPriority;
	setFilterPriority: (priority: FilterPriority) => void;
	filterCategory: string;
	setFilterCategory: (category: string) => void;
	sortBy: SortBy;
	setSortBy: (sortBy: SortBy) => void;
	sortOrder: SortOrder;
	setSortOrder: (sortOrder: SortOrder) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
	tasks,
	filterStatus,
	setFilterStatus,
	filterPriority,
	setFilterPriority,
	filterCategory,
	setFilterCategory,
	sortBy,
	setSortBy,
	sortOrder,
	setSortOrder,
}) => {
	const { t } = useTranslation();
	const uniqueCategories = getUniqueCategories(tasks);

	return (
		<div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/60 mb-8">
			<div className="flex items-center space-x-2 mb-4">
				<FunnelIcon className="h-5 w-5 text-gray-500" />
				<h3 className="text-lg font-medium text-gray-900">{t("tasks.filters")}</h3>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
				{/* Filtre par statut */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.status")}</label>
					<div className="relative">
						<select
							value={filterStatus}
							onChange={(e) => setFilterStatus(e.target.value === "all" ? "all" : (parseInt(e.target.value) as FilterStatus))}
							className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
						>
							<option value="all">{t("tasks.allTasks")}</option>
							<option value="1">{t("tasks.status1")}</option>
							<option value="2">{t("tasks.status2")}</option>
							<option value="3">{t("tasks.status3")}</option>
							<option value="7">{t("tasks.status7")}</option>
							<option value="8">{t("tasks.status8")}</option>
						</select>
						<ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
					</div>
				</div>

				{/* Filtre par priorité */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.priority")}</label>
					<div className="relative">
						<select
							value={filterPriority}
							onChange={(e) => setFilterPriority(e.target.value === "all" ? "all" : (parseInt(e.target.value) as FilterPriority))}
							className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
						>
							<option value="all">{t("tasks.allPriorities")}</option>
							<option value="5">{t("tasks.priority5")}</option>
							<option value="4">{t("tasks.priority4")}</option>
							<option value="3">{t("tasks.priority3")}</option>
							<option value="2">{t("tasks.priority2")}</option>
							<option value="1">{t("tasks.priority1")}</option>
						</select>
						<ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
					</div>
				</div>

				{/* Filtre par catégorie */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.category")}</label>
					<div className="relative">
						<select
							value={filterCategory}
							onChange={(e) => setFilterCategory(e.target.value)}
							className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
						>
							<option value="all">{t("tasks.allCategories")}</option>
							{uniqueCategories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
					</div>
				</div>

				{/* Tri par */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.sortBy")}</label>
					<div className="relative">
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as SortBy)}
							className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
						>
							<option value="dueDate">{t("tasks.dueDate")}</option>
							<option value="priority">{t("tasks.priority")}</option>
							<option value="status">{t("tasks.status")}</option>
							<option value="createdAt">{t("tasks.createdDate")}</option>
							<option value="title">{t("tasks.title")}</option>
						</select>
						<ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
					</div>
				</div>

				{/* Ordre de tri */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.sortOrder")}</label>
					<div className="relative">
						<select
							value={sortOrder}
							onChange={(e) => setSortOrder(e.target.value as SortOrder)}
							className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white appearance-none"
						>
							<option value="asc">{t("tasks.ascending")}</option>
							<option value="desc">{t("tasks.descending")}</option>
						</select>
						<ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-3 pointer-events-none" />
					</div>
				</div>
			</div>

			{/* Résumé des filtres actifs */}
			<div className="mt-4 flex flex-wrap gap-2">
				{filterStatus !== "all" && (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
						{t("tasks.status")}: {t(`tasks.status${filterStatus}`)}
					</span>
				)}
				{filterPriority !== "all" && (
					<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
						{t("tasks.priority")}: {t(`tasks.priority${filterPriority}`)}
					</span>
				)}
				<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
					{t("tasks.sortBy")}: {t(`tasks.${sortBy === "createdAt" ? "createdDate" : sortBy}`)} ({t(`tasks.${sortOrder}ending`)})
				</span>
			</div>
		</div>
	);
};
