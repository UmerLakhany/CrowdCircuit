"use client";

import { Controller, useForm } from "react-hook-form";
import InputField from "@/components/Input";
import SelectField from "@/components/SelectField";
import { ErrorToaster, SuccessToaster } from "@/components/Toaster";

// Test page: exercises InputField, SelectField and Toaster
type FormValues = {
  name: string;
  email: string;
  city: { id: number; name: string } | null;
};

const cities = [
  { id: 1, name: "Karachi" },
  { id: 2, name: "Lahore" },
  { id: 3, name: "Islamabad" },
  { id: 4, name: "Peshawar" },
];

export default function Home() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", city: null },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    SuccessToaster("Form submitted! Check the console.");
  };

  const onError = () => {
    ErrorToaster("Please fix the errors in the form.");
  };

  return (
    <div className="container py-5" style={{ maxWidth: 500 }}>
      <h3 className="mb-4">Test Form</h3>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <InputField
          name="name"
          label="Name"
          register={register}
          errors={errors}
          rules={{ required: "Name is required" }}
        />

        <InputField
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          iconClass="bi bi-envelope"
          rules={{
            required: "Email is required",
            pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
          }}
        />

        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field, fieldState }) => (
            <SelectField
              label="City"
              options={cities}
              selected={field.value}
              onSelect={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Submit
        </button>
      </form>
    </div>
  );
}
