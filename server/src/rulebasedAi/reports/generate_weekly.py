import sys
import os
import json
import pandas as pd

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))

from src.rulebasedAi.preprocessing.process_data import preprocess_daily_entries
from src.rulebasedAi.reports.summary_engine import generate_weekly_summary

if __name__ == "__main__":
    raw = json.loads(sys.stdin.read())
    df = preprocess_daily_entries(raw)
    summary = generate_weekly_summary(df)
    print(summary)
