import {supabase} from "../supabase-client";
import {Show} from "solid-js";

export default function TaskComponent(props: any) {

    function getAreaId(areaId: number){
        switch (areaId) {
            case 1:
                return "Kitchen"
            default:
                return areaId
        }
    }

    function getEffort(effortId: string){
        switch (effortId) {
            case "0":
                return "Easy Peasy"
            case "1":
                return "Easy"
            case "2":
                return "Difficult"
            default:
                return effortId
        }
    }
    async function deleteTodo(id: number) {
        const result = await supabase.from("tasks").delete().match({'id': id});
    }

    return <>
        <li>
            <a href="#" class="block hover:bg-gray-50">
                <div class="px-4 py-4 sm:px-6">
                    <button class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800" onClick={() => deleteTodo(props.todo.id)}>X</button>
                    <div class="flex items-center justify-between">
                        <p class="truncate text-sm font-medium text-indigo-600">{props.todo.name}</p>
                        <div class="ml-2 flex flex-shrink-0">
                            <p class="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {() => getEffort(props.todo.effort)}
                            </p>
                        </div>
                    </div>
                    <div class="mt-2 sm:flex sm:justify-between">
                        <div class="sm:flex">
                            <p class="flex items-center text-sm text-gray-500">
                                {props.todo.description}
                            </p>
                            <p class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                {getAreaId(props.todo.areaId )}
                            </p>
                        </div>
                        <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Show when={props.todo.dueDate != null} fallback={<p>No Due Date</p>}>
                                <p>
                                    Due on <time
                                    dateTime={props.todo.dueDate}>{props.todo.dueDate}</time>
                                </p>
                            </Show>

                        </div>
                    </div>
                </div>
            </a>
        </li>
    </>
}
