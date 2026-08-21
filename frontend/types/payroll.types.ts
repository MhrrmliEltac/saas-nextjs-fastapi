export enum PayrollStatusEnum {
  PAID = "paid",
  PENDING = "pending",
}

export interface Payroll {
  id: string;
  employee: string;
  position: string;
  base_salary: number;
  bonus: number;
  status: PayrollStatusEnum;
}

export interface RequestPayroll {
  employee: string;
  position: string;
  base_salary: number;
  bonus?: number;
  status?: PayrollStatusEnum;
}

export interface RequestUpdatePayroll {
  employee?: string;
  position?: string;
  base_salary?: number;
  bonus?: number;
  status?: PayrollStatusEnum;
}
