from datetime import datetime, timedelta
from app.models.log import Log
from app.schemas.log import ResponseLog, ResponseWeeklyActivity

DEFAULT_LOG_LIMIT = 20
WEEKDAY_LABELS = ["B.e", "Ç.a", "Çər", "C.a", "Cüm", "Şən", "B"]


async def create_log(actor: str, action: str, target: str) -> None:
    await Log.create(actor=actor, action=action, target=target)


def _humanize(created_at: datetime) -> str:
    # created_at's tzinfo mirrors Tortoise's use_tz setting; matching it here
    # avoids naive/aware subtraction errors regardless of that setting.
    now = datetime.now(created_at.tzinfo)
    seconds = int((now - created_at).total_seconds())

    if seconds < 60:
        return "indicə"

    minutes = seconds // 60
    if minutes < 60:
        return f"{minutes} dəq əvvəl"

    hours = minutes // 60
    if hours < 24:
        return f"{hours} saat əvvəl"

    days = hours // 24
    if days == 1:
        return "dünən"
    return f"{days} gün əvvəl"


async def get_logs(limit: int = DEFAULT_LOG_LIMIT) -> list[ResponseLog]:
    logs = await Log.all().order_by("-created_at").limit(limit)
    return [
        ResponseLog(
            id=log.id,
            actor=log.actor,
            action=log.action,
            target=log.target,
            time=_humanize(log.created_at),
        )
        for log in logs
    ]


async def get_weekly_activity() -> list[ResponseWeeklyActivity]:
    logs = await Log.all().only("created_at")

    counts = [0] * 7
    if logs:
        # mirrors _humanize: reuse an existing row's tzinfo to stay consistent
        # with Tortoise's use_tz setting regardless of naive/aware storage.
        now = datetime.now(logs[0].created_at.tzinfo)
        monday = (now - timedelta(days=now.weekday())).replace(
            hour=0, minute=0, second=0, microsecond=0
        )
        for log in logs:
            if log.created_at >= monday:
                counts[log.created_at.weekday()] += 1

    return [
        ResponseWeeklyActivity(day=label, value=count)
        for label, count in zip(WEEKDAY_LABELS, counts)
    ]
