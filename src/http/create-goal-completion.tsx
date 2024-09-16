export async function createGoalCompletion(goalId: string) {
  await fetch("https://in-orbit-backend-7lky.onrender.com/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      goalId,
    }),
  });
}
