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

export const taskSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(3, 'Title must be at least 3 characters long'),
    description: Yup.string(),
    priority: Yup.string()
      .required('Priority is required')
      .oneOf(['LOW', 'MEDIUM', 'HIGH'], 'Invalid priority'),
    assignee: Yup.string()
      .required('Assignee is required'),
    dueDate: Yup.date()
      .required('Due date is required')
      .min(new Date(), 'Due date cannot be in the past')
  });