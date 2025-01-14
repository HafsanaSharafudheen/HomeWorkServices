import React, { useEffect, useState } from 'react';
import { DIY } from '../../types/diy';
import DiyCards from '../../components/DiyCards/DiyCards';
import axios from '../../utilities/axios';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DiyPage: React.FC = () => {
  const [diyList, setDiyList] = useState<DIY[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch all DIYs from the API
    const fetchDIYs = async () => {
      try {
        const response = await axios.get('/all-diys'); 
        setDiyList(response.data); 
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
    <>
    <Header/>
    <div className="container my-5">
      <h1 className="text-center">DIY Home Fixes Made Easy</h1>
      <p className="text-center">First Time Repairing? Learn to fix just about anything. You got this!</p>

      <div className="row">
        {diyList &&
          diyList.map((diy) => (
            <div className="col-md-4" key={diy._id}>
              <DiyCards diy={diy} />
            </div>
          ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DiyPage;
