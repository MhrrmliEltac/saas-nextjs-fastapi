import { PayrollStatusEnum } from "@/types/payroll.types";

export const payrollStatusLabels: Record<PayrollStatusEnum, string> = {
  [PayrollStatusEnum.PAID]: "Ödənildi",
  [PayrollStatusEnum.PENDING]: "Gözləyir",
};

export const payrollStatusStyles: Record<PayrollStatusEnum, string> = {
  [PayrollStatusEnum.PAID]: "bg-emerald-50 text-emerald-600",
  [PayrollStatusEnum.PENDING]: "bg-amber-50 text-amber-600",
};
