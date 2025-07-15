import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { NewTask } from "../../types/task";
import { useCategories } from "../../hooks/useCategories";
import { CategoryManagerModal } from "./CategoryManagerModal";

interface TaskFormProps {
	newTask: NewTask;
	setNewTask: (task: NewTask) => void;
	onSubmit: () => void;
	onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ newTask, setNewTask, onSubmit, onCancel }) => {
	const { t } = useTranslation();
	const { categories, getCategoryColor } = useCategories();
	const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

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

	return (
		<div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/60 mb-8">
			<h3 className="text-lg font-semibold text-gray-900 mb-6">{t("tasks.newTask")}</h3>
			<div className="space-y-6">
				{/* Titre et Description */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.taskTitle")} *</label>
						<input
							type="text"
							value={newTask.title}
							onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
							placeholder={t("tasks.taskTitlePlaceholder")}
						/>
					</div>
					<div>
						<div className="flex items-center justify-between mb-2">
							<label className="block text-sm font-medium text-gray-700">{t("tasks.category")}</label>
							<button
								type="button"
								onClick={() => setIsCategoryManagerOpen(true)}
								className="inline-flex items-center px-2 py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
								title={t("tasks.manageCategories")}
							>
								<Cog6ToothIcon className="h-3 w-3 mr-1" />
								{t("tasks.manage")}
							</button>
						</div>
						<select
							value={newTask.category}
							onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value="">{t("tasks.selectCategory")}</option>
							{categories.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
						{newTask.category && (
							<div className="mt-2">
								<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColorClass(getCategoryColor(newTask.category))}`}>
									{newTask.category}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.taskDescription")}</label>
					<textarea
						value={newTask.description}
						onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
						rows={3}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						placeholder={t("tasks.taskDescriptionPlaceholder")}
					/>
				</div>

				{/* Priorité, Statut, Récurrence */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.priority")}</label>
						<select
							value={newTask.priority}
							onChange={(e) => setNewTask({ ...newTask, priority: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value="1">{t("tasks.priority1")}</option>
							<option value="2">{t("tasks.priority2")}</option>
							<option value="3">{t("tasks.priority3")}</option>
							<option value="4">{t("tasks.priority4")}</option>
							<option value="5">{t("tasks.priority5")}</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.status")}</label>
						<select
							value={newTask.status}
							onChange={(e) => setNewTask({ ...newTask, status: parseInt(e.target.value) as 1 | 2 | 3 | 7 | 8 })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value="1">{t("tasks.status1")}</option>
							<option value="2">{t("tasks.status2")}</option>
							<option value="3">{t("tasks.status3")}</option>
							<option value="7">{t("tasks.status7")}</option>
							<option value="8">{t("tasks.status8")}</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.recurrence")}</label>
						<select
							value={newTask.recurrence}
							onChange={(e) => setNewTask({ ...newTask, recurrence: e.target.value as "none" | "daily" | "weekly" | "monthly" | "yearly" })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value="none">{t("tasks.recurrenceNone")}</option>
							<option value="daily">{t("tasks.recurrenceDaily")}</option>
							<option value="weekly">{t("tasks.recurrenceWeekly")}</option>
							<option value="monthly">{t("tasks.recurrenceMonthly")}</option>
							<option value="yearly">{t("tasks.recurrenceYearly")}</option>
						</select>
					</div>
				</div>

				{/* Dates */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.startDate")}</label>
						<input
							type="date"
							value={newTask.startDate}
							onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.dueDate")}</label>
						<input
							type="date"
							value={newTask.dueDate}
							onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						/>
					</div>
				</div>

				{/* Tags */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.tags")}</label>
					<input
						type="text"
						value={newTask.tags.join(", ")}
						onChange={(e) =>
							setNewTask({
								...newTask,
								tags: e.target.value
									.split(",")
									.map((tag) => tag.trim())
									.filter((tag) => tag !== ""),
							})
						}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						placeholder="urgent, important, client (séparés par des virgules)"
					/>
				</div>

				{/* Notes */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.notes")}</label>
					<textarea
						value={newTask.notes}
						onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
						rows={3}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						placeholder="Notes additionnelles, liens, références..."
					/>
				</div>

				{/* Boutons d'action */}
				<div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
					<button
						onClick={onCancel}
						className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
					>
						{t("tasks.cancel")}
					</button>
					<button
						onClick={onSubmit}
						disabled={!newTask.title.trim()}
						className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
					>
						{t("tasks.add")}
					</button>
				</div>
			</div>

			{/* Category Manager Modal */}
			<CategoryManagerModal isOpen={isCategoryManagerOpen} onClose={() => setIsCategoryManagerOpen(false)} />
		</div>
	);
};
