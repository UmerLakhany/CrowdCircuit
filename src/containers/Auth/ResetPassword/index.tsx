"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import AuthLayout from "@/components/AuthLayout";
import InputField from "@/components/Input";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import { AUTH_IMAGES } from "@/data/events";
import { route } from "@/data/routes";
import { passwordRegex, passwordRules } from "@/utils";

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const router = useRouter();
  // Token comes from the email link: /auth/reset-password?token=XXXX
  const token = useSearchParams().get("token");

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);

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
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: { password: "", confirmPassword: "" },
  });

  // useWatch (not watch) so the checklist re-renders with the React Compiler
  const password = useWatch({ control, name: "password" });

  // *For Submit Form
  const submitForm = async (formData: ResetPasswordFormValues) => {
    setLoading(true);
    try {
      const payload = {
        token,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      };

      // TODO: replace with reset password API call
      console.log("Reset password payload:", payload);

      SuccessToaster("Your password has been reset successfully");
      setIsReset(true);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Invalid / missing token
  if (!token) {
    return (
      <AuthLayout title="Link invalid or expired" image={AUTH_IMAGES.resetPassword}>
        <span className="cc-category-icon mb-4">
          <i className="bi bi-link-45deg" />
        </span>
        <p className="text-body-secondary mb-4">
          This password reset link is invalid or has expired. Please request a
          new link to reset your password.
        </p>
        <Link href={route.forgotPassword} className="btn btn-gradient w-100 py-2">
          Request New Link
        </Link>
        <p className="text-center small text-body-secondary mt-4 mb-0">
          <Link href={route.login} className="fw-semibold">
            Back to Sign In
          </Link>
        </p>
      </AuthLayout>
    );
  }

  // Success state
  if (isReset) {
    return (
      <AuthLayout title="Password updated" image={AUTH_IMAGES.resetPassword}>
        <span className="cc-category-icon mb-4">
          <i className="bi bi-check2-circle" />
        </span>
        <p className="text-body-secondary mb-4">
          Your password has been changed successfully. You can now sign in with
          your new password.
        </p>
        <button
          type="button"
          className="btn btn-gradient w-100 py-2 d-inline-flex align-items-center justify-content-center gap-2"
          onClick={() => router.replace(route.login)}
        >
          Continue to Sign In
          <i className="bi bi-arrow-right" />
        </button>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Your new password must be different from previously used passwords."
      image={AUTH_IMAGES.resetPassword}
    >
      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <InputField
          name="password"
          type={isPasswordVisible ? "text" : "password"}
          label="New Password"
          placeholder="Create a new password"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-lock" />}
          iconClass={isPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}
          iconOnClick={togglePasswordVisibility}
          rules={{
            required: "Password is required",
            pattern: {
              value: passwordRegex,
              message: "Password does not meet all the requirements below",
            },
          }}
        />

        {/* Live password requirements */}
        <ul className="list-unstyled small d-flex flex-column gap-1 mb-3">
          {passwordRules.map((rule) => {
            const passed = rule.test(password);
            return (
              <li
                key={rule.label}
                className={`d-flex align-items-center gap-2 ${
                  passed ? "text-success" : "text-body-secondary"
                }`}
              >
                <i className={`bi ${passed ? "bi-check-circle-fill" : "bi-circle"}`} />
                {rule.label}
              </li>
            );
          })}
        </ul>

        <InputField
          name="confirmPassword"
          type={isConfirmPasswordVisible ? "text" : "password"}
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          register={register}
          errors={errors}
          startAdornment={<i className="bi bi-shield-lock" />}
          iconClass={isConfirmPasswordVisible ? "bi bi-eye-slash" : "bi bi-eye"}
          iconOnClick={toggleConfirmPasswordVisibility}
          rules={{
            required: "Please confirm your new password",
            validate: (value: string) =>
              value === getValues("password") || "Passwords do not match",
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      <p className="text-center small text-body-secondary mt-4 mb-0">
        <Link href={route.login} className="fw-semibold d-inline-flex align-items-center gap-1">
          <i className="bi bi-arrow-left" />
          Back to Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}
