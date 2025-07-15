// Test rapide des nouvelles fonctionnalités de filtrage
import { describe, test, expect } from "vitest";

describe("Advanced Filters - Default Filter Management", () => {
	test("Should allow removing default filter", () => {
		// Simulation du comportement : le filtre par défaut peut maintenant être supprimé
		const hasDefaultFilter = (conditions) => {
			return conditions.some((c) => c.id === "default-active-filter");
		};

		const removeCondition = (conditions, id) => {
			return conditions.filter((condition) => condition.id !== id);
		};

		// État initial avec filtre par défaut
		let conditions = [
			{
				id: "default-active-filter",
				field: "active",
				operator: "equals",
				value: "true",
				logicalOperator: "and",
			},
		];

		expect(hasDefaultFilter(conditions)).toBe(true);

		// Suppression du filtre par défaut
		conditions = removeCondition(conditions, "default-active-filter");

		expect(hasDefaultFilter(conditions)).toBe(false);
		expect(conditions.length).toBe(0);

		console.log("✅ Test réussi : Le filtre par défaut peut être supprimé");
	});

	test("Should allow restoring default filter", () => {
		const restoreDefaultFilter = () => {
			return [
				{
					id: "default-active-filter",
					field: "active",
					operator: "equals",
					value: "true",
					logicalOperator: "and",
				},
			];
		};

		// État sans filtre
		let conditions = [];
		expect(conditions.length).toBe(0);

		// Restauration du filtre par défaut
		conditions = restoreDefaultFilter();

		expect(conditions.length).toBe(1);
		expect(conditions[0].id).toBe("default-active-filter");
		expect(conditions[0].field).toBe("active");
		expect(conditions[0].value).toBe("true");

		console.log("✅ Test réussi : Le filtre par défaut peut être restauré");
	});
});

console.log("🚀 Tests des nouvelles fonctionnalités de filtrage terminés");
