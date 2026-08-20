import { Role } from "@/types/auth.types";

export function check_role(role: Role["name"]): boolean {
  if (role === "ADMIN" || role === "HR") return true;
  return false;
}
