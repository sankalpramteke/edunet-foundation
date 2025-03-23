import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [email, setEmail] = useState(""); // Fixed casing
    const [password, setPassword] = useState(""); // Fixed casing
    const [confirmPassword, setConfirmPassword] = useState(""); // Fixed casing

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Signed up with: ", { email, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword} // Fixed
                        onChange={(e) => setConfirmPassword(e.target.value)} // Fixed
                        className="w-full p-2 mb-4 border rounded"
                        required
                    />
                    <button className="w-full bg-green-500 text-white p-2 rounded">
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/signin" className="text-blue-500">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
