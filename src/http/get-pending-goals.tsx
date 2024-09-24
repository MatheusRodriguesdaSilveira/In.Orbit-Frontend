type PendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];

export async function getPendingGoals(): Promise<PendingGoalsResponse> {
  try {
    const response = await fetch(
      "https://in-orbit-backend-7lky.onrender.com/pending-goals"
    );
    if (!response.ok) throw new Error("Failed to fetch pending goals");

    const data = await response.json();
    return data.pendingGoals; // Retorna apenas o array de metas pendentes
  } catch (error) {
    console.error("Error fetching pending goals:", error);
    return []; // Retorna vazio em caso de falha
  }
}
