import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Avatar,
    Button,
    Text,
  } from '@chakra-ui/react'

const ProfileModal = ({children,user}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <span onClick={onOpen}>{children}</span>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"1em"}
                >
                  <Text fontSize={"2xl"}>{user.email}</Text>
                  <Avatar
                    name={user.name}
                    src={user.photo}
                    size="2xl"
                  />
                </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ProfileModal