import { useTranslation } from "react-i18next";

const HomePage = () => {
	const { t } = useTranslation();

	return (
		<div className="relative isolate px-6 lg:px-8">
			<div aria-hidden="true" className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-indigo-200 to-purple-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
				/>
			</div>
			<div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-24">
				<div className="hidden sm:mb-8 sm:flex sm:justify-center">
					<div className="relative rounded-full px-4 py-2 text-sm text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20 bg-white/60 backdrop-blur-sm transition-all duration-200">
						{t("hero.announcement")}
					</div>
				</div>
				<div className="text-center">
					<h1 className="text-5xl font-bold tracking-tight text-balance text-gray-900 sm:text-7xl drop-shadow-sm">{t("hero.title")}</h1>
					<p className="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">{t("hero.subtitle")}</p>
					<div className="mt-10 flex items-center justify-center gap-x-6">
						<a
							href="/tasks"
							className="rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
						>
							{t("hero.getStarted")}
						</a>
						<a href="#" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-white/50 transition-all duration-200">
							{t("hero.seeHowItWorks")}{" "}
							<span aria-hidden="true" className="ml-1">
								→
							</span>
						</a>
					</div>
				</div>
			</div>
			<div aria-hidden="true" className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
				<div
					style={{
						clipPath:
							"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
					}}
					className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-purple-200 to-blue-200 opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
				/>
			</div>
		</div>
	);
};

export default HomePage;
