import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import TasksPage from "./pages/TasksPage";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/tasks" element={<TasksPage />} />
					<Route
						path="/budget"
						element={
							<div className="p-8 pt-20">
								<h1 className="text-2xl font-bold">Budget - Coming Soon</h1>
							</div>
						}
					/>
					<Route
						path="/profile"
						element={
							<div className="p-8 pt-20">
								<h1 className="text-2xl font-bold">Profile - Coming Soon</h1>
							</div>
						}
					/>
					<Route
						path="/company"
						element={
							<div className="p-8 pt-20">
								<h1 className="text-2xl font-bold">Company - Coming Soon</h1>
							</div>
						}
					/>
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
