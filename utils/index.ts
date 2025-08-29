import { Alert } from "react-native";

export const withErrorHandling = <T extends any[]>(
  fn: (...args: T) => Promise<void>,
  defaultErrorMsg: string
) => {
  return async (...args: T) => {
    try {
      await fn(...args);
    } catch (error) {
      console.error("Error occurred:", error);
      Alert.alert("Error", defaultErrorMsg);
    }
  };
};
