import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, ArrowRight } from "lucide-react";

interface SignInFormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Add your API endpoint here
      const response = await fetch("your-api-endpoint/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful sign in
        navigate("/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/50 to-white pt-24 pb-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-indigo-900">
              Welcome Back
            </h1>
            <p className="text-gray-600 mt-2">
              Sign in to access your business dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
                <LogIn className="h-4 w-4" />
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Don't have an account?
                  </span>
                </div>
              </div>

              <Link to="/get-started">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                >
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
