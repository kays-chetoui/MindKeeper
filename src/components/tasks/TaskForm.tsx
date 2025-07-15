import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import type { NewTask, Task } from "../../types/task";
import { useCategories } from "../../hooks/useCategories";
import { CategoryManagerModal } from "./CategoryManagerModal";

interface TaskFormProps {
	newTask?: NewTask;
	editingTask?: Task;
	setNewTask?: (task: NewTask) => void;
	onSubmit: (task?: Task) => void;
	onCancel: () => void;
	isEditing?: boolean;
}

export const TaskForm: React.FC<TaskFormProps> = ({ newTask, editingTask, setNewTask, onSubmit, onCancel, isEditing = false }) => {
	const { t } = useTranslation();
	const { categories, getCategoryColor } = useCategories();
	const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
	const titleInputRef = useRef<HTMLInputElement>(null);

	// État local pour l'édition
	const [editFormData, setEditFormData] = useState<Task>(() => {
		if (isEditing && editingTask) {
			return { ...editingTask };
		}
		return {} as Task;
	});

	// Focus sur le champ titre quand on passe en mode édition
	useEffect(() => {
		if (isEditing && titleInputRef.current) {
			titleInputRef.current.focus();
		}
	}, [isEditing]);

	const formatDateForInput = (date?: Date) => {
		if (!date) return "";
		return date.toISOString().split("T")[0];
	};

	const handleSubmit = () => {
		if (isEditing) {
			onSubmit(editFormData);
		} else {
			onSubmit();
		}
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

	// Obtenir les valeurs actuelles
	const title = isEditing ? editFormData.title || "" : newTask?.title || "";
	const description = isEditing ? editFormData.description || "" : newTask?.description || "";
	const category = isEditing ? editFormData.category || "" : newTask?.category || "";
	const priority = isEditing ? editFormData.priority || 3 : newTask?.priority || 3;
	const status = isEditing ? editFormData.status || 1 : newTask?.status || 1;
	const recurrence = isEditing ? editFormData.recurrence || "none" : newTask?.recurrence || "none";
	const startDate = isEditing ? formatDateForInput(editFormData.startDate) : newTask?.startDate || "";
	const dueDate = isEditing ? formatDateForInput(editFormData.dueDate) : newTask?.dueDate || "";
	const tags = isEditing ? (editFormData.tags || []).join(", ") : (newTask?.tags || []).join(", ");
	const notes = isEditing ? editFormData.notes || "" : newTask?.notes || "";
	const active = isEditing ? editFormData.active ?? true : newTask?.active ?? true;

	return (
		<div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/60 mb-8">
			<h3 className="text-lg font-semibold text-gray-900 mb-6">{isEditing ? t("tasks.editTask") : t("tasks.newTask")}</h3>
			<div className="space-y-6">
				{/* Titre et Description */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.taskTitle")} *</label>
						<input
							ref={titleInputRef}
							type="text"
							value={title}
							onChange={(e) => {
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, title: e.target.value }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, title: e.target.value });
								}
							}}
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
							value={category}
							onChange={(e) => {
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, category: e.target.value }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, category: e.target.value });
								}
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value="">{t("tasks.selectCategory")}</option>
							{categories.map((cat) => (
								<option key={cat.id} value={cat.name}>
									{cat.name}
								</option>
							))}
						</select>
						{category && (
							<div className="mt-2">
								<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColorClass(getCategoryColor(category))}`}>{category}</span>
							</div>
						)}
					</div>
				</div>

				{/* Description */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.taskDescription")}</label>
					<textarea
						value={description}
						onChange={(e) => {
							if (isEditing) {
								setEditFormData((prev) => ({ ...prev, description: e.target.value }));
							} else if (setNewTask && newTask) {
								setNewTask({ ...newTask, description: e.target.value });
							}
						}}
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
							value={priority}
							onChange={(e) => {
								const newPriority = parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5;
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, priority: newPriority }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, priority: newPriority });
								}
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value={1}>{t("tasks.priority1")}</option>
							<option value={2}>{t("tasks.priority2")}</option>
							<option value={3}>{t("tasks.priority3")}</option>
							<option value={4}>{t("tasks.priority4")}</option>
							<option value={5}>{t("tasks.priority5")}</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.status")}</label>
						<select
							value={status}
							onChange={(e) => {
								const newStatus = parseInt(e.target.value) as 1 | 2 | 3 | 7 | 8;
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, status: newStatus }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, status: newStatus });
								}
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						>
							<option value={1}>{t("tasks.status1")}</option>
							<option value={2}>{t("tasks.status2")}</option>
							<option value={3}>{t("tasks.status3")}</option>
							<option value={7}>{t("tasks.status7")}</option>
							<option value={8}>{t("tasks.status8")}</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.recurrence")}</label>
						<select
							value={recurrence}
							onChange={(e) => {
								const newRecurrence = e.target.value as "none" | "daily" | "weekly" | "monthly" | "yearly";
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, recurrence: newRecurrence }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, recurrence: newRecurrence });
								}
							}}
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

				{/* Champ Actif */}
				<div>
					<label className="flex items-center space-x-3">
						<input
							type="checkbox"
							checked={active}
							onChange={(e) => {
								if (isEditing) {
									setEditFormData((prev) => ({ ...prev, active: e.target.checked }));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, active: e.target.checked });
								}
							}}
							className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
						/>
						<span className="text-sm font-medium text-gray-700">{t("tasks.active")}</span>
					</label>
					<p className="mt-1 text-xs text-gray-500">{t("tasks.activeDescription")}</p>
				</div>

				{/* Dates */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.startDate")}</label>
						<input
							type="date"
							value={startDate}
							onChange={(e) => {
								if (isEditing) {
									setEditFormData((prev) => ({
										...prev,
										startDate: e.target.value ? new Date(e.target.value) : undefined,
									}));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, startDate: e.target.value });
								}
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.dueDate")}</label>
						<input
							type="date"
							value={dueDate}
							onChange={(e) => {
								if (isEditing) {
									setEditFormData((prev) => ({
										...prev,
										dueDate: e.target.value ? new Date(e.target.value) : undefined,
									}));
								} else if (setNewTask && newTask) {
									setNewTask({ ...newTask, dueDate: e.target.value });
								}
							}}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						/>
					</div>
				</div>

				{/* Tags */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.tags")}</label>
					<input
						type="text"
						value={tags}
						onChange={(e) => {
							const newTags = e.target.value
								.split(",")
								.map((tag) => tag.trim())
								.filter((tag) => tag);
							if (isEditing) {
								setEditFormData((prev) => ({ ...prev, tags: newTags }));
							} else if (setNewTask && newTask) {
								setNewTask({ ...newTask, tags: newTags });
							}
						}}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						placeholder={t("tasks.tagsPlaceholder")}
					/>
				</div>

				{/* Notes */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.notes")}</label>
					<textarea
						value={notes}
						onChange={(e) => {
							if (isEditing) {
								setEditFormData((prev) => ({ ...prev, notes: e.target.value }));
							} else if (setNewTask && newTask) {
								setNewTask({ ...newTask, notes: e.target.value });
							}
						}}
						rows={3}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
						placeholder={t("tasks.notesPlaceholder")}
					/>
				</div>

				{/* Boutons d'action */}
				<div className="flex flex-col sm:flex-row gap-3 pt-4">
					<button
						onClick={handleSubmit}
						disabled={!title.trim()}
						className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:shadow-lg"
					>
						{isEditing ? t("tasks.updateTask") : t("tasks.addTask")}
					</button>
					<button
						onClick={onCancel}
						className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
					>
						{t("tasks.cancel")}
					</button>
				</div>
			</div>

			{/* Modal de gestion des catégories */}
			<CategoryManagerModal isOpen={isCategoryManagerOpen} onClose={() => setIsCategoryManagerOpen(false)} />
		</div>
	);
};
