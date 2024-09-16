import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

export const Summary = () => {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  if (!data) {
    return null;
  }

  const firstDayOfWeek = dayjs().startOf("week").format("D ");
  const lastDayOfWeek = dayjs().endOf("week").format("D[ de ]MMMM");

  const completedPercent = Math.round((data.completed * 100) / data.total);

  return (
    <>
      <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <InOrbitIcon />
            <span className="text-lg font-semibold capitalize">
              {firstDayOfWeek}
            </span>
            <span className="text-lg font-semibold">a</span>
            <span className="text-lg font-semibold ">{lastDayOfWeek}</span>
          </div>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="size-5" />
              Cadastrar meta
            </Button>
          </DialogTrigger>
        </div>

        <div className="flex flex-col gap-3">
          <Progress value={8} max={15}>
            <ProgressIndicator style={{ width: `${completedPercent}%` }} />
          </Progress>

          <div className="flex items-center justify-between text-sm text-zinc-400">
            <span>
              Você completou{" "}
              <span className="text-zinc-100">{data?.completed}</span> de{" "}
              <span className="text-zinc-100">{data?.total}</span> metas nessa
              semana.
            </span>
            <span>{completedPercent}%</span>
          </div>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>

          {Object.entries(data.goalsPerDay).map(([date, goals]) => {
            const weekDay = dayjs(date).format("dddd");
            const formatDate = dayjs(date).format("D[ de ]MMMM");

            return (
              <div key={date} className="flex flex-col gap-4">
                <h3 className="font-medium">
                  <span className="capitalize">{weekDay} </span>

                  <span className="text-xs text-zinc-400">{formatDate}</span>
                </h3>
                <ul className="flex flex-col gap-3">
                  {goals.map((goal) => {
                    const hourGoal = dayjs(goal.completedAt).format("HH:mm");
                    return (
                      <li key={goal.id} className="flex items-center gap-2">
                        <CheckCircle2 className="size-5 text-pink-500" />
                        <span className="text-zinc-400 text-sm">
                          Você completou "{" "}
                          <span className="text-zinc-100">{goal.title}</span> "{" "}
                          <span className="text-zinc-100">{hourGoal}h</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
