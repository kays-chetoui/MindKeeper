import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon, TrashIcon, FunnelIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { FilterCondition, FilterField, FilterOperator, LogicalOperator } from "../../types/advancedFilter";
import { useAdvancedFilters } from "../../hooks/useAdvancedFilters";
import type { Task } from "../../types/task";

interface AdvancedFiltersProps {
	tasks: Task[];
	onFilteredTasksChange: (filteredTasks: Task[]) => void;
}

export const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ tasks, onFilteredTasksChange }) => {
	const { t } = useTranslation();
	const [isExpanded, setIsExpanded] = useState(true); // Ouvert par défaut

	const { advancedFilter, filterFieldConfigs, operatorLabels, logicalOperatorLabels, addCondition, updateCondition, removeCondition, clearAllConditions, getFieldConfig, filteredTasks } =
		useAdvancedFilters(tasks);

	// Mettre à jour les tâches filtrées quand elles changent
	React.useEffect(() => {
		onFilteredTasksChange(filteredTasks);
	}, [filteredTasks, onFilteredTasksChange]);

	const renderValueInput = (condition: FilterCondition) => {
		const fieldConfig = getFieldConfig(condition.field);

		// Pour les opérateurs qui ne nécessitent pas de valeur
		if (condition.operator === "isEmpty" || condition.operator === "isNotEmpty") {
			return null;
		}

		if (!fieldConfig) return null;

		switch (fieldConfig.type) {
			case "select":
				if (condition.operator === "isOneOf" || condition.operator === "isNotOneOf") {
					// Multi-select pour les opérateurs "isOneOf" et "isNotOneOf"
					return (
						<select
							multiple
							value={Array.isArray(condition.value) ? condition.value.map(String) : []}
							onChange={(e) => {
								const values = Array.from(e.target.selectedOptions).map((option) => option.value);
								updateCondition(condition.id, { value: values });
							}}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
							size={Math.min(fieldConfig.options?.length || 3, 5)}
						>
							{fieldConfig.options?.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					);
				} else {
					// Single select pour les autres opérateurs
					return (
						<select
							value={condition.value?.toString() || ""}
							onChange={(e) => {
								const value = isNaN(Number(e.target.value)) ? e.target.value : Number(e.target.value);
								updateCondition(condition.id, { value });
							}}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
						>
							<option value="">{t("tasks.selectValue")}</option>
							{fieldConfig.options?.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					);
				}

			case "date":
				return (
					<input
						type="date"
						value={condition.value instanceof Date ? condition.value.toISOString().split("T")[0] : condition.value?.toString() || ""}
						onChange={(e) => updateCondition(condition.id, { value: e.target.value ? new Date(e.target.value) : "" })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
					/>
				);

			case "number":
				return (
					<input
						type="number"
						value={condition.value?.toString() || ""}
						onChange={(e) => updateCondition(condition.id, { value: e.target.value ? Number(e.target.value) : "" })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
						placeholder={t("tasks.enterValue")}
					/>
				);

			case "multiSelect":
				return (
					<input
						type="text"
						value={Array.isArray(condition.value) ? condition.value.join(", ") : condition.value?.toString() || ""}
						onChange={(e) => {
							const values = e.target.value
								.split(",")
								.map((v) => v.trim())
								.filter((v) => v !== "");
							updateCondition(condition.id, { value: values });
						}}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
						placeholder={t("tasks.enterTagsCommaSeparated")}
					/>
				);

			default: // text
				return (
					<input
						type="text"
						value={condition.value?.toString() || ""}
						onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
						placeholder={t("tasks.enterValue")}
					/>
				);
		}
	};

	return (
		<div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/60 mb-8">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b border-gray-200/60">
				<div className="flex items-center space-x-2">
					<FunnelIcon className="h-5 w-5 text-gray-500" />
					<h3 className="text-lg font-medium text-gray-900">{t("tasks.advancedFilters")}</h3>
				</div>
				<div className="flex items-center space-x-2">
					{advancedFilter.conditions.length > 0 && (
						<span className="text-sm text-gray-500">
							{advancedFilter.conditions.length} condition{advancedFilter.conditions.length > 1 ? "s" : ""}
						</span>
					)}
					<button onClick={() => setIsExpanded(!isExpanded)} className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
						{isExpanded ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
					</button>
				</div>
			</div>

			{/* Content */}
			{isExpanded && (
				<div className="p-4 space-y-4">
					{/* Conditions */}
					{advancedFilter.conditions.map((condition, index) => (
						<div key={condition.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
							{/* Logical Operator (for conditions after the first) */}
							{index > 0 && (
								<div className="mb-3">
									<select
										value={advancedFilter.conditions[index - 1].logicalOperator || "and"}
										onChange={(e) =>
											updateCondition(advancedFilter.conditions[index - 1].id, {
												logicalOperator: e.target.value as LogicalOperator,
											})
										}
										className="px-3 py-1 border border-gray-300 rounded bg-white text-sm font-medium"
									>
										<option value="and">{logicalOperatorLabels.and}</option>
										<option value="or">{logicalOperatorLabels.or}</option>
									</select>
								</div>
							)}

							<div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-start">
								{/* Field */}
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">{t("tasks.field")}</label>
									<select
										value={condition.field}
										onChange={(e) => {
											const newField = e.target.value as FilterField;
											const fieldConfig = getFieldConfig(newField);
											const defaultOperator = fieldConfig?.supportedOperators[0] || "equals";
											updateCondition(condition.id, {
												field: newField,
												operator: defaultOperator,
												value: "",
											});
										}}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
									>
										{filterFieldConfigs.map((config) => (
											<option key={config.field} value={config.field}>
												{config.label}
											</option>
										))}
									</select>
								</div>

								{/* Operator */}
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">{t("tasks.operator")}</label>
									<select
										value={condition.operator}
										onChange={(e) =>
											updateCondition(condition.id, {
												operator: e.target.value as FilterOperator,
												value: "",
											})
										}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
									>
										{getFieldConfig(condition.field)?.supportedOperators.map((operator) => (
											<option key={operator} value={operator}>
												{operatorLabels[operator]}
											</option>
										))}
									</select>
								</div>

								{/* Value */}
								<div>
									<label className="block text-xs font-medium text-gray-700 mb-1">{t("tasks.value")}</label>
									{renderValueInput(condition)}
								</div>

								{/* Remove Button */}
								<div className="flex items-end">
									<button
										onClick={() => removeCondition(condition.id)}
										className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
										title={t("tasks.removeCondition")}
									>
										<TrashIcon className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					))}

					{/* Empty State */}
					{advancedFilter.conditions.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<FunnelIcon className="h-12 w-12 mx-auto mb-3 text-gray-300" />
							<p className="text-sm">{t("tasks.noConditionsYet")}</p>
							<p className="text-xs mt-1">{t("tasks.addConditionToStart")}</p>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex items-center justify-between pt-4 border-t border-gray-200">
						<button
							onClick={addCondition}
							className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
						>
							<PlusIcon className="h-4 w-4 mr-1" />
							{t("tasks.addCondition")}
						</button>

						{advancedFilter.conditions.length > 0 && (
							<button
								onClick={clearAllConditions}
								className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
							>
								<XMarkIcon className="h-4 w-4 mr-1" />
								{t("tasks.clearAllConditions")}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
