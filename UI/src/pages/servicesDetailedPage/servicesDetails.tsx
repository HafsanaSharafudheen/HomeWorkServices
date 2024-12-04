import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "../../axios/axios";
import ProviderCard from "../../components/card/providerCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Provider } from '../../types/provider'



const ServicesDetails: React.FC = () => {
  const location = useLocation();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const serviceName = location.state?.serviceName;

  useEffect(() => {
    if (!serviceName) {
      setError("Service name is missing.");
      return;
    }
    const fetchProviders = async () => {
      setLoading(true);
      setError("");

      try {

        const response = await axios.get(`/providers?serviceCategory=${serviceName}`);
        setProviders(response.data.providers);
      } catch (error) {
        setError("Error fetching providers")

      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceName]);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="HeadingStyle">{serviceName}s</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : providers.length > 0 ? (
          <div className="row">
            {providers.map((provider) => (
              <ProviderCard provider={provider} />
            ))}
          </div>
        ) : (
          <p>No providers found for this service.</p>
        )}
      </div>
      <Footer />
    </>

  );
};

export default ServicesDetails;
