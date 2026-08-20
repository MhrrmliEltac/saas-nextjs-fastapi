export enum LeaveTypeEnum {
  YEAR = "İllik",
  ILLNESS = "Xəstəlik",
  FREE = "Ödənişsiz",
}

export enum LeaveStatusEnum {
  PENDING = "Gözləyir",
  SUCCESS = "Təsdiqləndi",
  REJECT = "Rədd edildi",
}

export interface Leave {
  id: string;
  employee: string;
  type: LeaveTypeEnum;
  start_leave: string;
  end_leave: string;
  day: number;
  status: LeaveStatusEnum;
}

export interface RequestLeave {
  employee: string;
  type: LeaveTypeEnum;
  start_leave: Date;
  end_leave: Date;
  status?: LeaveStatusEnum;
}

export interface RequestUpdateLeave {
  employee?: string;
  type?: LeaveTypeEnum;
  start_leave?: Date;
  end_leave?: Date;
  status?: LeaveStatusEnum;
}

export enum RequestLeaveEnum {
  APPROVE = "approve",
  REJECT = "reject",
}

export interface RequestUpdateStatusLeave {
  type: RequestLeaveEnum;
}
