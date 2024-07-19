import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

export const AuthSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your password"),
});