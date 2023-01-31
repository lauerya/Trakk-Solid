import {
    Button,
    createDisclosure,
    Modal,
    ModalBody, ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@hope-ui/solid";
import {AddTaskForm} from "./AddTaskForm";

interface TaskModal{
    openModal: boolean
    closeModal: boolean
}
export function AddTaskModal(props: any){
    const { isOpen, onOpen, onClose } = createDisclosure()

    return(
        <>
            {JSON.stringify(props)}
            <Modal size={"xl"} opened={props.openModal} onClose={() => props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Add Task</ModalHeader>
                    <ModalBody>
                            <AddTaskForm></AddTaskForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}