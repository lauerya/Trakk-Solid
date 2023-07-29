import {Task} from "~/types/main";
import {supabase} from "~/supabase-client";
import {createSignal, For, onMount, Show} from "solid-js";
import {useParams} from "@solidjs/router";
import TaskComponent from "~/components/TaskComponent";
import {AddTaskModal} from "~/components/AddTask/AddTaskModal";
import {AddTaskForm} from "~/components/AddTask/AddTaskForm";
const [taskList, setTaskList] = createSignal<Task[]>([])

function AreaTaskList(){
    const getTaskList = async (): Promise<Task[]> => {
        const params = useParams<{ id: string }>();
        const {data, error} = await supabase.from('tasks').select("*").eq("areaId", params.id);
        if (error){
            console.log(error)
            throw error
        }
        setTaskList(data);
        return data
    }

    onMount(() => {
        getTaskList().then(() => console.log(`tasks fetched: ${JSON.stringify(taskList())}`))
    })
    const refreshTaskList = () => {
        getTaskList().then(r => console.log("task list refreshed"));

    }

    return <>
        <h1>{}</h1>
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="mx-auto max-w-md">
                <div class="overflow-hidden bg-gray-300 shadow sm:rounded-md">
                    <ul role="list" class="divide-y divide-gray-200">
                        <Show when={taskList()?.length > 0} fallback={<div class={"text-black"}>There's no tasks for this area!<AddTaskForm></AddTaskForm></div>}>
                            <For each={taskList()}>
                                {(todo: Task) =>
                                    <TaskComponent todo={todo} refreshTaskList={() => refreshTaskList()} />
                                }
                            </For>
                        </Show>

                    </ul>
                </div>
            </div>
        </div>
    </>
}
export default AreaTaskList;