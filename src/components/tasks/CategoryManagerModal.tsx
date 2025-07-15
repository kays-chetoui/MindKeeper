import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { XMarkIcon, PlusIcon, PencilIcon, TrashIcon, Cog6ToothIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useCategories, type CategoryConfig } from "../../hooks/useCategories";

interface CategoryManagerModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const colorOptions = [
	{ value: "gray", label: "Gris", class: "bg-gray-100 text-gray-800 border-gray-200" },
	{ value: "blue", label: "Bleu", class: "bg-blue-100 text-blue-800 border-blue-200" },
	{ value: "green", label: "Vert", class: "bg-green-100 text-green-800 border-green-200" },
	{ value: "purple", label: "Violet", class: "bg-purple-100 text-purple-800 border-purple-200" },
	{ value: "yellow", label: "Jaune", class: "bg-yellow-100 text-yellow-800 border-yellow-200" },
	{ value: "red", label: "Rouge", class: "bg-red-100 text-red-800 border-red-200" },
	{ value: "indigo", label: "Indigo", class: "bg-indigo-100 text-indigo-800 border-indigo-200" },
	{ value: "pink", label: "Rose", class: "bg-pink-100 text-pink-800 border-pink-200" },
];

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ isOpen, onClose }) => {
	const { t } = useTranslation();
	const { categories, addCategory, updateCategory, deleteCategory, resetToDefault } = useCategories();
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryColor, setNewCategoryColor] = useState("gray");
	const [editingCategory, setEditingCategory] = useState<CategoryConfig | null>(null);

	if (!isOpen) return null;

	const handleAddCategory = () => {
		if (newCategoryName.trim()) {
			addCategory(newCategoryName, newCategoryColor);
			setNewCategoryName("");
			setNewCategoryColor("gray");
		}
	};

	const handleUpdateCategory = () => {
		if (editingCategory && editingCategory.name.trim()) {
			updateCategory(editingCategory.id, {
				name: editingCategory.name,
				color: editingCategory.color,
			});
			setEditingCategory(null);
		}
	};

	const getCategoryColorClass = (color: string) => {
		const colorOption = colorOptions.find((opt) => opt.value === color);
		return colorOption?.class || "bg-gray-100 text-gray-800 border-gray-200";
	};

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Overlay */}
				<div className="fixed inset-0 transition-opacity bg-gray-500/75 backdrop-blur-sm" onClick={onClose} />

				{/* Modal */}
				<div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl relative">
					{/* Header */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-2">
							<Cog6ToothIcon className="h-5 w-5 text-gray-600" />
							<h3 className="text-lg font-semibold text-gray-900">{t("tasks.manageCategories")}</h3>
						</div>
						<button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
							<XMarkIcon className="h-5 w-5" />
						</button>
					</div>

					{/* Add New Category */}
					<div className="bg-gray-50 p-4 rounded-lg mb-6">
						<h4 className="text-sm font-medium text-gray-900 mb-3">{t("tasks.addNewCategory")}</h4>
						<div className="flex space-x-3">
							<input
								type="text"
								value={newCategoryName}
								onChange={(e) => setNewCategoryName(e.target.value)}
								placeholder={t("tasks.categoryNamePlaceholder")}
								className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
								onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
							/>
							<select
								value={newCategoryColor}
								onChange={(e) => setNewCategoryColor(e.target.value)}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
							>
								{colorOptions.map((color) => (
									<option key={color.value} value={color.value}>
										{color.label}
									</option>
								))}
							</select>
							<button
								onClick={handleAddCategory}
								disabled={!newCategoryName.trim()}
								className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
							>
								<PlusIcon className="h-4 w-4" />
								<span>{t("common.add")}</span>
							</button>
						</div>
					</div>

					{/* Categories List */}
					<div className="space-y-2 max-h-80 overflow-y-auto">
						{categories.map((category) => (
							<div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
								{editingCategory?.id === category.id ? (
									// Edit mode
									<div className="flex items-center space-x-3 flex-1">
										<input
											type="text"
											value={editingCategory.name}
											onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
											className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
											onKeyPress={(e) => e.key === "Enter" && handleUpdateCategory()}
											autoFocus
										/>
										<select
											value={editingCategory.color}
											onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
											className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
										>
											{colorOptions.map((color) => (
												<option key={color.value} value={color.value}>
													{color.label}
												</option>
											))}
										</select>
										<div className="flex space-x-1">
											<button onClick={handleUpdateCategory} className="p-1 text-green-600 hover:bg-green-100 rounded" title={t("common.save")}>
												✓
											</button>
											<button onClick={() => setEditingCategory(null)} className="p-1 text-gray-600 hover:bg-gray-100 rounded" title={t("common.cancel")}>
												✕
											</button>
										</div>
									</div>
								) : (
									// View mode
									<>
										<div className="flex items-center space-x-3">
											<span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getCategoryColorClass(category.color)}`}>
												{category.name}
											</span>
											{category.isDefault && <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded">{t("tasks.defaultCategory")}</span>}
										</div>
										<div className="flex space-x-1">
											<button
												onClick={() => setEditingCategory(category)}
												className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
												title={t("common.edit")}
											>
												<PencilIcon className="h-4 w-4" />
											</button>
											{!category.isDefault && (
												<button
													onClick={() => deleteCategory(category.id)}
													className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
													title={t("common.delete")}
												>
													<TrashIcon className="h-4 w-4" />
												</button>
											)}
										</div>
									</>
								)}
							</div>
						))}
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
						<button onClick={resetToDefault} className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
							<ArrowUturnLeftIcon className="h-4 w-4" />
							<span>{t("tasks.resetToDefault")}</span>
						</button>

						<button onClick={onClose} className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors">
							{t("common.close")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
