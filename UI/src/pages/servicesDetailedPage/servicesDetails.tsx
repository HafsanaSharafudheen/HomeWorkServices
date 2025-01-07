import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import Swal from "sweetalert2";
import ProviderCard from "../../components/card/providerCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Provider } from "../../types/provider";
import './serviceDetailedPage.css';

const ServicesDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [providers, setProviders] = useState<Provider[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>(""); // Active filter
  const [selectedOption, setSelectedOption] = useState<string>(""); // Selected filter option
  const serviceName = location.state?.serviceName;

  useEffect(() => {
    const redirectData = JSON.parse(localStorage.getItem("redirectAfterLogin") || "{}");

    if (redirectData?.provider) {
      handleBookingConfirmation(redirectData);
    } else {
      fetchProviders();
    }
  }, [serviceName]);
  
  const handleBookingConfirmation = async (redirectData: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to book ${redirectData.provider.fullName} for ${redirectData.selectedDate} at ${redirectData.selectedTimeSlot}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, book now!",
      cancelButtonText: "No, go back",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post("/booking", {
            providerId: redirectData.provider._id,
            selectedDate: new Date(redirectData.selectedDate).toISOString(),
            selectedTimeSlot: redirectData.selectedTimeSlot,
          });
  
          Swal.fire("Success!", "Your booking has been confirmed.", "success").then(() => {
            navigate('/providers', {
              state: { serviceName: redirectData.provider.serviceCategory },
            });
  
            localStorage.removeItem("redirectAfterLogin");
          });
        } catch (error) {
          Swal.fire(
            "Error!",
            "There was an issue confirming your booking. Please try again later.",
            "error"
          );
        }
      } else {
        localStorage.removeItem("redirectAfterLogin");
        fetchProviders();
      }
    });
  };
  
  const fetchProviders = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `/providers?serviceCategory=${serviceName}`
      );
      console.log(response.data)
      const providersWithRatings = response.data.providers.map((provider) => ({
        ...provider,
        averageRating: provider.averageRating || 0, // Default to 0 if no reviews
      }));
  
      setProviders(providersWithRatings);
      setFilteredProviders(providersWithRatings);
    } catch (error) {
      setError("Error fetching providers");
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (filter: string) => {
    setSelectedFilter(selectedFilter === filter ? "" : filter);
    setSelectedOption("");
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
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
        const averageRating = provider.averageRating || 0; // Use averageRating field
        return averageRating >= parseFloat(min) && averageRating < parseFloat(max);
      });
    }

    setFilteredProviders(sortedProviders);
    setSelectedFilter("");
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="HeadingStyle">{serviceName}s</h2>
        {providers.length > 0 && (
          <div className="row d-flex justify-content-between">
            {/* Sorting and Filters */}
            <div className="col-lg-2 col-md-3 col-6 position-relative">
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
            <div className="col-lg-2 col-md-3 col-6 position-relative">
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
            <div className="col-lg-2 col-md-3 col-6 position-relative">
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
        )}
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
          <div className="no-providers">
            <p>No providers found for this service.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ServicesDetails;
