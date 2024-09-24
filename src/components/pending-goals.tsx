import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending-goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export const PendingGoals = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,
    staleTime: 1000 * 60,
  });

  console.log("Status de Loading:", isLoading); // Verifique se está carregando
  console.log("Status de Erro:", isError); // Verifique se houve erro
  console.log("Dados das Metas Pendentes:", data); // Verifique os dados retornados

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar metas pendentes.</div>;
  if (!data || data.length === 0) return <div>Sem metas pendentes.</div>;

  async function handleCompleteGoal(goalId: string) {
    try {
      await createGoalCompletion(goalId);
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      queryClient.invalidateQueries({ queryKey: ["pending-goals"] }); // Invalida a query para atualizar a lista
    } catch (error) {
      console.error("Erro ao completar a meta:", error);
    }
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => (
        <OutlineButton
          key={goal.id}
          disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
          onClick={() => handleCompleteGoal(goal.id)}
        >
          <Plus className="size-5 text-zinc-600" /> {goal.title}
        </OutlineButton>
      ))}
    </div>
  );
};
