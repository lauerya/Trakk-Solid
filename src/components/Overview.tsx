import Weather from "./Weather";
import {useGlobalContext} from "../state";
import {A} from "@solidjs/router";
import {For, onMount, Show} from "solid-js";
import {supabase} from "~/supabase-client";
import {Area, Task} from "~/types/main";

export default function Overview(props: any){
    const {tasks, setTasks, areas, setAreas} = useGlobalContext()

    onMount(() => {
        if (areas()?.length == 0) {supabase.from('areas').select('*').then(({data}) => setAreas(data as Area[]))}
        if (tasks()?.length == 0) {supabase.from('tasks').select('*').then(({data}) => setTasks(data as Task[]))}

    })
    return (
        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style="padding: 2em">
                <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:grid-cols-3">
                    {/* Card */}
                    <A href={"/Upcoming"} class="overflow-hidden rounded-lg bg-gray-300 shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <Show when={props.type=="Upcoming"}>
                                            <dt class="truncate text-sm font-medium text-gray-500">Upcoming Tasks</dt>
                                        </Show>
                                        <Show when={props.type=="Today"}>
                                            <dt class="truncate text-sm font-medium text-gray-500">Tasks for today</dt>
                                        </Show>
                                        <dd>
                                            <div
                                                class="text-lg font-medium text-gray-900">{tasks()?.length}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </A>
                    <A href={"/AreaTasks"} class="overflow-hidden rounded-lg bg-gray-300 shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="truncate text-sm font-medium text-black">Areas</div>
                                <div class="ml-5 w-0 flex-1 text-black">
                                    <For each={areas()}>{(area, i) =>
                                        <div class={"rounded-md m-2"}>
                                            <a class={"text-black"} target="_blank" href={`/areas/${area.id}`}>
                                                {area.name}
                                            </a>
                                        </div>
                                    }</For>
                                </div>
                                <div class="flex-shrink-0">
                                </div>

                            </div>
                        </div>
                    </A>
                    <A href={"/AreaTasks"} class="overflow-hidden rounded-lg bg-gray-300 shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <Weather></Weather>
                                </div>
                            </div>
                        </div>
                    </A>
                </div>
            </div>
        </div>
    )
}