import { isAxiosError } from "axios";

const DEFAULT_MESSAGE = "Xəta baş verdi. Yenidən cəhd edin.";

export function get_api_error_message(
  error: unknown,
  fallback: string = DEFAULT_MESSAGE,
): string {
  if (!isAxiosError(error)) return fallback;

  const detail = error.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && typeof detail[0]?.msg === "string") {
    return detail[0].msg;
  }
  return fallback;
}
