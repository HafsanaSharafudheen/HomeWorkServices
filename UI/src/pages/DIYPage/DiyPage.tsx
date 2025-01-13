import React, { useEffect, useState } from 'react';
import { DIY } from '../../types/diy';
import DiyCards from '../../components/DiyCards/DiyCards';
import axios from '../../utilities/axios';

const DiyPage: React.FC = () => {
  const [diyList, setDiyList] = useState<DIY[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all DIYs from the API
    const fetchDIYs = async () => {
      try {
        const response = await axios.get('/all-diys'); // Adjusted based on API response
        setDiyList(response.data); // Directly assign the response data since it's an array
        setLoading(false);
      } catch (err: any) {
        console.error(err);
        setError('Failed to fetch DIYs.');
        setLoading(false);
      }
    };

    fetchDIYs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="diy-list">
      {diyList && diyList.map((diy) => (
        <DiyCards key={diy._id} diy={diy} />
      ))}
    </div>
  );
};

export default DiyPage;
