import Weather from "./Weather";
import {useGlobalContext} from "../state";
import {A} from "@solidjs/router";
import {For} from "solid-js";

export default function Overview(){
    const {tasks, areas} = useGlobalContext()

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
                                        <dt class="truncate text-sm font-medium text-gray-500">Tasks for today</dt>
                                        <dd>
                                            <div
                                                class="text-lg font-medium text-gray-900">{tasks()?.length}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </A>
                    <A href={"/Areas"} class="overflow-hidden rounded-lg bg-gray-300 shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="truncate text-sm font-medium text-gray-500">Areas</div>
                                <div class="ml-5 w-0 flex-1">
                                    <For each={areas()}>{(area, i) =>
                                        <div class={"border-2 rounded-md m-2 bg-gray-50"}>
                                            <a target="_blank" href={`/areas/${area.id}`}>
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
                    <A href={"/Areas"} class="overflow-hidden rounded-lg bg-gray-300 shadow">
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