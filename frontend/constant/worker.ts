import { StatusEnum } from "@/types/worker.types";

export const statusLabels: Record<StatusEnum, string> = {
  [StatusEnum.ACTIVE]: "Aktiv",
  [StatusEnum.ON_LEAVE]: "Məzuniyyətdə",
  [StatusEnum.INACTIVE]: "Deaktiv",
};

export const statusStyles: Record<StatusEnum, string> = {
  [StatusEnum.ACTIVE]: "bg-emerald-50 text-emerald-600",
  [StatusEnum.ON_LEAVE]: "bg-amber-50 text-amber-600",
  [StatusEnum.INACTIVE]: "bg-muted text-muted-foreground",
};
