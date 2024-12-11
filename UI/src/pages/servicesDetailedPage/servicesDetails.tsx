import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios/axios";
import ProviderCard from "../../components/card/providerCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Provider } from "../../types/provider";
import './serviceDetailedPage.css'
const ServicesDetails: React.FC = () => {
  const location = useLocation();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("");
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
        const response = await axios.get(
          `/providers?serviceCategory=${serviceName}`
        );
        setProviders(response.data.providers);
        setFilteredProviders(response.data.providers);
      } catch (error) {
        setError("Error fetching providers");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [serviceName]);

  const handleSort = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? "" : filter); 
    //Clears the currently selected option when a new filter is clicked.
    setSelectedOption("");
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);

    //Creates a copy of the providers array
    let sortedProviders = [...providers];


    if (selectedFilter === "languages") {
      sortedProviders = providers.filter((provider) =>
        provider.languages.includes(option)
      );
    } else if (selectedFilter === "serviceCharges") {
      const [min, max] = option.split("-");
      sortedProviders = providers.filter((provider) => {
        const charge = provider.serviceCharge;

        if (max === "above") return charge > parseInt(min);
        //Only providers with charge > 1000 will be included.
        return charge >= parseInt(min) && charge <= parseInt(max);
      });
    } else if (selectedFilter === "experience") {
      const [min, max] = option.split("-");
      sortedProviders = providers.filter((provider) => {
        const experience = provider.yearsOfExperience;
        if (max === "above") return experience > parseInt(min);
        return experience >= parseInt(min) && experience <= parseInt(max);
      });
    } else if (selectedFilter === "ratings") {
      const [min, max] = option.split("-");
      sortedProviders = providers.filter((provider) => {
        const rating = provider.rating;
        if (!rating) return false;
        return rating >= parseFloat(min) && rating < parseFloat(max);
      });
    }

    setFilteredProviders(sortedProviders);
     // Hide the dropdown after selection
    setSelectedFilter("");
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="HeadingStyle">{serviceName}s</h2>

        <div className="row d-flex justify-content-between">
          <div className="col-lg-2 col-md-3 col-6  position-relative">
            <button
              className="filter-button"
              onClick={() => handleSort("serviceCharges")}
            >
              Service Charges
            </button>
            {selectedFilter === "serviceCharges" && (
              <div className="filter-dropdown show">
                {[
                  "0-200",
                  "200-400",
                  "400-600",
                  "600-800",
                  "800-1000",
                  "1000-above",
                ].map((range) => (
                  <div
                    key={range}
                    className="dropdown-item"
                    onClick={() => handleOptionSelect(range)}
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-2 col-md-3 col-6 position-relative">
            <button
              className="filter-button"
              onClick={() => handleSort("location")}
            >
              Location
            </button>
            {/* Dropdown for Location (Not implemented yet) */}
          </div>
          <div className="col-lg-2 col-md-3 col-6  position-relative">
            <button
              className="filter-button"
              onClick={() => handleSort("languages")}
            >
              Languages
            </button>
            {selectedFilter === "languages" && (
              <div className="filter-dropdown show">
                {["Hindi", "Malayalam", "English", "Tamil"].map((language) => (
                  <div
                    key={language}
                    className="dropdown-item"
                    onClick={() => handleOptionSelect(language)}
                  >
                    {language}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-2 col-md-3 col-6  position-relative">
            <button
              className="filter-button"
              onClick={() => handleSort("experience")}
            >
              Experience
            </button>
            {selectedFilter === "experience" && (
              <div className="filter-dropdown show">
                {["0-1", "1-5", "5-10", "10-above"].map((range) => (
                  <div
                    key={range}
                    className="dropdown-item"
                    onClick={() => handleOptionSelect(range)}
                  >
                    {range} Years
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-lg-2 col-md-3 col-6  position-relative">
            <button
              className="filter-button"
              onClick={() => handleSort("ratings")}
            >
              Ratings
            </button>
            {selectedFilter === "ratings" && (
              <div className="filter-dropdown show">
                {[
                  "4.5-5",
                  "4-4.5",
                  "3-4",
                  "2-3",
                  "1-2",
                ].map((range) => (
                  <div
                    key={range}
                    className="dropdown-item"
                    onClick={() => handleOptionSelect(range)}
                  >
                    {range} Stars
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Providers List */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : filteredProviders.length > 0 ? (
          <div className="row">
            {filteredProviders.map((provider) => (
              <div className="col-md-12 mb-4" key={provider.id}>
                <ProviderCard provider={provider} />
              </div>
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
