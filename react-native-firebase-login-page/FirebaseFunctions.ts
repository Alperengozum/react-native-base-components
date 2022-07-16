import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { EmailUser, Response } from "./User";

export const createUserWithEmailAndPassword = (user: EmailUser): Promise<Response> => {
  return auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(() => {
      return {
        status: true,
        code: 200,
        message: "User account created & signed in!"
      };
    })
    .catch(error => {
      if (error.code === "auth/email-already-in-use") {
        return {
          status: false,
          code: 400,
          message: "Email address is already in use!"
        };
      }
      if (error.code === "auth/invalid-email") {
        return {
          status: false,
          code: 400,
          message: "Email address is invalid!"
        };
      } else {
        return {
          status: false,
          code: 400,
          message: error.message
        };
      }
    });
};

export const signInWithEmailAndPassword = (user: EmailUser): Promise<Response> => {
  return auth().signInWithEmailAndPassword(user.email, user.password)
    .then((e: FirebaseAuthTypes.UserCredential) => {
      return {
        status: true,
        code: 200,
        message: "Successfully logged!",
        data: e
      };
    })
    .catch(error =>{
      if (error.code === "auth/invalid-email") {
        return {
          status: false,
          code: 400,
          message: "Email address is invalid!"
        };
      }
      if (error.code === "auth/wrong-password") {
        return {
          status: false,
          code: 400,
          message: "Password is not correct!"
        };
      }
      return {
        status: false,
        code: 400,
        message: error.message
      }
    })
};

export const sendPasswordResetEmail = (email: string): Promise<Response> => {
  return auth()
    .sendPasswordResetEmail(email).then((e) => {
      return {
        status: true,
        code: 200,
        message: "Password reset mail sent!"
      };
    }).catch(error => {
      if (error.code === "auth/invalid-email") {
        return {
          status: false,
          code: 400,
          message: "Email address is not registered."
        };
      }
      return {
        status: false,
        code: 400,
        message: error.message
      };
    });
};

export const signOut = (): Promise<Response> => {
  return auth()
    .signOut()
    .then(() => ({
      status: true,
      code: 200,
      message: "User logged out!"
    }));
};
