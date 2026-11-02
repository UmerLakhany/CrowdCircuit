"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { OtpInput } from "reactjs-otp-input";
import AuthLayout from "@/components/AuthLayout";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";
import { AUTH_IMAGES } from "@/data/events";
import { route } from "@/data/routes";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;

type VerifyEmailFormValues = {
  otp: string;
};

export default function VerifyEmailPage() {
  const router = useRouter();
  // Email comes from the register redirect: /auth/verify-email?email=XXXX
  const email = useSearchParams().get("email");

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    defaultValues: { otp: "" },
  });

  // *Resend countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  // *For Submit Form
  const submitForm = async (formData: VerifyEmailFormValues) => {
    setLoading(true);
    try {
      const payload = {
        email,
        otp: formData.otp,
      };

      // TODO: replace with verify email API call
      console.log("Verify email payload:", payload);

      SuccessToaster("Email verified successfully");

      setTimeout(() => {
        router.replace(route.home);
      }, 200);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // *Resend OTP
  const handleResend = async () => {
    setResending(true);
    try {
      // TODO: replace with resend OTP API call
      console.log("Resend OTP to:", email);

      SuccessToaster("A new verification code has been sent");
      setValue("otp", "");
      setSecondsLeft(RESEND_SECONDS);
    } catch (error: unknown) {
      ErrorToaster(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setResending(false);
    }
  };

  // Missing email in URL
  if (!email) {
    return (
      <AuthLayout title="Nothing to verify" image={AUTH_IMAGES.verifyEmail}>
        <span className="cc-category-icon mb-4">
          <i className="bi bi-envelope-exclamation" />
        </span>
        <p className="text-body-secondary mb-4">
          We couldn&apos;t find an email address to verify. Please create an
          account or sign in to continue.
        </p>
        <Link href={route.register} className="btn btn-gradient w-100 py-2">
          Create an Account
        </Link>
        <p className="text-center small text-body-secondary mt-4 mb-0">
          <Link href={route.login} className="fw-semibold">
            Back to Sign In
          </Link>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Verify your email" image={AUTH_IMAGES.verifyEmail}>
      <span className="cc-category-icon mb-3">
        <i className="bi bi-envelope-paper" />
      </span>
      <p className="text-body-secondary mb-4">
        We&apos;ve sent a {OTP_LENGTH}-digit verification code to{" "}
        <span className="fw-semibold text-body text-break">{email}</span>.
        Enter it below to verify your account.
      </p>

      <form onSubmit={handleSubmit(submitForm)} noValidate>
        <label className="form-label fw-medium">Verification Code</label>
        <Controller
          name="otp"
          control={control}
          rules={{
            required: "Please enter the verification code",
            validate: (value) =>
              value.length === OTP_LENGTH || `Enter all ${OTP_LENGTH} digits`,
          }}
          render={({ field }) => (
            <OtpInput
              value={field.value}
              onChange={field.onChange}
              numInputs={OTP_LENGTH}
              isInputNum
              shouldAutoFocus
              hasErrored={!!errors.otp}
              isDisabled={loading}
              containerStyle="cc-otp"
              inputStyle="cc-otp-input"
              focusStyle="cc-otp-input-focus"
              errorStyle="cc-otp-input-error"
            />
          )}
        />
        {errors.otp && (
          <div className="invalid-feedback d-block">{errors.otp.message}</div>
        )}

        <button
          type="submit"
          className="btn btn-gradient w-100 py-2 mt-4 d-inline-flex align-items-center justify-content-center gap-2"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          )}
          {loading ? "Verifying..." : "Verify Email"}
        </button>
      </form>

      {/* Resend */}
      <p className="text-center small text-body-secondary mt-4 mb-0">
        Didn&apos;t receive the code?{" "}
        {secondsLeft > 0 ? (
          <span>
            Resend in{" "}
            <span className="fw-semibold text-body">
              0:{String(secondsLeft).padStart(2, "0")}
            </span>
          </span>
        ) : (
          <button
            type="button"
            className="btn btn-link btn-sm p-0 fw-semibold align-baseline text-decoration-none"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>

      <p className="text-center small text-body-secondary mt-2 mb-0">
        Wrong email?{" "}
        <Link href={route.register} className="fw-semibold">
          Change email
        </Link>
      </p>
    </AuthLayout>
  );
}
