import {useParams} from "@solidjs/router";
import {createResource, For} from "solid-js";
import {supabase} from "../../supabase-client";
import {Task} from "../../types/main";
import TaskComponent from "../TaskComponent";

export default function AreaTaskList(){
    const params = useParams();

    async function fetchAreaTasks() {
        const {data, error} = await supabase
            .from('tasks')
            .select('*')
            .eq('areaId', params.areaId)
        console.log(JSON.stringify(data))
        if (error) {
            console.log(error);
            throw error;
        }
        return data;
    }

    const [areaTasks] = createResource(() => params.areaId, fetchAreaTasks);

    return (
        <>
            <div class="overflow-hidden bg-gray-300 shadow sm:rounded-md">
                <ul role="list" class="divide-y divide-gray-200">

                    <For each={areaTasks()}>
                        {(todo: Task) =>
                            <TaskComponent todo={todo}/>
                        }
                    </For>
                </ul>
            </div>
    </>
    )

}