import { LANGUAGES } from "../../languages";

export const registrationPageTranslations = {
  [LANGUAGES.EN]: {
    translation: {
      signInToContinue: "Sign In To Continue",
      name: "Name",
      confirmPassword: "Confirm password",
      confirm: "Confirm password",
      createAccount: "Create an account",
      isRequired: "is required",
      invalidEmailFormat:
        "Invalid email format. Please enter a valid email address.",
      passwordRequirements: "Password: 6+ characters, 1 digit required.",
      passwordMismatch:
        "The confirm password doesn't match the password entered.",
    },
  },
  [LANGUAGES.UK]: {
    translation: {
      signInToContinue: "Авторизуйтесь, щоб продовжити",
      name: "Ім'я",
      confirmPassword: "Підтвердіть пароль",
      confirm: "Підтвердження паролю",
      createAccount: "Створити обліковий запис",
      isRequired: "потрібно",
      invalidEmailFormat: "Неправильний формат електронної пошти.",
      passwordRequirements: "Пароль: 6+ символів, 1 цифра обов'язкова.",
      passwordMismatch:
        "Підтверджений пароль не збігається з введеним паролем.",
    },
  },
};
