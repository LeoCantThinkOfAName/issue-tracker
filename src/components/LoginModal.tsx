import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import { FC } from "react";
import { OAuthUrl } from "../constants";
import { useAuth } from "../hooks/useAuth";

interface LoginModalProps {}

export const LoginModal: FC<LoginModalProps> = () => {
  const { loading, user } = useAuth();

  return (
    // the empty onClose function just to keep my IDE to shut up
    <Modal isOpen={!user} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Please Login Your GitHub Account</ModalHeader>
        <ModalBody mb="3">
          <Button
            isLoading={loading}
            colorScheme="green"
            w="100%"
            as="a"
            href={OAuthUrl}
          >
            Login
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
