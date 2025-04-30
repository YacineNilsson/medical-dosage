import { useState } from 'react';

export function useDoseCalculation() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function calculateDose(requestData) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/doseCalc/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) throw new Error('Failed to calculate dose');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { result, loading, error, calculateDose };
}
