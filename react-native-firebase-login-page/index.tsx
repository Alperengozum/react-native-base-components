import React, { ReactNode, Fragment } from "react";
import {
  Image,
  View,
  Heading,
  Button,
  VStack,
  IHeadingProps,
  IImageProps,
  Text,
  FormControl, Stack, Input, HStack, Icon, Alert
} from "native-base";
import {
  Dimensions,
  StyleSheet,
  ViewStyle
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./FirebaseFunctions";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import FlashMessage, { showMessage } from "react-native-flash-message";
import { ColorSchemeType } from "native-base/src/components/types/index";
import { IImage } from "../react-native-welcome-page/Image";

export const ReactNativeFirebaseLoginPage = (props: LoginPageProps) => {
  const {
    onClose, containerStyle, imageProps, imageContainerStyle, titleProps, titleText, colorScheme, image
  } = props;
  colorScheme
  const [showPassword, setShowPassword] = React.useState(false);
  const [showForgotPasswordModal, setForgotPasswordModal] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { width, height } = Dimensions.get("window");
  const styles = StyleSheet.create({
    container: { backgroundColor: "white", height: height, ...containerStyle },
    imageContainer: { width, justifyContent: "center", backgroundColor: "transparent", ...imageContainerStyle },
    image: { flex: 1 }
  });

  const emailOnChange = (e: string) => {
    setEmail(e);
  };

  const passwordOnChange = (e: string) => {
    setPassword(e);
  };

  const firstSignUpOnPress = () => {
    setEmail("");
    setPassword("");
    setShowSignUp(true);
  };

  const firstSignUpOnPressClose = () => {
    setPassword("");
    setShowSignUp(false);
  };

  const signUpOnPress = async () => {
    if (email == "") {
      showMessage({
        message: "Email cannot be empty!",
        type: "danger",
        icon: "danger"
      });
      return;
    }
    if (password == "") {
      showMessage({
        message: "Password cannot be empty!",
        type: "danger",
        icon: "danger"
      });
      return;
    }

    const res =  await createUserWithEmailAndPassword({ email, password });
    if (res.status) {
      showMessage({
        message: res.message,
        description: "You can login now.",
        type: "success",
        icon: "success"
      });
      firstSignUpOnPressClose();

    } else {
      showMessage({
        message: res.message,
        type: "danger",
        icon: "danger"
      });
    }
  };

  const forgotPasswordOnPress = () => {
    setForgotPasswordModal(true);
  };

  const loginOnPress = async () => {
    if (email == "") {
      showMessage({
        message: "Email cannot be empty!",
        type: "danger",
        icon: "danger"
      });
      return;
    }
    if (password == "") {
      showMessage({
        message: "Password cannot be empty!",
        type: "danger",
        icon: "danger"
      });
      return;
    }
    const res = await signInWithEmailAndPassword({ email, password });
    if (res.status) {
      showMessage({
        message: res.message,
        type: "success",
        icon: "success"
      });
      onClose();
    } else {
      showMessage({
        message: res.message,
        type: "danger",
        icon: "danger"
      });
    }
  };

  return (
    <View style={styles.container}>
      <View flex={1} borderBottomRadius={60} backgroundColor="white" zIndex={1} >
        <VStack justifyContent="flex-start" alignItems="center" space={1} flex={0.5} mt={10} mx={30}>
          <Heading size={"lg"} textAlign="center" {...titleProps}> {titleText || "Please login to access"}</Heading>
        </VStack>
        <VStack justifyContent="center" alignContent="center" alignItems="center" space={4} flex={2}>
          <FormControl>
            <Stack space={4} w="100%" alignItems="center" justifyContent="center" alignContent="center">
              <Input
                variant="rounded"
                w={{
                  base: "75%",
                  md: "25%"
                }}
                InputLeftElement={<Icon as={MaterialCommunityIcons} name="account" size={5} ml="2" color="muted.400" />}
                placeholder="Email"
                onChangeText={emailOnChange}
                value={email} />
              <Input variant="rounded"
                     w={{
                       base: "75%",
                       md: "25%"
                     }} type={showPassword ? "text" : "password"}
                     InputRightElement={<Icon as={MaterialCommunityIcons}
                                              name={showPassword ? "eye" : "eye-off"} size={5} mr="2"
                                              color="muted.400" onPress={() => setShowPassword(!showPassword)} />}
                     placeholder="Password"
                     onChangeText={passwordOnChange}
                     value={password} />
            </Stack>
          </FormControl>
          <HStack justifyContent="flex-end" width="75%" mt={-4}>
            {!showSignUp ?
              <Button size="sm"
                      colorScheme={colorScheme || "indigo"}
                      borderRadius="20"
                      variant="ghost"
                      onPress={forgotPasswordOnPress}>
                Forgot Password?
              </Button> :
              <Fragment/>
            }
          </HStack>
          {showSignUp ?
            <Button width={"75%"}
                    size="lg"
                    colorScheme={colorScheme || "indigo"}
                    borderRadius="20"
                    variant="solid"
                    onPress={signUpOnPress}>
              Sign Up
            </Button> :
            <Button width={"75%"}
                    size="lg"
                    colorScheme={colorScheme || "indigo"}
                    borderRadius="20"
                    variant="solid"
                    onPress={loginOnPress}>
              Login
            </Button>
          }
        </VStack>
        <VStack justifyContent="flex-end" alignItems="center" mb={4}>
          <HStack alignItems="center">
            {!showSignUp ?
              <Fragment>
              <Text> Don't have an account? </Text>
              <Button onPress={firstSignUpOnPress} variant="ghost" size="sm" colorScheme={colorScheme || "indigo"} borderRadius="20">
                <Text bold color={`${colorScheme || "indigo"}.500`}>Sign Up</Text>
              </Button>
              </Fragment>
              :
              <Fragment>
                <Text> Have an account?</Text>
                <Button onPress={firstSignUpOnPressClose} variant="ghost" size="sm" colorScheme={colorScheme || "indigo"} borderRadius="20">
                  <Text bold color={`${colorScheme || "indigo"}.500`}>Login</Text>
                </Button>
              </Fragment>
                }
          </HStack>
        </VStack>
      </View>
      <Image
        height={"100%"}
        zIndex={-1}
        flex={0.4}
        mt={-20}
        alt={"Welcome!"}
        resizeMode="cover"
        source={image.image}
        {...imageProps} />
      <ForgotPasswordModal open={showForgotPasswordModal} setOpen={setForgotPasswordModal} />
      <FlashMessage position="top" />
    </View>
  );
};

export interface LoginPageProps {
  onClose: () => void;
  containerStyle?: ViewStyle;
  imageContainerStyle?: ViewStyle;
  imageProps?: IImageProps;
  titleProps?: IHeadingProps;
  titleText?: ReactNode;
  colorScheme?: ColorSchemeType;
  image: IImage;
}
