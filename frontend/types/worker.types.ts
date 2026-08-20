// export interface Worker [
//     id:string
// fullnamestring
// namestring
// surnamestring
// emailstringemail
// phone_numberstring
// departmentstring
// started_workstringdate
// statusCollapse allstring
// EnumCollapse allarray
// #0"aktiv"
// #1"məzuniyyətdə"
// #2"deaktiv"
// ]

export enum StatusEnum {
  ACTIVE = "aktiv",
  ON_LEAVE = "məzuniyyətdə",
  INACTIVE = "deaktiv",
}

export interface Worker {
  id: string;
  fullname: string;
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  department: string;
  started_work: string;
  status: StatusEnum;
}

export interface RequestWorker {
  name: string;
  surname: string;
  email: string;
  phone_number: string;
  department: string;
  started_work: Date;
  status: StatusEnum;
}
