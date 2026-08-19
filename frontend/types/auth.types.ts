export interface PayloadLogin {
  email: string;
  password: string;
}

export interface PayloadRegister {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface Role {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
}
