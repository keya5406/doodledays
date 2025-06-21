import pandas as pd
from summary_engine import generate_weekly_summary  
from ml.preprocessing.process_data import preprocess_daily_entries  


# Example usage (commented out for deployment/testing purposes)
# sample_data = [
#     {
#         "date": "2025-06-17",
#         "mood": 4,
#         "productivity": 5,
#         "sleep_hours": 6.0,
#         "expenses": [{"label": "food", "amount": 120}],
#         "tasks_completed": 5
#     },
#     {
#         "date": "2025-06-18",
#         "mood": 3,
#         "productivity": 4,
#         "sleep_hours": 8.0,
#         "expenses": [{"label": "travel", "amount": 80}],
#         "tasks_completed": 4
#     },
#     {
#         "date": "2025-06-19",
#         "mood": 2,
#         "productivity": 4,
#         "sleep_hours": 4.0,
#         "expenses": [{"label": "other", "amount": 50}],
#         "tasks_completed": 5
#     }
# ]


# if __name__ == "__main__":
#     df = preprocess_daily_entries(sample_data)
#     summary = generate_weekly_summary(df)
#     print("📝 Weekly Summary:\n")
#     print(summary)
