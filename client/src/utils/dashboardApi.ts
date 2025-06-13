import axios from 'axios';
import type { AggregationResponse } from '../../../shared/types/aggregation.types';

export async function fetchDashboardSummary(period: 'weekly' | 'monthly', token: string): Promise<AggregationResponse> {
  const res = await axios.get(`http://localhost:5000/api/aggregation/dashboard?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return res.data.data;
}