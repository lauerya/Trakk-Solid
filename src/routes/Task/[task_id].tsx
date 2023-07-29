import {Task} from "~/types/main";
import {supabase} from "~/supabase-client";
import {createSignal, For, onMount, Show} from "solid-js";
import {useParams} from "@solidjs/router";
import TaskComponent from "~/components/TaskComponent";
const [task, setTask] = createSignal<Task[]>([])

function TaskDetail(){
    const getTask = async (): Promise<Task[]> => {
        const params = useParams<{ id: string }>();
        const {data, error} = await supabase.from('tasks').select("*").eq("id", params.id);
        if (error){
            console.log(error)
            throw error
        }
        setTask(data);
        return data
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
                  <TaskComponent todo={task()} refreshTaskList={() => refreshTask()} />
            </div>
        </div>
        </div>
    </>
}
export default TaskDetail;