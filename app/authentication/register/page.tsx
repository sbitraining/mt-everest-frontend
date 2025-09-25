"use client";
import React, { useState } from "react";
import { Leaf, Warehouse, Eye, User, Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/components/ui/toast-notification";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  // ✅ Submit form
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        showToast("Registered successfully!", "success");
        form.reset();

        router.push("/authentication/login");
      } else {
        showToast(data.error || "Registration failed", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Something went wrong.", "error");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <Leaf className="bg-green-800 text-white w-14 h-14 rounded-full mb-4 mt-6" />

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-center font-semibold text-2xl">Create Account</h1>
        <p className="text-center pt-2 pb-4 text-gray-600">
          Join our community of natural wellness enthusiasts
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2 pb-2">
            <h2 className="text-gray-700 font-semibold">
              Personal Information
            </h2>
          </div>

          {/* First Name and Last Name in one line */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="first_name"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <User className="w-4 h-4 mr-2" />
                First Name:
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="Enter first name"
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="last_name"
                className="flex items-center text-sm font-medium text-gray-700"
              >
                <User className="w-4 h-4 mr-2" />
                Last Name:
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Enter last name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label
              htmlFor="password"
              className="flex items-center text-sm font-medium text-gray-700"
            >
              <Lock className="w-4 h-4 mr-2" />
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Create a strong password"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Eye
              className="absolute top-9 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="bg-green-700 text-white w-full py-2 rounded mt-4 flex items-center justify-center gap-2 hover:bg-green-800 transition"
          >
            <Warehouse /> Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-3">
          Already have an account?
          <a
            href="/authentication/login"
            className="text-green-700 font-medium ml-1 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-4 mb-4 text-center max-w-md">
        By continuing, you agree to our{" "}
        <a href="#" className="underline">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default Register;
