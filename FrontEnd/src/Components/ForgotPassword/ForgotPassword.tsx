import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Modal,
  Typography,
} from "@mui/material";

interface IForgotPassword {
  isForgetPwdModalOpen: boolean;
  setIsForgetPwdModalOpen: (isForgetPwdModalOpen: boolean) => void;
}

interface FormData {
  email: string;
}

const ForgotPassword = (props: IForgotPassword) => {
  const { isForgetPwdModalOpen, setIsForgetPwdModalOpen } = props;
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, email: value });
    validateEmail(value);
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "This field is required",
      }));
      setIsEmailValid(false);
    } else if (!value.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address",
      }));
      setIsEmailValid(false);
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      setIsEmailValid(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Perform login logic here
    console.log("Login submitted:", formData);
  };

  return (
    <div>
      {isForgetPwdModalOpen && (
        <Modal
          open={isForgetPwdModalOpen}
          onClose={(event, reason) => {
            if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
              // Restrict modal to close when outside click and escape key press
              setIsForgetPwdModalOpen(false);
            }
          }}
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
              padding: 3,
              maxHeight: "80vh",
              overflowY: "auto",
              background: "white",
            }}
          >
            <Typography
              id="modal-title"
              variant="h5"
              component="h2"
              style={{
                marginBottom: "20px",
                fontWeight: "bold",
                color: "#888",
              }}
            >
              Forgot Your Password?
            </Typography>
            <div id="modal-description">
              <Typography variant="body1" style={{ marginBottom: "16px" }}>
                Enter your email address below, and we'll email you a link to
                reset your password:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    size="small"
                  />
                </Grid>
              </Grid>
            </div>
            <Grid item xs={12} style={{ marginTop: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isEmailValid}
              >
                Send Reset Link
              </Button>
              <Button
                onClick={() => setIsForgetPwdModalOpen(false)}
                variant="contained"
                color="primary"
                style={{ marginLeft: "12px" }}
              >
                Close
              </Button>
            </Grid>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ForgotPassword;
