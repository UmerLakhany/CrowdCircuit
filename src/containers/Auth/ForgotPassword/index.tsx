"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/AuthLayout";
import InputField from "@/components/Input";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import { AUTH_IMAGES } from "@/data/events";
import { route } from "@/data/routes";
import { emailRegex } from "@/utils";

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: "" },
  });

  // *For Submit Form
  const submitForm = async (formData: ForgotPasswordFormValues) => {
    setLoading(true);
    try {
      const payload = {
        email: formData.email,
      };

      // TODO: replace with forgot password API call
      console.log("Forgot password payload:", payload);

      SuccessToaster("Password reset link sent to your email");
      setSentTo(formData.email);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // *Resend link to the same email
  const handleResend = () => {
    if (sentTo) submitForm({ email: sentTo });
  };

  // Success state: link sent
  if (sentTo) {
    return (
      <AuthLayout
        title="Check your email"
        image={AUTH_IMAGES.forgotPassword}
      >
        <div className="text-center text-sm-start">
          <span className="cc-category-icon mb-4">
            <i className="bi bi-envelope-check" />
          </span>
          <p className="text-body-secondary mb-4">
            We&apos;ve sent a password reset link to{" "}
            <span className="fw-semibold text-body">{sentTo}</span>. Follow the
            link in the email to set a new password.
          </p>

          <Link
            href={route.login}
            className="btn btn-gradient w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
          >
            <i className="bi bi-arrow-left" />
            Back to Sign In
          </Link>

          <p className="small text-body-secondary mt-4 mb-2">
            Didn&apos;t receive the email? Check your spam folder or
          </p>
          <div className="d-flex flex-wrap justify-content-center justify-content-sm-start gap-2">
            <button
              type="button"
              className="btn btn-outline-cc btn-sm px-3"
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? "Sending..." : "Resend link"}
            </button>
            <button
              type="button"
              className="btn btn-outline-cc btn-sm px-3"
              onClick={() => setSentTo(null)}
            >
              Use a different email
            </button>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries! Enter the email linked to your account and we'll send you a link to reset your password."
      image={AUTH_IMAGES.forgotPassword}
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

        <button
          type="submit"
          className="btn btn-gradient w-100 py-2 mt-2 d-inline-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          )}
          {loading ? "Sending link..." : "Send Reset Link"}
        </button>
      </form>

      <p className="text-center small text-body-secondary mt-4 mb-0">
        Remember your password?{" "}
        <Link href={route.login} className="fw-semibold">
          Back to Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
