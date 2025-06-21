import random
import pandas as pd
from typing import Dict, List

# Simulated correlation matrix (normally import from correlation_model.py output)
# Key: tuple(field1, field2) -> value: correlation coefficient
CORRELATIONS = {
    ("sleep_hours", "productivity"): 0.68,
    ("mood", "productivity"): 0.61,
    ("mood", "tasks_completed"): 0.49,
    ("sleep_hours", "mood"): 0.31,
    ("tasks_completed", "productivity"): 0.77
}

CORRELATION_THRESHOLD = 0.6

def tag_weekly_insights(df: pd.DataFrame) -> Dict[str, str]:
    recent = df.tail(7)
    tags = {}

    mood_avg = recent["mood"].mean()
    if mood_avg >= 7:
        tags["mood"] = "high"
    elif mood_avg >= 5:
        tags["mood"] = "neutral"
    else:
        tags["mood"] = "low"

    sleep_std = recent["sleep_hours"].std()
    if sleep_std > 1.5:
        tags["sleep"] = "irregular"
    else:
        tags["sleep"] = "stable"

    prod_avg = recent["productivity"].mean()
    if prod_avg >= 7:
        tags["productivity"] = "high"
    elif prod_avg >= 5:
        tags["productivity"] = "medium"
    else:
        tags["productivity"] = "low"

    task_avg = recent["tasks_completed"].mean()
    tags["tasks"] = "active" if task_avg >= 4 else "inactive"

    return tags

TEMPLATES = {
    "mood": {
        "high": [
            "Mood levels were consistently high — solid emotional control.",
            "You maintained a positive state of mind this week.",
            "Emotionally, things were pretty stable and upbeat."
        ],
        "neutral": [
            "Your mood stayed mostly balanced — no major swings.",
            "Mood trend was neutral — neither too high nor too low.",
            "Steady emotional tone throughout the week."
        ],
        "low": [
            "Mood was on the lower side this week — maybe a reset is due.",
            "Lower mood detected — monitor how it evolves over time.",
            "Slight drop in mood — consider adjusting routine or breaks."
        ]
    },
    "sleep": {
        "irregular": [
            "Your sleep pattern was inconsistent — might affect performance.",
            "Sleep hours varied a lot — try to aim for more consistency.",
            "Unstable sleep trend — this could impact recovery and focus."
        ],
        "stable": [
            "Sleep schedule looks consistent — good baseline for recovery.",
            "Well-managed rest periods throughout the week.",
            "Sleep routine was on point — keep maintaining it."
        ]
    },
    "productivity": {
        "high": [
            "High productivity levels — tasks were completed efficiently.",
            "You maintained strong focus and completed most planned work.",
            "This was a productive week — good task execution."
        ],
        "medium": [
            "Productivity was average — room to scale or maintain.",
            "Task progress was reasonable — neither rushed nor slow.",
            "Mid-level output — consistent but not overloaded."
        ],
        "low": [
            "Low task execution — review time allocation if needed.",
            "Not much progress on productivity — check for blockers.",
            "Slight dip in output — possibly due to energy or focus gaps."
        ]
    },
    "tasks": {
        "active": [
            "Tasks were completed regularly — good engagement.",
            "You stayed on top of your task list — progress is clear.",
            "Task execution was strong — good week for accomplishments."
        ],
        "inactive": [
            "Fewer tasks completed — watch for motivation dips.",
            "Low task activity — possibly a slower-paced week.",
            "Not many tasks logged — might indicate a pause or off week."
        ]
    }
}

def tag_combinations(tags: Dict[str, str]) -> List[str]:
    messages = []

    # Only include messages if the correlation between the fields is strong
    if CORRELATIONS.get(("mood", "productivity"), 0) > CORRELATION_THRESHOLD:
        if tags.get("mood") == "high" and tags.get("productivity") == "low":
            messages.append("Mood was high even when productivity dipped — nice emotional control.")

    if CORRELATIONS.get(("sleep_hours", "productivity"), 0) > CORRELATION_THRESHOLD:
        if tags.get("sleep") == "irregular" and tags.get("productivity") == "low":
            messages.append("Sleep irregularities may have contributed to lower productivity.")

    if CORRELATIONS.get(("mood", "tasks_completed"), 0) > 0.45:
        if tags.get("mood") == "low" and tags.get("tasks") == "active":
            messages.append("Despite low mood, task activity stayed high — strong discipline.")

    return messages

def generate_weekly_summary(df: pd.DataFrame) -> str:
    tags = tag_weekly_insights(df)
    lines: List[str] = []

    # Add correlation-aware insight lines first
    lines.extend(tag_combinations(tags))

    # Then add individual category insights
    for key in ["mood", "productivity", "sleep", "tasks"]:
        tag = tags.get(key)
        if tag and tag in TEMPLATES[key]:
            lines.append(random.choice(TEMPLATES[key][tag]))

    selected = random.sample(lines, k=min(3, len(lines)))
    return " ".join(selected)
