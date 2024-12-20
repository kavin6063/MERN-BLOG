import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import OAuth from "../components/OAuth";

const SignUp = () => {
  // state
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  // getting val from form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
    console.log(formData);
  };
  return (
    <div className="min-h-screen md:mt-20">
      <div className="flex  p-3 max-w-3xl mx-auto flex-col md:flex-row gap-8">
        {/* left */}
        <div className="flex-1 mt-16">
          <Link to="/" className=" font-bold text-4xl  dark:text-white">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              JS
            </span>
            Connect
          </Link>
          {/* need to change the text font mono or something */}
          <p className="text-sm font-mono mt-5">
            This a free and open source for javascript focused developer. You
            can sign up with your email and password or with Google
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <Label value="Your username" />
              <input
                id="username"
                type="text"
                className="field-input  "
                placeholder="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col  gap-2 ">
              <Label value="Your email" />
              <input
                id="email"
                type="email"
                className="field-input  "
                placeholder="name@company.com"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col  gap-2 ">
              <Label value="Your password" />
              <input
                id="password"
                type="password"
                className="field-input  "
                placeholder="password"
                onChange={handleChange}
              />
            </div>
            {/* Password strength meter */}
            <PasswordStrengthMeter
              password={formData.password}
              setStrength={setPasswordStrength}
            />
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading || passwordStrength < 4}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">loading</span>
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Already have an account? </span>
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
