export type WorkoutItem = {
  name: string;
  sets: string;
};

export type TodayWorkout = {
  title: string;
  durationMinutes: number;
  items: WorkoutItem[];
  completed: boolean;
};

export type FitnessSummary = {
  today: TodayWorkout;
  weeklyProgress: number; // 0..1
  steps: number;
  caloriesBurned: number;
};

function daySeed() {
  const day = new Date().toISOString().slice(0, 10);
  let hash = 2166136261;
  for (let i = 0; i < day.length; i++) {
    hash ^= day.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function pick<T>(arr: T[], n: number) {
  return arr[n % arr.length]!;
}

export async function getFitnessSummary(): Promise<FitnessSummary> {
  const seed = daySeed();
  const plans: Omit<TodayWorkout, "completed">[] = [
    {
      title: "Upper body strength",
      durationMinutes: 45,
      items: [
        { name: "Bench press", sets: "4×6" },
        { name: "Incline DB press", sets: "3×10" },
        { name: "Seated row", sets: "4×8" },
        { name: "Lateral raise", sets: "3×12" }
      ]
    },
    {
      title: "Lower body + core",
      durationMinutes: 50,
      items: [
        { name: "Back squat", sets: "4×5" },
        { name: "RDL", sets: "3×8" },
        { name: "Walking lunges", sets: "3×12/leg" },
        { name: "Plank", sets: "3×45s" }
      ]
    },
    {
      title: "Zone 2 cardio",
      durationMinutes: 35,
      items: [
        { name: "Bike / jog", sets: "35 min steady" },
        { name: "Mobility", sets: "10 min" }
      ]
    }
  ];

  const todayBase = pick(plans, seed);
  const completed = (seed % 7) === 0;

  const steps = 4200 + (seed % 6500);
  const caloriesBurned = 180 + (seed % 520);
  const weeklyProgress = ((seed % 100) / 100) * 0.6 + 0.25;

  return {
    today: { ...todayBase, completed },
    weeklyProgress: Math.max(0, Math.min(1, weeklyProgress)),
    steps,
    caloriesBurned
  };
}

