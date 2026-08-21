export interface Log {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

export interface WeeklyActivity {
  day: string;
  value: number;
}
