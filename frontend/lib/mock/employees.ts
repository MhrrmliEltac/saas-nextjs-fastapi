export interface Employee {
  id: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  status: "active" | "leave" | "inactive";
  hireDate: string;
}

const employees: Employee[] = [
  { id: "1", name: "Əli Vəliyev", email: "ali@orbit.az", department: "Mühəndislik", position: "Baş inzibatçı", status: "active", hireDate: "2023-04-11" },
  { id: "2", name: "Nərmin Quliyeva", email: "nermin@orbit.az", department: "İnsan Resursları", position: "HR menecer", status: "active", hireDate: "2023-08-02" },
  { id: "3", name: "Rəşad Məmmədov", email: "resad@orbit.az", department: "Satış", position: "Satış təmsilçisi", status: "leave", hireDate: "2024-01-15" },
  { id: "4", name: "Leyla Əhmədova", email: "leyla@orbit.az", department: "Marketinq", position: "Marketinq mütəxəssisi", status: "active", hireDate: "2024-03-20" },
  { id: "5", name: "Tural Hüseynov", email: "tural@orbit.az", department: "Mühəndislik", position: "Backend developer", status: "active", hireDate: "2024-06-05" },
  { id: "6", name: "Aysel Cəfərova", email: "aysel@orbit.az", department: "Maliyyə", position: "Mühasib", status: "inactive", hireDate: "2022-11-30" },
];

export const statusLabels: Record<Employee["status"], string> = {
  active: "Aktiv",
  leave: "Məzuniyyətdə",
  inactive: "Deaktiv",
};

export const statusStyles: Record<Employee["status"], string> = {
  active: "bg-emerald-50 text-emerald-600",
  leave: "bg-amber-50 text-amber-600",
  inactive: "bg-muted text-muted-foreground",
};

export async function fetchEmployees(): Promise<Employee[]> {
  return [...employees];
}

export function addEmployee(employee: Employee): void {
  employees.unshift(employee);
}
