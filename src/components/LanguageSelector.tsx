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
				className="px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center gap-2"
			>
				<span className="hidden sm:block">{currentLanguage.name}</span>
				<ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 z-20 mt-2 w-48 rounded-lg bg-white shadow-xl ring-1 ring-gray-200 border border-gray-100 animate-fade-in-up overflow-hidden">
						{languages.map((language) => (
							<button
								key={language.code}
								onClick={() => changeLanguage(language.code)}
								className={`flex w-full items-center px-4 py-3 text-sm font-semibold transition-all duration-200 hover:bg-gray-50 hover:text-indigo-600 focus:outline-none focus:bg-gray-50 ${
									currentLanguage.code === language.code ? "bg-indigo-50 text-indigo-600" : "text-gray-700"
								}`}
							>
								<span>{language.name}</span>
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
