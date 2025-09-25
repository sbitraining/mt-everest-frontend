"use client";
import React, { useState } from "react";
import { Leaf, Warehouse, Eye } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/toast-notification";
import { useAuth } from "@/components/shared/auth-context";
import { useCart } from "@/app/bestsellers/_components/cart-context";
import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const LoginPage = () => {
  const router = useRouter();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { clearCart, fetchCartItems } = useCart();

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        showToast("Invalid credentials", "error");
        return;
      }

      const data = await res.json();

      //  store token
      localStorage.setItem("jwtToken", data.token);

      //  clear any previous cart
      clearCart();

      //  fetch this user's cart immediately
      await fetchCartItems();

      // show success and redirect
      showToast("Login successful!", "success");
      router.push("/"); // go to home or wherever
    } catch (err) {
      console.error("Login error:", err);
      showToast("Something went wrong", "error");
    }
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.access); //  updates context and localStorage
        showToast("Login successful!", "success");
        router.push("/"); //  go to homepage
      } else {
        showToast("Invalid credentials", "error");
      }
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  };

  //THis is the clerk login with signup
  const SyncClerkUser = () => {
    const { user } = useUser();

    const sync = async () => {
      if (!user) return;
      const res = await fetch("http://localhost:8000/api/social-login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.primaryEmailAddress?.emailAddress,
          first_name: user.firstName,
          last_name: user.lastName,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        //  Save JWT in localStorage
        localStorage.setItem("jwtToken", data.access);
        console.log("JWT saved, user can now buy products");
      } else {
        console.error(data);
      }
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50">
      <Leaf className="bg-green-800 text-white w-14 h-14 rounded-full mb-4" />

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-center font-semibold text-2xl">Welcome Back</h1>
        <p className="text-center pt-2 pb-4 text-gray-600">
          Sign in to access your wellness journey
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <Eye
              className="absolute top-9 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="accent-green-700" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-green-700 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-700 text-white w-full py-2 rounded mt-4 flex items-center justify-center gap-2 hover:bg-green-800 transition"
          >
            {loading ? (
              "Logging in..."
            ) : (
              <>
                <Warehouse /> Login
              </>
            )}
          </button>

          <div className="text-center py-4 text-gray-600">or continue with</div>
          <div className="flex justify-center gap-4">
            <SignInButton mode="redirect">
              <button
                type="button"
                className="p-2 border rounded-full hover:shadow-md flex items-center justify-center"
              >
                <FcGoogle className="text-2xl" />
              </button>
            </SignInButton>
          </div>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?
          <button
            onClick={() => router.push("/authentication/register")}
            className="text-green-700 font-medium ml-1 hover:underline"
          >
            Register here
          </button>
        </p>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center max-w-md">
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

export default LoginPage;
