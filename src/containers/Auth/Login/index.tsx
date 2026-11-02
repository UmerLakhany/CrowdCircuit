"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/AuthLayout";
import InputField from "@/components/Input";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import { AUTH_IMAGES } from "@/data/events";
import { route } from "@/data/routes";
import { emailRegex } from "@/utils";

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  });

  // *For Submit Form
  const submitForm = async (formData: LoginFormValues) => {
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        remember_me: rememberMe,
      };

      console.log("Login payload:", payload);

      SuccessToaster("Logged in successfully");

      setTimeout(() => {
        router.replace(route.home);
      }, 200);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // TODO: enable when social login is configured
  const handleSocialLogin = (provider: string) => {
    console.log("Social login:", provider);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your tickets, bookings and favorites."
      image={AUTH_IMAGES.login}
    >
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <InputField
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-envelope" />}
          rules={{
            required: "Email is required",
            pattern: {
              value: emailRegex,
              message: "Please enter a valid email address",
            },
          }}
        />

        <InputField
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          label="Password"
          placeholder="Enter your password"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-lock" />}
          iconClass={isPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}
          iconOnClick={togglePasswordVisibility}
          rules={{
            required: "Password is required",
          }}
        />

        <div className="d-flex align-items-center justify-content-between gap-2 mb-4">
          <div className="form-check mb-0">
            <input
              className="form-check-input"
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label small" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <Link href={route.forgotPassword} className="small fw-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn btn-gradient w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          )}
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="d-flex align-items-center gap-3 my-4">
        <hr className="flex-grow-1 my-0" />
        <span className="small text-body-secondary">or continue with</span>
        <hr className="flex-grow-1 my-0" />
      </div>

      <div className="row g-2">
        <div className="col-6">
          <button
            type="button"
            className="btn btn-outline-cc w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
            onClick={() => handleSocialLogin("google")}
          >
            <i className="bi bi-google" />
            Google
          </button>
        </div>
        <div className="col-6">
          <button
            type="button"
            className="btn btn-outline-cc w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
            onClick={() => handleSocialLogin("facebook")}
          >
            <i className="bi bi-facebook" />
            Facebook
          </button>
        </div>
      </div>

      <p className="text-center small text-body-secondary mt-4 mb-0">
        Don&apos;t have an account?{" "}
        <Link href={route.register} className="fw-semibold">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
