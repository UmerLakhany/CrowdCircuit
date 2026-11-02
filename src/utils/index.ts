// *Email Regex
export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// *Password Regex
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_~=@#$>.<,[{}()!%|'"`:;+*?&])[A-Za-z\d_~=@#$>.<,[{}()!%|'"`:;+*?&]{8,}$/;

// *Phone Regex (Pakistan mobile: 03XXXXXXXXX or +923XXXXXXXXX)
export const phoneRegex = /^(\+92|0)3\d{9}$/;

// *Password requirements (same rules as passwordRegex, used for live checklist)
export const passwordRules = [
  { label: "At least 8 characters", test: (value: string) => value.length >= 8 },
  { label: "One uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "One lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "One number", test: (value: string) => /\d/.test(value) },
  {
    label: "One special character",
    test: (value: string) => /[_~=@#$>.<,[{}()!%|'"`:;+*?&]/.test(value),
  },
];
