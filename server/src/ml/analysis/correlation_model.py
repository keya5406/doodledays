import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# 🔧 Add root folder to sys.path so we can import other modules easily
# import sys
# import os

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../..")))

# from server.src.ml.preprocessing.process_data import preprocess_daily_entries


def compute_correlation_matrix(df: pd.DataFrame, visualize: bool = False) -> pd.DataFrame:
    """
    Computes and optionally visualizes the correlation matrix of the given DataFrame.

    Args:
        df (pd.DataFrame): Preprocessed daily data.
        visualize (bool): If True, displays a heatmap.

    Returns:
        pd.DataFrame: Correlation matrix between numeric features.
    """
    correlation_matrix = df.corr(numeric_only=True)

    if visualize:
        plt.figure(figsize=(8, 6))
        sns.heatmap(correlation_matrix, annot=True, cmap="coolwarm", fmt=".2f")
        plt.title("Correlation Matrix")
        plt.tight_layout()
        plt.show()

    return correlation_matrix


# 🔍 For standalone testing
# if __name__ == "__main__":
#     sample_data = [
#         {
#             "date": "2025-06-17",
#             "mood": 7,
#             "productivity": 8,
#             "sleep_hours": 6.5,
#             "expenses": [
#                 {"label": "food", "amount": 150},
#                 {"label": "travel", "amount": 60}
#             ],
#             "tasks_completed": 5
#         },
#         {
#             "date": "2025-06-18",
#             "mood": 6,
#             "productivity": 7,
#             "sleep_hours": 7,
#             "expenses": [
#                 {"label": "entertainment", "amount": 100}
#             ],
#             "tasks_completed": 4
#         }
#     ]

#     df = preprocess_daily_entries(sample_data)
#     correlation = compute_correlation_matrix(df, visualize=True)
#     print(correlation)
