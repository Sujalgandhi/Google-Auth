import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    createUserWithEmailAndPassword,
    GithubAuthProvider,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth } from "../FireBase/firebase";

const SignUp = () => {
    const provider = new GithubAuthProvider();
    const googleProvider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        register();
    };

    const register = async () => {
        try {
            const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            toast.success("Registration successful! Welcome, " + res.user.email);
            if (res.user) {
                navigate("/");
            }
        } catch (error) {
            toast.error("Registration failed: " + error.message);
        }
    };

    const loginWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome back, ${user.displayName || user.email}`);
            if (result.user) {
                navigate("/form");
            }
        } catch (error) {
            toast.error(`GitHub Login Error: ${error.message}`);
        }
    };

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            toast.success(`Welcome, ${user.displayName}`);
            if (result.user) {
                navigate("/form");
            }
        } catch (error) {
            toast.error(`Google Login Error: ${error.message}`);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4 text-primary">Create Your Account</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-medium fs-6">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-medium fs-6">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="text-center mb-3">
                        <button
                            type="button"
                            className="btn btn-outline-secondary w-100 mb-2 d-flex align-items-center justify-content-center"
                            onClick={loginWithGoogle}
                        >
                            <FcGoogle size={22} className="me-2" /> Sign Up with Google
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center"
                            onClick={loginWithGitHub}
                        >
                            <FaGithub size={22} className="me-2" /> Sign Up with GitHub
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="d-block mb-2">
                            Already have an account?{" "}
                            <Link to="/" className="text-decoration-none">
                                Sign In
                            </Link>
                        </span>
                        <button type="submit" className="btn btn-primary w-100 mt-2">
                            Create Account
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
};

export default SignUp;
