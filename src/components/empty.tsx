import logo from "../assets/logo-orbit.svg";
import letsStart from "../assets/lets-start.svg";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { DialogTrigger } from "../components/ui/dialog";
export const EmptyGoals = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />
      <img src={letsStart} alt="in.orbit" />
      <p className="leading-relaxed text-zinc-50 max-w-80 text-center">
        Você ainda não cadastrou nenhuma meta, que tal{" "}
        <span className="underline ">cadastrar um</span> agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-5" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
};
