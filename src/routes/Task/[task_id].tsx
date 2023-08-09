import {Task} from "~/types/main";
import {supabase} from "~/supabase-client";
import {createSignal, For, onMount, Show} from "solid-js";
import {useParams} from "@solidjs/router";
import {AddTaskForm} from "~/components/AddTask/AddTaskForm";
const [task, setTask] = createSignal<Task>()

export default function TaskDetail() {
    async function getTask() {
        const params = useParams<{ task_id: string }>();
        const {data, error} = await supabase
            .from('tasks')
            .select('*')
            .eq('id', params.task_id)

        if (error) {
            console.log(error)
            throw error
        }
        console.log("Task Grabbed" + JSON.stringify(data));
        setTask(data[0] as Task);
    }

    onMount(() => {
        getTask().then(() => console.log(`tasks fetched: ${JSON.stringify(task())}`))
    })
    const refreshTask = () => {
        getTask().then(r => console.log("task list refreshed"));

    }

    return <>
        <h1>{}</h1>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md">
                <div class="overflow-hidden bg-gray-300 shadow sm:rounded-md">
                  <AddTaskForm task={task()}/>
            </div>
        </div>
        </div>
    </>
}