import {AddTaskForm} from "./AddTaskForm";

interface TaskModal{
    openModal: boolean
    closeModal: boolean
}
export function AddTaskModal(props: any){

    return(
        <>
            {JSON.stringify(props)}
            //TODO: Replace Hope-UI with Modal
            {/*<Modal size={"xl"} opened={props.isModalOpen} onClose={props.closeModal}>*/}
            {/*    <ModalOverlay />*/}
            {/*    <ModalContent>*/}
            {/*        <ModalCloseButton />*/}
            {/*        <ModalHeader>Add Task</ModalHeader>*/}
            {/*        <ModalBody>*/}
            {/*            <AddTaskForm closeModal={props.closeModal}></AddTaskForm>*/}
            {/*        </ModalBody>*/}
            {/*        <ModalFooter>*/}
            {/*            <Button onClick={props.closeModal}>Close</Button>*/}
            {/*        </ModalFooter>*/}
            {/*    </ModalContent>*/}
            {/*</Modal>*/}
        </>
    )
}