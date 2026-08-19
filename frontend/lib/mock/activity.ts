export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
}

const activity: ActivityItem[] = [
  { id: "1", actor: "Nərmin Quliyeva", action: "yeni işçi əlavə etdi", target: "Leyla Əhmədova", time: "10 dəq əvvəl" },
  { id: "2", actor: "Rəşad Məmmədov", action: "məzuniyyət tələbi göndərdi", target: "6 gün, İllik", time: "2 saat əvvəl" },
  { id: "3", actor: "Nərmin Quliyeva", action: "namizədə təklif göndərdi", target: "Məzmun meneceri", time: "dünən" },
  { id: "4", actor: "Əli Vəliyev", action: "maaş cədvəlini təsdiqlədi", target: "Avqust 2026", time: "3 gün əvvəl" },
];

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  return activity;
}
