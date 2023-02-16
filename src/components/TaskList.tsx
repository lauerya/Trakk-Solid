import {createEffect, createSignal, For} from "solid-js";
import {supabase} from "../supabase-client";
import TaskComponent from "./TaskComponent";
import AddButton from "./AddTask/AddButton";
import {Task} from "../types/main";

function TaskList() {
    const [loading, setLoading] = createSignal(true)
    const [taskList, setTaskList] = createSignal<Task[] | null>(null)

    createEffect(() => {
        getTaskList().then(r => console.log("Task List Fetching Done"))
    })

createEffect(() => {
    console.log("Task List Count: "+ taskList()?.length)
})
    const updateTask = async (e: Event) => {
        e.preventDefault()
        try {
            setLoading(true)
            const updates = { taskList }
            let { error } = await supabase.from('task').update(updates)
            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const getTaskList = async (): Promise<Task[]> => {
        const {data, error} = await supabase.from('tasks').select()
        if (error){
            console.log(error)
            throw error
        }
        setTaskList(data);
        return data
    }

    return <>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-3xl">
        <div class="overflow-hidden bg-gray-300 shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">

                <For each={taskList()}>
                    {(todo: Task) =>
                        <TaskComponent todo={todo} setTodos={setTaskList} />
                    }
                </For>
            </ul>
        </div>
            </div>
        </div>
    </>
}

export default TaskList;