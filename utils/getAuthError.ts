export const getAuthError = (errorCode: string) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "Incorrect email or password. Please try again";

    case "auth/email-already-in-use":
      return "An account already exist with this email.";

    case "auth/weak-password":
      return "Password should be at least 6 characters long.";

    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";

    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

export const errorTimeOut = () => {};
