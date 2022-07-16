import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import UserCredential = FirebaseAuthTypes.UserCredential;

export interface EmailUser {
  email: string;
  password: string;
};

export interface Response {
  status: boolean;
  code: number;
  message: string;
  data?:  UserCredential;
};
