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

    return(
        <>
            {JSON.stringify(props)}
            <Modal size={"xl"} opened={props.isModalOpen} onClose={props.closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Add Task</ModalHeader>
                    <ModalBody>
                        <AddTaskForm closeModal={props.closeModal}></AddTaskForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={props.closeModal}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}