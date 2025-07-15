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

	const {
		advancedFilter,
		filterFieldConfigs,
		operatorLabels,
		logicalOperatorLabels,
		addCondition,
		updateCondition,
		removeCondition,
		clearAllConditions,
		restoreDefaultFilter,
		getFieldConfig,
		filteredTasks,
	} = useAdvancedFilters(tasks);

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

		const inputClassName = "w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm";

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
							className={inputClassName}
							size={Math.min(fieldConfig.options?.length || 3, 4)}
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
							className={inputClassName}
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
						className={inputClassName}
					/>
				);

			case "number":
				return (
					<input
						type="number"
						value={condition.value?.toString() || ""}
						onChange={(e) => updateCondition(condition.id, { value: e.target.value ? Number(e.target.value) : "" })}
						className={inputClassName}
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
						className={inputClassName}
						placeholder={t("tasks.enterTagsCommaSeparated")}
					/>
				);

			default: // text
				return (
					<input
						type="text"
						value={condition.value?.toString() || ""}
						onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
						className={inputClassName}
						placeholder={t("tasks.enterValue")}
					/>
				);
		}
	};

	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
			{/* Header */}
			<div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
				<div className="flex items-center space-x-3">
					<div className="flex items-center space-x-2">
						<FunnelIcon className="h-5 w-5 text-gray-500" />
						<h3 className="text-sm font-medium text-gray-900">{t("tasks.advancedFilters")}</h3>
					</div>
					{advancedFilter.conditions.length > 0 && (
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{advancedFilter.conditions.length}</span>
					)}
				</div>
				<button onClick={() => setIsExpanded(!isExpanded)} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
					{isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
				</button>
			</div>

			{/* Content */}
			{isExpanded && (
				<div className="p-4">
					{/* Conditions */}
					{advancedFilter.conditions.map((condition, index) => (
						<div key={condition.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 mb-2">
							<div className="flex-1 space-y-3">
								{/* Logical Operator (for conditions after the first) */}
								{index > 0 && (
									<div className="flex items-center space-x-2">
										<span className="text-xs text-gray-500">{t("tasks.operator")}:</span>
										<select
											value={advancedFilter.conditions[index - 1].logicalOperator || "and"}
											onChange={(e) =>
												updateCondition(advancedFilter.conditions[index - 1].id, {
													logicalOperator: e.target.value as LogicalOperator,
												})
											}
											className="px-2 py-1 border border-gray-300 rounded text-xs font-medium"
										>
											<option value="and">{logicalOperatorLabels.and}</option>
											<option value="or">{logicalOperatorLabels.or}</option>
										</select>
									</div>
								)}

								<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
											className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
											className="w-full px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
								</div>
							</div>

							{/* Remove Button */}
							<div className="ml-3">
								<button onClick={() => removeCondition(condition.id)} className="p-1 text-red-400 hover:text-red-600" title={t("tasks.removeCondition")}>
									<TrashIcon className="h-4 w-4" />
								</button>
							</div>
						</div>
					))}

					{/* Empty State */}
					{advancedFilter.conditions.length === 0 && (
						<div className="text-center py-6 text-gray-500">
							<FunnelIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
							<p className="text-sm">{t("tasks.noConditionsYet")}</p>
							<p className="text-xs">{t("tasks.addConditionToStart")}</p>
						</div>
					)}

					{/* Action Buttons */}
					<div className="flex items-center justify-between pt-3 border-t border-gray-200 mt-4">
						<div className="flex items-center space-x-3">
							<button onClick={addCondition} className="inline-flex items-center px-3 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">
								<PlusIcon className="h-4 w-4 mr-1" />
								{t("tasks.addCondition")}
							</button>

							{!advancedFilter.conditions.some((c) => c.id === "default-active-filter") && (
								<button onClick={restoreDefaultFilter} className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-700">
									<PlusIcon className="h-4 w-4 mr-1" />
									{t("tasks.restoreDefaultFilter")}
								</button>
							)}
						</div>

						{advancedFilter.conditions.length > 0 && (
							<button onClick={clearAllConditions} className="inline-flex items-center text-sm text-red-600 hover:text-red-700">
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
