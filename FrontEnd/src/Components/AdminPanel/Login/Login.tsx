import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Grid, Link, Typography } from "@mui/material";
import "./Login.css";
const ForgotPassword = lazy(
  () => import("../../ForgotPassword/ForgotPassword")
);

interface FormData {
  email: string;
  password: string;
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isForgetPwdModalOpen, setIsForgetPwdModalOpen] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successfulLoginMsg, setSuccessfulLoginMsg] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, email: value });
    validateEmail(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFormData({ ...formData, password: value });
    validatePassword(value);
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

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "This field is required",
      }));
      setIsPasswordValid(false);
    } else if (value.length < 4) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 4 characters",
      }));
      setIsPasswordValid(false);
    } else {
      setFormErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      setIsPasswordValid(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setError("");
      setSuccessfulLoginMsg("");
      const email = formData.email ?? "";
      const password = formData.password ?? "";
      if (!email || !password) return;
      console.log("email", email, password);
      const response: any = await axios.post(
        "http://localhost:8080/admin/login",
        {
          email,
          password,
        }
      );

      if (response?.data?.token) {
        const { token } = response?.data || {};
        localStorage.setItem("token", token);
        localStorage.setItem("userEmail", email);
        setSuccessfulLoginMsg("Successfully logged in.");
        navigate("/admin/inventory/return", { state: { email } });
        const decodedToken = parseJwt(token);
        console.log("decodedToken", decodedToken.role);
        setLoggedInUser(decodedToken);
      } else {
        setError("Something went wrong! Please refresh the page.");
      }
    } catch (error: any) {
      setError(error?.response?.data?.error ?? "");
      setSuccessfulLoginMsg("");
    }
  };

  // Function to parse JWT token
  const parseJwt = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  };

  const onForgotPwdClick = () => {
    setIsForgetPwdModalOpen(true);
  };

  return (
    <div>
      <div className="login-card">
        <Typography
          id="modal-title"
          variant="h5"
          component="h2"
          style={{
            marginBottom: "20px",
            fontWeight: "bold",
            color: "#1976d2",
          }}
        >
          Login to your account
        </Typography>
        <form onSubmit={handleSubmit}>
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                error={!!formErrors.password}
                helperText={formErrors.password}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <Link
                onClick={onForgotPwdClick}
                variant="body2"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </Link> */}
              {error && (
                <Typography variant="body2" color="red">
                  {error}
                </Typography>
              )}
              {successfulLoginMsg && (
                <Typography variant="body2" color="red">
                  {successfulLoginMsg}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isEmailValid || !isPasswordValid}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      {isForgetPwdModalOpen && (
        <Suspense>
          <ForgotPassword
            isForgetPwdModalOpen={isForgetPwdModalOpen}
            setIsForgetPwdModalOpen={setIsForgetPwdModalOpen}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Login;
