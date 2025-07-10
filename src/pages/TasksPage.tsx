import React from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTasks } from "../hooks/useTasks";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskTable } from "../components/tasks/TaskTable";

const TasksPage: React.FC = () => {
	const { t } = useTranslation();

	const {
		tasks,
		newTask,
		setNewTask,
		isAddingTask,
		setIsAddingTask,
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
		filteredAndSortedTasks,
		addTask,
		toggleTask,
		deleteTask,
	} = useTasks();

	return (
		<div className="min-h-screen">
			{/* Header */}
			<div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
				<div className="w-full px-4 sm:px-6 lg:px-8">
					<div className="py-6">
						<h1 className="text-3xl font-bold text-gray-900">{t("tasks.title")}</h1>
						<p className="mt-2 text-gray-600">{t("tasks.subtitle")}</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="w-full px-4 sm:px-6 lg:px-8 py-6">
				{/* Add Task Button */}
				<div className="mb-8">
					<button
						onClick={() => setIsAddingTask(true)}
						className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
					>
						<PlusIcon className="h-5 w-5 mr-2" />
						{t("tasks.addTask")}
					</button>
				</div>

				{/* Filtres et Tri */}
				<TaskFilters
					tasks={tasks}
					filterStatus={filterStatus}
					setFilterStatus={setFilterStatus}
					filterPriority={filterPriority}
					setFilterPriority={setFilterPriority}
					filterCategory={filterCategory}
					setFilterCategory={setFilterCategory}
					sortBy={sortBy}
					setSortBy={setSortBy}
					sortOrder={sortOrder}
					setSortOrder={setSortOrder}
				/>

				{/* Add Task Form */}
				{isAddingTask && <TaskForm newTask={newTask} setNewTask={setNewTask} onSubmit={addTask} onCancel={() => setIsAddingTask(false)} />}

				{/* Tasks Table */}
				<TaskTable tasks={filteredAndSortedTasks} totalTasksCount={tasks.length} onToggleTask={toggleTask} onDeleteTask={deleteTask} />
			</div>
		</div>
	);
};

export default TasksPage;
