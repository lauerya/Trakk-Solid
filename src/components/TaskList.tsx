import {createEffect, createSignal, For} from "solid-js";
import {supabase} from "../supabase-client";
import TaskComponent from "./TaskComponent";
import {Task} from "../types/main";
import {useGlobalContext} from "../state";


function TaskList(props: any) {
    const [loading, setLoading] = createSignal(true)
    const [taskList, setTaskList] = createSignal<Task[] | null>(null)
    const {tasks, setTasks} = useGlobalContext();

    createEffect(() => {
        getTaskList().then(r => console.log("Task List Fetching Done"))
    })

createEffect(() => {
    console.log("Task List Count: "+ tasks()?.length)
})
    const updateTask = async (e: Event) => {
        e.preventDefault()
        try {
            setLoading(true)
            const updates = { tasks }
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

    const refreshTaskList = () => {
        getTaskList().then(r => console.log("task list refreshed"));

    }
    const getTaskList = async (): Promise<Task[]> => {
        if (props.filter == "Upcoming") {
            let { data: tasks, error } = await supabase
                .from('tasks')
                .select("*")
                .gt('dueDate', new Date().toISOString())
                .lt('dueDate', new Date(new Date().setDate(new Date().getDate() + 7)).toISOString())
            if (error){
                console.log(error)
                throw error
            }
            setTasks(tasks as Task[]);
            return tasks as Task[]
        }
        const {data, error} = await supabase.from('tasks').select()
        if (error){
            console.log(error)
            throw error
        }
        setTasks(data);
        return data
    }

    return <>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md">
        <div class="overflow-hidden bg-gray-300 shadow sm:rounded-md">
            <ul role="list" class="divide-y divide-gray-200">

                <For each={tasks()}>
                    {(todo: Task) =>
                        <TaskComponent todo={todo} refreshTaskList={() => refreshTaskList()} />
                    }
                </For>
            </ul>
        </div>
            </div>
        </div>
    </>
}

export default TaskList;