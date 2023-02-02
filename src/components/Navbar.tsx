import {A} from "@solidjs/router";
import AddButton from "./AddTask/AddButton";
import {createSignal, Show} from "solid-js";
import {AddTaskModal} from "./AddTask/AddTaskModal";
import {
    Button, createDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@hope-ui/solid";
import {AddTaskForm} from "./AddTask/AddTaskForm";

function Navbar() {
    const toggle = () => setToggleAddTask(!toggleAddTask())
    const [toggleAddTask, setToggleAddTask] = createSignal(false);
    const { isOpen, onOpen, onClose } = createDisclosure()

    return <>
        <nav class="bg-black">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">
                            {/*<img class="block h-8 w-auto lg:hidden"*/}
                            {/*     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"*/}
                            {/*     alt="Your Company"/>*/}
                            {/*    <img class="hidden h-8 w-auto lg:block"*/}
                            {/*         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"*/}
                            {/*         alt="Your Company"/>*/}
                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <A href="/Today"
                                   class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Today</A>
                                <A href="/Upcoming"
                                   class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Upcoming</A>
                                <A href="/Account"
                                   class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Account</A>
                              </div>
                        </div>
                    </div>
                    <AddButton toggleTaskForm={onOpen}></AddButton>
                    <Show when={isOpen}>
                        <Modal size={"xl"} opened={isOpen()} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalCloseButton />
                                <ModalHeader>Add Task</ModalHeader>
                                <ModalBody>
                                    <AddTaskForm closeModal={onClose}></AddTaskForm>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose}>Close</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Show>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar