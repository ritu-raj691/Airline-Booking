import React, { useState } from "react";
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Grid,
  Modal,
} from "@mui/material";
import { termsAndCondition } from "../../../Constant/Constant";
import "./ContactDetailCard.css";

interface FormData {
  email: string;
  phone: string;
  city: string;
  agentReference: string;
}

const ContactDetailCard = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    phone: "",
    city: "",
    agentReference: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let error = "";
    setIsSubmitBtnDisabled(false);
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
          setIsSubmitBtnDisabled(true);
        } else if (!/^\S+@\S+\.\S+$/.test(value)) {
          error = "Invalid email format";
          setIsSubmitBtnDisabled(true);
        }
        break;
      case "phone":
        if (!value) {
          error = "Phone number is required";
          setIsSubmitBtnDisabled(true);
        } else if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be 10 digits";
          setIsSubmitBtnDisabled(true);
        }
        break;
      case "city":
        if (!value) {
          error = "City is required";
          setIsSubmitBtnDisabled(true);
        }
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("formData", formData);
    }
  };

  const validateForm = () => {
    let valid = true;
    Object.values(errors).forEach((error) => {
      if (error) {
        valid = false;
      }
    });
    return valid;
  };

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" className="contact-card">
        <Typography variant="subtitle1" className="contact-detail-label">
          Contact Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              error={!!errors.email}
              helperText={errors.email}
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              error={!!errors.phone}
              helperText={errors.phone}
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              required
              error={!!errors.city}
              helperText={errors.city}
              label="City of Residence"
              name="city"
              value={formData.city}
              onChange={handleChange}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Agent Reference"
              name="agentReference"
              value={formData.agentReference}
              onChange={handleChange}
              size="small"
            />
            <Typography variant="caption" color="#888">
              Any internal reference you want to give to this booking (optional)
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body2" className="terms-and-condition">
          By proceeding to make payment, you agree to the&nbsp;
          <button onClick={() => setIsModalOpen(true)}>
            <span>terms and conditions</span>
          </button>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="proceed-btn"
          disabled={
            isSubmitBtnDisabled ||
            !formData.email ||
            !formData.phone ||
            !formData.city ||
            (!Object?.values(errors)?.includes("") ? true : false)
          }
          onClick={handleSubmit}
        >
          Proceed for payment
        </Button>
        {isModalOpen && (
          <Modal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                minWidth: "280px",
                bgcolor: "background.paper",
                boxShadow: 24,
                borderRadius: 2,
                p: 3,
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Typography id="modal-title" variant="h6" component="h2">
                Terms and Conditions
              </Typography>
              <div id="modal-description">
                <ul>
                  {termsAndCondition.map((item: string, index: number) => {
                    return (
                      <li
                        key={`item_${index + 1}`}
                        style={{
                          margin: "0 32px",
                        }}
                      >
                        <Typography
                          sx={{ mt: 2 }}
                          style={{
                            fontSize: "13px",
                            color: "rgb(64 63 63)",
                            marginTop: 8,
                          }}
                        >
                          {item}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </Box>
          </Modal>
        )}
      </Card>
    </Box>
  );
};

export default ContactDetailCard;
