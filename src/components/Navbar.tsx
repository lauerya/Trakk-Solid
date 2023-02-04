import {A, useLocation, useNavigate} from "@solidjs/router";
import AddButton from "./AddTask/AddButton";
import {createEffect, createSignal, Show} from "solid-js";
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
import { Routes, Route } from "@solidjs/router"
import Today from "../routes/Today";
import Account from "../routes/Account";
import {AuthSession} from "@supabase/supabase-js";
import {supabase} from "../supabase-client";
import Auth from "../routes/login";

function Navbar() {
    const toggle = () => setToggleAddTask(!toggleAddTask())
    const [toggleAddTask, setToggleAddTask] = createSignal(false);
    const { isOpen, onOpen, onClose } = createDisclosure()
    const [session, setSession] = createSignal<AuthSession | null>(null)

    createEffect(() => {
        console.log(JSON.stringify(session))
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    })

    return <>
        <nav class="bg-black">
            <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex h-16 items-center justify-between">
                    <div class="flex items-center">
                        <div class="flex-shrink-0">

                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Show when={session() != undefined && session() != null}>
                                    <A href="/Today"
                                       class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white">Today</A>
                                    <A href="/Upcoming"
                                       class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Upcoming</A>
                                    <A href="/Account"
                                       class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Account</A>
                                    <A href="/Areas"
                                       class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Areas</A>
                                    <A href="/logout"
                                       class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log Out</A>
                                </Show>
                               <Show when={session() == undefined && session() == null}>
                                   <A href="/login"
                                      class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Log In</A>
                               </Show>
                              </div>
                        </div>
                    </div>
                    <Show when={session() != undefined && session() != null}>
                    <AddButton toggleTaskForm={onOpen}></AddButton>
                    </Show>
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