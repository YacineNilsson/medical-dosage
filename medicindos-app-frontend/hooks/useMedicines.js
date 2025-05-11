import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; 

export function useMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userToken } = useAuth(); // Hämta token från AuthContext

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/medicines', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`, // Skicka med JWT i headern
          },
        });

        if (!response.ok) throw new Error('Failed to fetch medicines');
        const data = await response.json();
        setMedicines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userToken) { // Vänta tills token är tillgänglig innan förfrågan görs
      fetchMedicines();
    }
  }, [userToken]); // Hooken körs om token ändras

  return { medicines, loading, error };
}

