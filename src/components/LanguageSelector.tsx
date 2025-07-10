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
				className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset transition-colors duration-150"
			>
				<span className="hidden sm:block">{currentLanguage.name}</span>
				<ChevronDownIcon className="h-4 w-4" />
			</button>

			{isOpen && (
				<>
					<div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
					<div className="absolute right-0 z-20 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-900/10 border border-gray-200">
						{languages.map((language) => (
							<button
								key={language.code}
								onClick={() => changeLanguage(language.code)}
								className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${
									currentLanguage.code === language.code ? "bg-gray-50 text-indigo-600" : "text-gray-700"
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
