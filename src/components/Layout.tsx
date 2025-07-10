import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import LanguageSelector from "./LanguageSelector";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
	const { t } = useTranslation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const location = useLocation();

	const navigation = [
		{ name: t("navigation.tasks"), href: "/tasks" },
		{ name: t("navigation.budget"), href: "/budget" },
		{ name: t("navigation.profile"), href: "/profile" },
		{ name: t("navigation.company"), href: "/company" },
	];

	const isActive = (href: string) => {
		return location.pathname === href;
	};

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
			<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100 shadow-sm">
				<nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
					<div className="flex lg:flex-1">
						<Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
							<img alt="" src="/faucon-color-96.png" className="h-12 w-14 drop-shadow-sm" />
							<span className="font-bold text-xl text-gray-900 hidden sm:block">{t("brand.name")}</span>
							<span className="sr-only">{t("brand.name")}</span>
						</Link>
					</div>
					<div className="flex lg:hidden">
						<button
							type="button"
							onClick={() => setMobileMenuOpen(true)}
							className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
						>
							<span className="sr-only">{t("accessibility.openMainMenu")}</span>
							<Bars3Icon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="hidden lg:flex lg:gap-x-8">
						{navigation.map((item) => (
							<Link
								key={item.name}
								to={item.href}
								className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
									isActive(item.href) ? "text-indigo-600 bg-indigo-50 shadow-sm" : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
								}`}
							>
								{item.name}
							</Link>
						))}
					</div>
					<div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
						<LanguageSelector />
						<a href="#" className="text-sm font-semibold text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
							{t("navigation.login")}{" "}
							<span aria-hidden="true" className="ml-1">
								&rarr;
							</span>
						</a>
					</div>
				</nav>
				<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
					<div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" />
					<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-200 sm:shadow-xl">
						<div className="flex items-center justify-between pb-4 border-b border-gray-100">
							<Link to="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
								<img alt="" src="/faucon-color-96.png" className="h-10 w-12" />
								<span className="font-bold text-lg text-gray-900">{t("brand.name")}</span>
								<span className="sr-only">{t("brand.name")}</span>
							</Link>
							<button type="button" onClick={() => setMobileMenuOpen(false)} className="-m-2.5 rounded-lg p-2.5 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
								<span className="sr-only">{t("accessibility.closeMenu")}</span>
								<XMarkIcon aria-hidden="true" className="size-6" />
							</button>
						</div>
						<div className="mt-6 flow-root">
							<div className="-my-6 divide-y divide-gray-100">
								<div className="space-y-2 py-6">
									{navigation.map((item) => (
										<Link
											key={item.name}
											to={item.href}
											onClick={() => setMobileMenuOpen(false)}
											className={`-mx-3 block rounded-lg px-4 py-3 text-base font-semibold transition-all duration-200 ${
												isActive(item.href) ? "text-indigo-600 bg-indigo-50" : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
											}`}
										>
											{item.name}
										</Link>
									))}
								</div>
								<div className="py-6">
									<a
										href="#"
										className="-mx-3 block rounded-lg px-4 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors duration-200"
									>
										{t("navigation.login")}
									</a>
								</div>
							</div>
						</div>
					</DialogPanel>
				</Dialog>
			</header>

			<main>{children}</main>
		</div>
	);
};

export default Layout;
