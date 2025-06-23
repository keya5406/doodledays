import pandas as pd
from datetime import datetime
from typing import List, Dict, Any

#  sample_data = [
#     {
#         "date": "2025-06-17",
#         "mood": 7,
#         "productivity": 8,
#         "sleep_hours": 6.5,
#         "expenses": [
#             {"label": "food", "amount": 150},
#             {"label": "travel", "amount": 60}
#         ],
#         "tasks_completed": 5
#     },
#     {
#         "date": "2025-06-18",
#         "mood": 6,
#         "productivity": 7,
#         "sleep_hours": 7,
#         "expenses": [
#             {"label": "entertainment", "amount": 100}
#         ],
#         "tasks_completed": 4
#     }
# ]


def preprocess_daily_entries(raw_data: List[Dict[str, Any]]) -> pd.DataFrame:
    processed_rows = []
    
    for entry in raw_data:
        date = datetime.strptime(entry["date"], "%Y-%m-%d").date()
        mood = entry.get("mood", None)
        productivity = entry.get("productivity", None)
        sleep = entry.get("sleep_hours", None)
        tasks = entry.get("tasks_completed", 0)
        
        total_expenses = sum(item["amount"] for item in entry.get("expenses", []))
        
        processed_rows.append({
            "date": date,
            "mood": mood,
            "productivity": productivity,
            "sleep_hours": sleep,
            "tasks_completed": tasks,
            "total_expenses": total_expenses
        })
        
    df = pd.DataFrame(processed_rows)
    df.sort_values(by="date", inplace=True)
        
    return df
    
# if __name__ == "__main__":
#     from pprint import pprint
    
#     df = preprocess_daily_entries(sample_data)
#     pprint(df)