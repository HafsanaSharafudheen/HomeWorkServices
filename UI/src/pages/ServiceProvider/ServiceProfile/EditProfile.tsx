
import  { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../axios/axios";
import { useNavigate } from 'react-router-dom';
import { Provider } from "../../../types/provider"; // Importing the Provider interface

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Provider>({
    fullName: "",
    email: "",
    contactNumber: "",
    address: "",
    languages: [],
    serviceCategory: "",
    yearsOfExperience: 0,
    education: { institute: "", year: 0 },
    workingHours: "",
    certifications: "",
    serviceCharge: 0,
    isAdmin: false,
    isAvailable: true,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/serviceProviderProfile");
        const data = response.data.profile;

        setFormData({
          fullName: data.fullName || "",
          email: data.email || "",
          contactNumber: data.contactNumber || "",
          address: data.address || "",
          languages: data.languages || [],
          serviceCategory: data.serviceCategory || "",
          yearsOfExperience: data.yearsOfExperience || 0,
          education: data.education || { institute: "", year: 0 },
          workingHours: data.workingHours || "",
          certifications: data.certifications || "",
          serviceCharge: data.serviceCharge || 0,
          isAdmin: data.isAdmin || false,
          isAvailable: data.isAvailable || true,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const lang = value;
      setFormData((prev) => ({
        ...prev,
        languages: checked
          ? [...prev.languages, lang]
          : prev.languages.filter((language) => language !== lang),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData = {
        fullName: formData.fullName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        address: formData.address,
        languages: formData.languages,
        serviceCategory: formData.serviceCategory,
        yearsOfExperience: formData.yearsOfExperience,
        education: formData.education,
        workingHours: formData.workingHours,
        certifications: formData.certifications,
        serviceCharge: formData.serviceCharge,
      };

      await axios.post("/updateProfile", updateData);
      navigate("/ServiceProfile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="container p-4">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                name="education"
                value={formData.education.institute}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    education: { ...prev.education, institute: e.target.value },
                  }))
                }
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Service Category</Form.Label>
              <Form.Select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="cleaning">Cleaning</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Working Hours</Form.Label>
              <Form.Control
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Certifications</Form.Label>
              <Form.Control
                type="text"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Languages Known</Form.Label>
              <div>
                {["Hindi", "Malayalam", "English", "Tamil"].map((lang) => (
                  <Form.Check
                    inline
                    key={lang}
                    type="checkbox"
                    label={lang}
                    value={lang}
                    checked={formData.languages.includes(lang)}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Service Charge</Form.Label>
              <Form.Control
                type="number"
                name="serviceCharge"
                value={formData.serviceCharge}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" className="mt-3 me-3" type="submit">
          Save Changes
        </Button>
        <Button variant="secondary" className="mt-3" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </div>
  );
}

export default EditProfile;
