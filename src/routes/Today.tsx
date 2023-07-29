import {createSignal, onMount, Show} from "solid-js";
import TaskList from "../components/TaskList";
import AddButton from "../components/AddTask/AddButton";
import {AddTaskForm} from "~/components/AddTask/AddTaskForm";

import Overview from "../components/Overview";

export default function Today() {
    const [toggleAddTask, setToggleAddTask] = createSignal(false);
    const toggle = () => setToggleAddTask(!toggleAddTask())
    const [ isOpen, onOpen ] = createSignal()

    onMount(() => {

    })

    return (
        <div>
            <Overview type="Today"></Overview>
                <TaskList></TaskList>
                    <Show when={isOpen}>
                        {/*<Modal size={"xl"} opened={isOpen()} onClose={onClose}>*/}
                        {/*    <ModalOverlay />*/}
                        {/*    <ModalContent>*/}
                        {/*        <ModalCloseButton />*/}
                        {/*        <ModalHeader>Add Task</ModalHeader>*/}
                        {/*        <ModalBody>*/}
                        {/*            <AddTaskForm closeModal={onClose}></AddTaskForm>*/}
                        {/*        </ModalBody>*/}
                        {/*        <ModalFooter>*/}
                        {/*            <Button onClick={onClose}>Close</Button>*/}
                        {/*        </ModalFooter>*/}
                        {/*    </ModalContent>*/}
                        {/*</Modal>*/}
                    </Show>
                    <AddButton toggleTaskForm={onOpen}></AddButton>
        </div>
    )
}