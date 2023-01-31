import {createSignal, onMount, Show} from "solid-js";
import TaskList from "../components/TaskList";
import AddButton from "../components/AddTask/AddButton";
import {AddTaskForm} from "../components/AddTask/AddTaskForm";
import {AddTaskModal} from "../components/AddTask/AddTaskModal";

export default function Today() {
    const [toggleAddTask, setToggleAddTask] = createSignal(false);
    const toggle = () => setToggleAddTask(!toggleAddTask())

    onMount(() => {

    })

    return (
        <>
            <div>
                <TaskList></TaskList>
                    <Show when={toggleAddTask()}>
                        <AddTaskModal openModal={toggleAddTask()} closeModal={toggleAddTask()}/>
                    </Show>
                    <AddButton toggleTaskForm={() => toggle()}></AddButton>
            </div>
        </>
    )
}