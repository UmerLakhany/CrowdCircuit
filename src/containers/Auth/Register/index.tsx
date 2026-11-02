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
import { emailRegex, passwordRegex, phoneRegex } from "@/utils";

type RegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

export default function RegisterPage() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible((prevState) => !prevState);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  // *For Submit Form
  const submitForm = async (formData: RegisterFormValues) => {
    setLoading(true);
    try {
      const payload = {
        full_name: formData.fullName.trim(),
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      // TODO: replace with register API call
      console.log("Register payload:", payload);

      SuccessToaster("Account created! We've sent a verification code to your email.");

      // Go to OTP verification for this email
      setTimeout(() => {
        router.replace(
          `${route.verifyEmail}?email=${encodeURIComponent(formData.email)}`
        );
      }, 200);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // TODO: enable when social login is configured
  const handleSocialLogin = (provider: string) => {
    console.log("Social sign up:", provider);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join CrowdCircuit to book tickets, save favorites and manage your bookings."
      image={AUTH_IMAGES.register}
    >
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <InputField
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-person" />}
          rules={{
            required: "Full name is required",
            minLength: {
              value: 3,
              message: "Full name must be at least 3 characters",
            },
          }}
        />

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
          name="phone"
          type="tel"
          label="Phone Number"
          placeholder="03XX XXXXXXX"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-telephone" />}
          rules={{
            required: "Phone number is required",
            setValueAs: (value: string) => value.replace(/[\s-]/g, ""),
            pattern: {
              value: phoneRegex,
              message: "Enter a valid number, e.g. 03001234567",
            },
          }}
        />

        <InputField
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          label="Password"
          placeholder="Create a password"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-lock" />}
          iconClass={isPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}
          iconOnClick={togglePasswordVisibility}
          rules={{
            required: "Password is required",
            pattern: {
              value: passwordRegex,
              message:
                "Use 8+ characters with uppercase, lowercase, number and special character",
            },
          }}
        />

        <InputField
          name="confirmPassword"
          type={isConfirmPasswordVisible ? "text" : "password"}
          label="Confirm Password"
          placeholder="Re-enter your password"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-shield-lock" />}
          iconClass={isConfirmPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}
          iconOnClick={toggleConfirmPasswordVisibility}
          rules={{
            required: "Please confirm your password",
            validate: (value: string) =>
              value === getValues("password") || "Passwords do not match",
          }}
        />

        <div className="mb-4">
          <div className="form-check mb-0">
            <input
              className={`form-check-input ${errors.acceptTerms ? "is-invalid" : ""}`}
              type="checkbox"
              id="acceptTerms"
              {...register("acceptTerms", {
                required: "You must accept the terms to continue",
              })}
            />
            <label className="form-check-label small" htmlFor="acceptTerms">
              I agree to the{" "}
              <Link href={route.terms} className="fw-medium">
                Terms & Conditions
              </Link>{" "}
              and{" "}
              <Link href={route.privacy} className="fw-medium">
                Privacy Policy
              </Link>
            </label>
          </div>
          {errors.acceptTerms && (
            <div className="invalid-feedback d-block">
              {errors.acceptTerms.message}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-gradient w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          )}
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      {/* Divider */}
      <div className="d-flex align-items-center gap-3 my-4">
        <hr className="flex-grow-1 my-0" />
        <span className="small text-body-secondary">or sign up with</span>
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
        Already have an account?{" "}
        <Link href={route.login} className="fw-semibold">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
