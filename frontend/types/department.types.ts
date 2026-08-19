export interface DepartmentList {
  id: string;
  name: string;
  head: string;
}

export interface RequestDepartment {
  name: string;
  head: string;
}

export interface RequestUpdateDepartment {
  name?: string;
  head?: string;
}
