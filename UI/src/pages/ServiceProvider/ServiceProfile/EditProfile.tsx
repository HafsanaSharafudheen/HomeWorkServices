import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../../../axios/axios";
import { useNavigate } from 'react-router-dom';

function EditProfile() {
    const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    languages: {
      hindi: false,
      malayalam: false,
      english: false,
      tamil: false,
    },
    serviceCategory: "",
    experience: "",
    education: "",
    availability: "",
    certifications: "",
    basicPayment: "",
    emergencyPayment: "",
    onsiteCharge: "",
    advancedCharge: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("/serviceProviderProfile");
        const data = response.data.profile;

        setFormData({
          name: data.fullName || "",
          email: data.email || "",
          phone: data.contactNumber || "",
          address:data.address||"",
          languages: {
            hindi: data.languages?.includes("Hindi") || false,
            malayalam: data.languages?.includes("Malayalam") || false,
            english: data.languages?.includes("English") || false,
            tamil: data.languages?.includes("Tamil") || false,
          },
          serviceCategory: data.serviceCategory || "",
          experience: data.yearsOfExperience || "",
          education: data.education?.institute || "",
          availability: data.workingHours || "",
          certifications: data.certifications || "",
          basicPayment:
            data.serviceCharges?.find((charge:{type:string,amount:number}) => charge.type === "Basic Payment")
              ?.amount || "",
          emergencyPayment:
            data.serviceCharges?.find((charge:{type:string,amount:number}) => charge.type === "Emergency Payment")
              ?.amount || "",
          onsiteCharge:
            data.serviceCharges?.find((charge:{type:string,amount:number}) => charge.type === "Onsite Charge")
              ?.amount || "",
          advancedCharge:
            data.serviceCharges?.find((charge:{type:string,amount:number}) => charge.type === "Advanced Charge")
              ?.amount || "",
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to fetch profile data");
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("languages.")) {
      const languageKey = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        languages: { ...prev.languages, [languageKey]: checked },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        fullName: formData.name,
        email: formData.email,
        contactNumber: formData.phone,
        languages: Object.keys(formData.languages).filter(
          (lang) => formData.languages[lang]
        ),
        serviceCategory: formData.serviceCategory,
        yearsOfExperience: formData.experience,
        education: {
          institute: formData.education,
          year: "", // Optional year field, adjust as needed
        },
        workingHours: formData.availability,
        certifications: formData.certifications,
        serviceCharges: [
          { type: "Basic Payment", amount: formData.basicPayment },
          { type: "Emergency Payment", amount: formData.emergencyPayment },
          { type: "Onsite Charge", amount: formData.onsiteCharge },
          { type: "Advanced Charge", amount: formData.advancedCharge },
        ],
      };

      const response = await axios.post("/updateProfile", updateData);
     navigate('/ServiceProfile')
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
      <h2 className="text-center">Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
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
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
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
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Education</Form.Label>
              <Form.Control
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Languages Known</Form.Label>
              <div>
                {["hindi", "malayalam", "english", "tamil"].map((lang) => (
                  <Form.Check
                    inline
                    key={lang}
                    type="checkbox"
                    label={lang.charAt(0).toUpperCase() + lang.slice(1)}
                    name={`languages.${lang}`}
                    checked={formData.languages[lang]}
                    onChange={handleChange}
                  />
                ))}
              </div>
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
              <Form.Label>Availability</Form.Label>
              <Form.Control
                type="text"
                name="availability"
                value={formData.availability}
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
              <Form.Label>Basic Payment</Form.Label>
              <Form.Control
                type="number"
                name="basicPayment"
                value={formData.basicPayment}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Emergency Payment</Form.Label>
              <Form.Control
                type="number"
                name="emergencyPayment"
                value={formData.emergencyPayment}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Onsite Visit Charge</Form.Label>
              <Form.Control
                type="number"
                name="onsiteCharge"
                value={formData.onsiteCharge}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Advanced Service Charge</Form.Label>
              <Form.Control
                type="number"
                name="advancedCharge"
                value={formData.advancedCharge}
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
