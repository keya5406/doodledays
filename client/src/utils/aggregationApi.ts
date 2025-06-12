import axios from 'axios';

export async function fetchSummary(period: 'weekly' | 'monthly', token: string) {
  const res = await axios.get(`http://localhost:5000/api/aggregation/summary?period=${period}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.data.data;
}
