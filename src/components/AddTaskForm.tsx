import {createEffect, createSignal} from "solid-js";
import {supabase} from "../supabase-client";
import {User, UserResponse} from "@supabase/supabase-js";
import {createStore} from "solid-js/store";

export function AddTaskForm(props: any) {
    const [user, setUser] = createSignal<User | null>();


    const [taskForm, setTaskForm] = createStore<Task>({
        name: "",
        assignedTo: "",
        effort: 0,
        areaId: 0,
        frequency: 0,
        frequencyType: "",
        description: "",
        user_id: 'ce6ce087-f31c-40a2-896a-d8352b1ec577',
        completed: false
    });

    createEffect(() => console.log(taskForm.name))

    const updateFormField = (fieldName: string) => (event: Event) => {
        const inputElement = event.currentTarget as HTMLInputElement;
        setTaskForm({
            [fieldName]: inputElement.value
        });
    };
    const addNewTask = async () => {
        if (user()?.id == null) {
            await getUserId();
        }
        console.log("Todo to insert: " + taskForm)
        const {data, error} = await supabase.from('tasks').insert(taskForm)
        if (error) {
            console.log(error)
            throw error
        }
        return;
    }

    async function getUserId() {
        const userData = user();
        if (userData == null) {
            const userResponse: UserResponse = await supabase.auth.getUser();
            if (userResponse != null) {
                console.log(userResponse.data.user)
                setUser(userResponse.data.user);
                return userResponse.data.user?.id
            }
        } else {
            console.log(userData.email)
            return userData.id
        }

    }

    return (
        <div class="overflow-hidden rounded-lg bg-gray-300 shadow w-1/2">
            <div class="px-4 py-5 sm:p-6">
                <form onSubmit={() => addNewTask()}>
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">What needs to get done?</h3>
                        <p class="mt-1 text-sm text-gray-500">There's nothing too big to tackle</p>
                    </div>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="task-name" class="block text-sm font-medium text-gray-700">Task</label>
                            <div class="mt-1">
                                <input value={taskForm.name} onChange={updateFormField("name")} type="text"
                                       name="first-name" id="task-name" autocomplete="task"
                                       class="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="description" class="block text-sm font-medium text-gray-700">description</label>
                            <div class="mt-1">
                                <input value={taskForm.description} onChange={updateFormField("description")}
                                       type="text" name="description" id="description" autocomplete="description"
                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="area" class="block text-sm font-medium text-gray-700">Area ID</label>
                            <div class="mt-1">
                                <input value={taskForm.areaId} onChange={updateFormField("areaId")} type="text"
                                       name="area" id="area"
                                       class="block w-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="area" class="block text-sm font-medium text-gray-700">Assigned To</label>
                            <div class="mt-1">
                                <input value={taskForm.assignedTo} onChange={updateFormField("assignedTo")} type="text"
                                       name="area" id="area"
                                       class="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                    </div>
                    <button type="button" onClick={async (e) => {
                        e.preventDefault();
                        await addNewTask();
                    }}
                            class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Add Task

                    </button>

                </form>
            </div>
        </div>

    );
}