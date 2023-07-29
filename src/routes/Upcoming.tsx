import {createSignal, onMount, Show} from "solid-js";
import TaskList from "../components/TaskList";
import AddButton from "../components/AddTask/AddButton";
import {AddTaskForm} from "~/components/AddTask/AddTaskForm";
import Overview from "../components/Overview";

export default function Upcoming() {
    const [toggleAddTask, setToggleAddTask] = createSignal(false);
    const toggle = () => setToggleAddTask(!toggleAddTask())
    const [ isOpen, onOpen ] = createSignal()

    onMount(() => {

    })

    return (
        <div>
            <Overview type="Upcoming"></Overview>
            <TaskList filter="Upcoming" ></TaskList>
                <button type="button" data-hs-overlay="#hs-unstyled-modal">
                    Open modal
                </button>

                <div class="hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto">
                    <div class="hs-overlay-open:opacity-100 hs-overlay-open:duration-500 opacity-0 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
                        <AddTaskForm></AddTaskForm>
                    </div>
                </div>
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
            <AddButton toggleTaskForm={() => onOpen(true)}></AddButton>
        </div>
    )
}