import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTasks } from "../hooks/useTasks";
import { AdvancedFilters } from "../components/tasks/AdvancedFilters";
import { MultiLevelSort } from "../components/tasks/MultiLevelSort";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskTable } from "../components/tasks/TaskTable";
import type { Task } from "../types/task";

const TasksPage: React.FC = () => {
	const { t } = useTranslation();
	const { tasks, newTask, setNewTask, isAddingTask, setIsAddingTask, addTask, deleteTask, editingTask, updateTask, startEditingTask, cancelEditingTask } = useTasks();
	const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
	const [sortedAndFilteredTasks, setSortedAndFilteredTasks] = useState<Task[]>(tasks);
	const editFormRef = useRef<HTMLDivElement>(null);

	// Gérer les tâches filtrées par les filtres avancés
	const handleFilteredTasksChange = (filtered: Task[]) => {
		setFilteredTasks(filtered);
	};

	// Gérer les tâches triées après filtrage
	const handleSortedTasksChange = (sorted: Task[]) => {
		setSortedAndFilteredTasks(sorted);
	};

	// Mettre à jour filteredTasks quand les tâches changent
	useEffect(() => {
		setFilteredTasks(tasks);
	}, [tasks]);

	// Faire défiler vers le formulaire d'édition quand il s'ouvre
	useEffect(() => {
		if (editingTask && editFormRef.current) {
			editFormRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [editingTask]);

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

				{/* Add Task Form */}
				{isAddingTask && (
					<div className="mb-8">
						<TaskForm newTask={newTask} setNewTask={setNewTask} onSubmit={addTask} onCancel={() => setIsAddingTask(false)} />
					</div>
				)}

				{/* Edit Task Form */}
				{editingTask && (
					<div ref={editFormRef} className="mb-8">
						<TaskForm editingTask={editingTask} onSubmit={(task) => task && updateTask(task)} onCancel={cancelEditingTask} isEditing={true} />
					</div>
				)}

				{/* Filtres Avancés */}
				<AdvancedFilters tasks={tasks} onFilteredTasksChange={handleFilteredTasksChange} />

				{/* Tri Multi-Niveaux */}
				<MultiLevelSort tasks={filteredTasks} onTasksChange={handleSortedTasksChange} />

				{/* Tasks Table */}
				<TaskTable tasks={sortedAndFilteredTasks} totalTasksCount={tasks.length} onDeleteTask={deleteTask} onEditTask={startEditingTask} />
			</div>
		</div>
	);
};

export default TasksPage;
