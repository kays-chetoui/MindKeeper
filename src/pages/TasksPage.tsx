import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PlusIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface Task {
	id: string;
	title: string;
	description: string;
	completed: boolean;
	priority: "low" | "medium" | "high";
	createdAt: Date;
	dueDate?: Date;
}

const TasksPage = () => {
	const { t } = useTranslation();
	const [tasks, setTasks] = useState<Task[]>([
		{
			id: "1",
			title: "Finaliser le rapport mensuel",
			description: "Compiler les données et créer le rapport pour la direction",
			completed: false,
			priority: "high",
			createdAt: new Date("2025-01-05"),
			dueDate: new Date("2025-01-15"),
		},
		{
			id: "2",
			title: "Réunion équipe projet",
			description: "Point hebdomadaire avec l'équipe de développement",
			completed: true,
			priority: "medium",
			createdAt: new Date("2025-01-03"),
			dueDate: new Date("2025-01-10"),
		},
		{
			id: "3",
			title: "Révision budget 2025",
			description: "Analyser les dépenses et ajuster le budget prévisionnel",
			completed: false,
			priority: "medium",
			createdAt: new Date("2025-01-02"),
			dueDate: new Date("2025-01-20"),
		},
	]);

	const [isAddingTask, setIsAddingTask] = useState(false);
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
		priority: "medium" as "low" | "medium" | "high",
		dueDate: "",
	});

	const addTask = () => {
		if (newTask.title.trim()) {
			const task: Task = {
				id: Date.now().toString(),
				title: newTask.title.trim(),
				description: newTask.description.trim(),
				completed: false,
				priority: newTask.priority,
				createdAt: new Date(),
				dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
			};
			setTasks([...tasks, task]);
			setNewTask({
				title: "",
				description: "",
				priority: "medium",
				dueDate: "",
			});
			setIsAddingTask(false);
		}
	};

	const toggleTask = (id: string) => {
		setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const getPriorityColor = (priority: string) => {
		switch (priority) {
			case "high":
				return "bg-red-100 text-red-800 border-red-200";
			case "medium":
				return "bg-yellow-100 text-yellow-800 border-yellow-200";
			case "low":
				return "bg-green-100 text-green-800 border-green-200";
			default:
				return "bg-gray-100 text-gray-800 border-gray-200";
		}
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString("fr-FR", {
			day: "numeric",
			month: "short",
			year: "numeric",
		});
	};

	return (
		<div className="min-h-screen">
			{/* Header */}
			<div className="bg-white/60 backdrop-blur-sm border-b border-gray-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="py-6">
						<h1 className="text-3xl font-bold text-gray-900">{t("tasks.title")}</h1>
						<p className="mt-2 text-gray-600">{t("tasks.subtitle")}</p>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
					<div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/60 mb-8">
						<h3 className="text-lg font-semibold text-gray-900 mb-6">{t("tasks.newTask")}</h3>
						<div className="space-y-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.taskTitle")}</label>
								<input
									type="text"
									value={newTask.title}
									onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
									className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
									placeholder={t("tasks.taskTitlePlaceholder")}
								/>
							</div>
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
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">{t("tasks.priority")}</label>
									<select
										value={newTask.priority}
										onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as "low" | "medium" | "high" })}
										className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
									>
										<option value="low">{t("tasks.priorityLow")}</option>
										<option value="medium">{t("tasks.priorityMedium")}</option>
										<option value="high">{t("tasks.priorityHigh")}</option>
									</select>
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
							<div className="flex justify-end space-x-3 pt-4">
								<button
									onClick={() => setIsAddingTask(false)}
									className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
								>
									{t("tasks.cancel")}
								</button>
								<button
									onClick={addTask}
									className="px-6 py-3 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
								>
									{t("tasks.add")}
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Tasks List */}
				<div className="space-y-4">
					{tasks.length === 0 ? (
						<div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/60">
							{" "}
							<p className="text-gray-500">{t("tasks.noTasks")}</p>
						</div>
					) : (
						tasks.map((task) => (
							<div
								key={task.id}
								className={`bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/60 hover:shadow-xl transition-all duration-200 hover:-translate-y-1 ${
									task.completed ? "opacity-75" : ""
								}`}
							>
								<div className="flex items-start justify-between">
									<div className="flex items-start space-x-4 flex-grow">
										<button
											onClick={() => toggleTask(task.id)}
											className={`mt-1 h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 ${
												task.completed ? "bg-indigo-600 border-indigo-600 text-white shadow-lg" : "border-gray-300 hover:border-indigo-600 hover:bg-indigo-50"
											}`}
										>
											{task.completed && <CheckIcon className="h-4 w-4" />}
										</button>
										<div className="flex-grow">
											<h3 className={`text-lg font-semibold ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}>{task.title}</h3>
											{task.description && <p className="mt-2 text-gray-600">{task.description}</p>}
											<div className="mt-3 flex items-center space-x-4 text-sm text-gray-500">
												<span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}>
													{t(`tasks.priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`)}
												</span>
												<span>
													{t("tasks.created")}: {formatDate(task.createdAt)}
												</span>
												{task.dueDate && (
													<span className={`${task.dueDate < new Date() && !task.completed ? "text-red-600 font-medium" : ""}`}>
														{t("tasks.due")}: {formatDate(task.dueDate)}
													</span>
												)}
											</div>
										</div>
									</div>
									<button
										onClick={() => deleteTask(task.id)}
										className="ml-4 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg focus:outline-none transition-all duration-200"
									>
										<XMarkIcon className="h-5 w-5" />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default TasksPage;
