import {Input, Button, Typography} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function SignUp() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const register = async (register_data) => {
    try {
      const response = await api.post("/api/v1/Authentication/register", {
        username: register_data.username,
        name: register_data.name,
        email: register_data.email,
        password: register_data.password,
      });

      if (response.status === 201) {
        navigate('/auth/sign-in');
        toast.success("Registration Successful");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      let errorMessage = "Registration failed";
      if (axios.isAxiosError(error) && error.response) {
        console.error("Server response:", error.response);
        if (error.response.data) {
          errorMessage += ": " + error.response.data;
        }
      } else if (error instanceof Error) {
        errorMessage += ": " + error.message;
      }
      toast.error(errorMessage);
    }
  };

  const validatePassword = (password) => {
    if(password.length < 7){
      toast.error("Password must be at least 7 characters long");
      return false;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{7,}$/;
    if(!regex.test(password)){
      toast.error("Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character");
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    const {name,value} = e.target;
    setInputs(prev => ({...prev,[name]:value}));
  }

  const handleSignup = (e) => {
    e.preventDefault();

    if(inputs.username === '' || inputs.name === '' || inputs.email === '' || inputs.password === '' || inputs.confirmPassword === ''){
      toast.error("Please fill all the fields");
      return;
    }

    if(inputs.password !== inputs.confirmPassword){
      toast.error("Passwords do not match");
      return;
    }
    if(!validatePassword(inputs.password)){
      return;
    }
      register(inputs);
  }
  return (
    <section className="flex text-surface-light">
      <div className="h-full p-4 min-h-screen relative justify-start items-center w-2/5 hidden lg:flex">
        <img
          src="/img/pattern.png"
          className="object-contain rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 mt-24 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-1">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal text-surface-light-dark">Enter your email, username, name and password to register.</Typography>
        </div>
        <form className="mt-2 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSignup}>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-surface-light">
              Your email
            </Typography>
            <Input
              size="lg"
              type="email"
              placeholder="name@mail.com"
              name="email"
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-surface-light">
              Your username
            </Typography>
            <Input
              size="lg"
              placeholder="Username"
              name="username"
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-surface-light">
              Your name
            </Typography>
            <Input
              size="lg"
              placeholder="Name"
              name="name"
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-surface-light">
              Your password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Password"
              name="password"
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 flex flex-col gap-4">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-surface-light">
              Confirm password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="Confirm password"
              name="confirmPassword"
              className="!border-surface-mid-dark text-surface-light focus:!border-secondary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={handleChange}
            />
          </div>
          <Button className="mt-6 bg-secondary hover:bg-primary" fullWidth type="submit">
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-surface-light-dark font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-secondary ml-1 hover:text-primary">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
