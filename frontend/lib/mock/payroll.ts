export interface PayrollRecord {
  id: string;
  employee: string;
  position: string;
  baseSalary: number;
  bonus: number;
  status: "paid" | "pending";
}

const payroll: PayrollRecord[] = [
  { id: "1", employee: "Əli Vəliyev", position: "Baş inzibatçı", baseSalary: 3200, bonus: 400, status: "paid" },
  { id: "2", employee: "Nərmin Quliyeva", position: "HR menecer", baseSalary: 2100, bonus: 150, status: "paid" },
  { id: "3", employee: "Tural Hüseynov", position: "Backend developer", baseSalary: 2600, bonus: 300, status: "pending" },
  { id: "4", employee: "Leyla Əhmədova", position: "Marketinq mütəxəssisi", baseSalary: 1800, bonus: 0, status: "pending" },
];

export const payrollStatusLabels: Record<PayrollRecord["status"], string> = {
  paid: "Ödənildi",
  pending: "Gözləyir",
};

export const payrollStatusStyles: Record<PayrollRecord["status"], string> = {
  paid: "bg-emerald-50 text-emerald-600",
  pending: "bg-amber-50 text-amber-600",
};

export async function fetchPayroll(): Promise<PayrollRecord[]> {
  return payroll;
}
