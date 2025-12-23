export type MacroSummary = {
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  caloriesGoal: number;
  proteinGoalG: number;
};

export type Meal = {
  name: string;
  calories: number;
  note?: string;
};

export type FoodSummary = {
  macros: MacroSummary;
  meals: Meal[];
  hydrationMl: number;
  hydrationGoalMl: number;
};

function daySeed() {
  const day = new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < day.length; i++) hash = (hash * 33 + day.charCodeAt(i)) >>> 0;
  return hash >>> 0;
}

export async function getFoodSummary(): Promise<FoodSummary> {
  const seed = daySeed();

  const caloriesGoal = 2200;
  const proteinGoalG = 150;

  const calories = 900 + (seed % 1100);
  const proteinG = 40 + (seed % 120);
  const carbsG = 80 + (seed % 220);
  const fatG = 25 + (seed % 70);

  const hydrationGoalMl = 2500;
  const hydrationMl = 600 + (seed % 1700);

  const meals: Meal[] = [
    { name: "Breakfast", calories: 350 + (seed % 250), note: "High-protein start" },
    { name: "Lunch", calories: 450 + (seed % 350), note: "Balanced plate" },
    { name: "Snack", calories: 180 + (seed % 180), note: "Fruit + nuts" }
  ];

  return {
    macros: {
      calories,
      proteinG,
      carbsG,
      fatG,
      caloriesGoal,
      proteinGoalG
    },
    meals,
    hydrationMl,
    hydrationGoalMl
  };
}

