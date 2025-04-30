
import { useState, useEffect } from 'react';

export function useMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/medicines')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch medicines');
        return res.json();
      })
      .then(data => setMedicines(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { medicines, loading, error };
}
