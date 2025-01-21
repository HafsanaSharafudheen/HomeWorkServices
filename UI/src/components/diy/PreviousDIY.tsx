import React, { useState, useEffect } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../Redux/store";
import axios from "../../utilities/axios";
import { DIY } from "../../pages/ServiceProvider/diy/types/diy";
import "./PreviousDiy.css";

const PreviousDIY = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const providerId = user?.id;
  const [diyTips, setDiyTips] = useState<DIY[]>([]);
  const [selectedTip, setSelectedTip] = useState<DIY | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!providerId) return;
    const fetchDIYs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/DiysByProvider`, {
          params: { providerId },
        });
        setDiyTips(response.data.diy || []);
      } catch (error) {
        console.error("Error fetching DIYs:", error);
      }
      setLoading(false);
    };
    fetchDIYs();
  }, [providerId]);

  const handleShowModal = (tip: DIY) => {
    setSelectedTip(tip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTip(null);
  };

  return (
    <div className="mt-5">
      <h4 className="headingStyle">Your Previous Tips</h4>
      {loading ? (
        <p>Loading...</p>
      ) : diyTips.length > 0 ? (
        <div className="row">
          {diyTips.map((tip) => (
            <div key={tip._id} className="col-md-12 mb-4">
              <div className="diyCard">
                <div className="carousel-container">
                  <Carousel controls={false} interval={3000}>
                    {/* Images */}
                    {tip.photos.map((photo, index) => (
                      <Carousel.Item key={`photo-${index}`}>
                        <img
                          className="d-block w-100 carousel-image"
                          src={`${import.meta.env.VITE_API_BASEURL}/${photo}`}
                          alt={`DIY Photo ${index + 1}`}
                        />
                      </Carousel.Item>
                    ))}
                    {/* Videos */}
                    {tip.vedios.map((video, index) => (
                      <Carousel.Item key={`video-${index}`}>
                        <video
                          className="d-block w-100 carousel-image"
                          controls
                          autoPlay
                          muted
                          loop
                        >
                          <source
                            src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </div>
                <div className="card-body ml-5">
                  <h5 className="titleStyle">{tip.ditTitle}</h5>
                  <p className="card-text">{tip.purpose}</p>
                  <button
                    className="diyLink"
                    onClick={() => handleShowModal(tip)}
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No DIY tips added yet.</p>
      )}
      {selectedTip && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>{selectedTip.ditTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Purpose:</strong> {selectedTip.purpose}
            </p>
            <p>
              <strong>Materials Required:</strong>{" "}
              {selectedTip.materialsRequired.join(", ")}
            </p>
            <p>
              <strong>Category:</strong> {selectedTip.category}
            </p>
            <p>
              <strong>Safety Tips:</strong> {selectedTip.safetyTips.join(", ")}
            </p>
            <p>
              <strong>Additional Notes:</strong> {selectedTip.additionalNotes}
            </p>
            <h6>Steps:</h6>
            <ol>
              {selectedTip.steps.map((step, index) => (
                <li key={index}>
                  <strong>{step.title}</strong>: {step.description}
                </li>
              ))}
            </ol>
            <h6>Media:</h6>
            <Carousel>
              {selectedTip.photos.map((photo, index) => (
                <Carousel.Item key={`modal-photo-${index}`}>
                  <img
                    className="d-block w-100"
                    src={`${import.meta.env.VITE_API_BASEURL}/${photo}`}
                    alt={`DIY Photo ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
              {selectedTip.vedios.map((video, index) => (
                <Carousel.Item key={`modal-video-${index}`}>
                  <video
                    className="d-block w-100"
                    controls
                    autoPlay
                    muted
                    loop
                  >
                    <source
                      src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              ))}
            </Carousel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PreviousDIY;
