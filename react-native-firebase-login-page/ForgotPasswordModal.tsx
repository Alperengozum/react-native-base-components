import { Modal, Input, Button, Icon, HStack } from "native-base";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { sendPasswordResetEmail } from "./FirebaseFunctions";
import { showMessage } from "react-native-flash-message";

export const ForgotPasswordModal = (props: { open: boolean, setOpen: (open: boolean) => void }) => {
  const { open, setOpen } = props;
  const [email, setEmail] = React.useState("");

  const emailOnChange = (e: string) => {
    setEmail(e);
  };

  const sendResetLinkOnPress = async () => {
    if (email == "") {
      showMessage({
        message: "Email cannot be empty!",
        type: "danger",
        icon: "danger"
      });
      return;
    }
    const res = await sendPasswordResetEmail(email);
    if (res.status) {
      showMessage({
        message: res.message,
        type: "success",
        icon: "success"
      });
      setOpen(false);
      setEmail("");
    } else {
      showMessage({
        message: res.message,
        type: "danger",
        icon: "danger"
      });
    }
  };

  return (
    <Modal isOpen={open} onClose={() => {
      setOpen(false), setEmail("");
    }} safeAreaTop={true}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Forgot Password</Modal.Header>
        <Modal.Body>
          <Input
            variant="rounded"
            w={{
              base: "100%",
              md: "25%"
            }}
            InputLeftElement={<Icon as={MaterialCommunityIcons} name="account" size={5} ml="2" color="muted.400" />}
            placeholder="Email"
            onChangeText={emailOnChange}
            value={email} />
        </Modal.Body>
        <Modal.Footer>
          <HStack>
            <Button variant="ghost" colorScheme="indigo" onPress={() => {
              setOpen(false), setEmail("");
            }
            }>
              Cancel
            </Button>
            <Button colorScheme="indigo" onPress={sendResetLinkOnPress}>
              Send Password Reset Link
            </Button>
          </HStack>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};
