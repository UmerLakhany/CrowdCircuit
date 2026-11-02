"use client";

import { useForm } from "react-hook-form";
import InputField from "@/components/Input";
import { SuccessToaster } from "@/components/Toaster";

type NewsletterValues = {
  email: string;
};

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({ defaultValues: { email: "" } });

  const onSubmit = (data: NewsletterValues) => {
    // TODO: send to newsletter API
    console.log("Newsletter subscribe:", data);
    SuccessToaster("Thanks for subscribing! Stay tuned for updates.");
    reset();
  };

  return (
    <section className="cc-section pt-0">
      <div className="container">
        <div className="cc-newsletter p-4 p-md-5">
          <div className="row align-items-center g-4 position-relative">
            <div className="col-12 col-lg-6">
              <span className="cc-category-icon mb-3">
                <i className="bi bi-envelope-paper-heart" />
              </span>
              <h2 className="fw-bold mb-2">Never Miss an Event</h2>
              <p className="text-body-secondary mb-0">
                Subscribe to get updates on upcoming events, special
                announcements and new experiences near you.
              </p>
            </div>

            <div className="col-12 col-lg-6">
              <form
                className="cc-field-flush row g-2 align-items-start"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <div className="col-12 col-sm">
                  <InputField
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    register={register}
                    errors={errors}
                    startAdornment={<i className="bi bi-envelope" />}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Please enter a valid email",
                      },
                    }}
                  />
                </div>
                <div className="col-12 col-sm-auto d-grid">
                  <button type="submit" className="btn btn-gradient px-4 py-2">
                    Subscribe
                  </button>
                </div>
              </form>
              <p className="small text-body-secondary mt-3 mb-0">
                <i className="bi bi-shield-check me-1" />
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
