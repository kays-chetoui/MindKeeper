import { useTranslation } from "react-i18next";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const languages = [
	{ code: "en", name: "English" },
	{ code: "fr", name: "Français" },
];

export default function LanguageSelector() {
	const { i18n } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);

	const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

	const changeLanguage = (languageCode: string) => {
		i18n.changeLanguage(languageCode);
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 backdrop-blur-sm"
			>
				<span className="hidden sm:block">{currentLanguage.name}</span>
				<ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 z-20 mt-2 w-48 rounded-xl bg-white/90 backdrop-blur-sm py-2 shadow-xl ring-1 ring-gray-200 border border-gray-100 animate-fade-in-up">
						{languages.map((language) => (
							<button
								key={language.code}
								onClick={() => changeLanguage(language.code)}
								className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 rounded-lg mx-2 ${
									currentLanguage.code === language.code ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-700"
								}`}
							>
								<span>{language.name}</span>
								{currentLanguage.code === language.code && <div className="ml-auto w-2 h-2 bg-indigo-600 rounded-full"></div>}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
