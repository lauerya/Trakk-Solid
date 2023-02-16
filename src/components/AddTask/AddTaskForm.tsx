import {createEffect, createSignal, For, onMount} from "solid-js";
import {supabase} from "../../supabase-client";
import {User, UserResponse} from "@supabase/supabase-js";
import {createStore} from "solid-js/store";
import {EffortType} from "../../types/main";
import { VsAdd } from 'solid-icons/vs'

import {
    Button, Icon,
    Input,
    Select,
    SelectContent, SelectIcon,
    SelectListbox,
    SelectOption,
    SelectOptionIndicator, SelectOptionText, SelectPlaceholder,
    SelectTrigger, SelectValue
} from "@hope-ui/solid";
import {Area, Profile, Task} from "../../types/main";

export function AddTaskForm(props: any) {
    const [user, setUser] = createSignal<User | null>();
    const [areas, setAreas] = createSignal<Area[] | null>()
    const [users, setUsers] = createSignal<Profile[]>()
    const [errorMessage, setErrorMessage] = createSignal<string>("")
    const [effortTypes, setEffortTypes] = createSignal<EffortType[]>()
    const [taskForm, setTaskForm] = createStore<Task>({
        name: "",
        assignedTo: "",
        effort: 0,
        areaId: 0,
        frequency: 0,
        frequencyType: "",
        description: "",
        user_id: '',
        completed: false
    });

    onMount(async() => {
        await getAreas();
        await getProfiles();

        setEffortTypes([{effortName: "Easy Peasy"}, {effortName: "Shouldn't be too bad"}, {effortName: "This'll be rough"}])
    })
    createEffect(() => console.log(taskForm.name))

    const updateFormField = (fieldName: string) => (event: Event) => {
        let inputElement: HTMLInputElement;
         if (typeof event.currentTarget !== 'undefined') {
             inputElement = event.currentTarget as HTMLInputElement;

             setTaskForm({
                [fieldName]: inputElement.value
            });
        } else {
             setTaskForm({
                 [fieldName]: event
             });
        }

        console.log(taskForm.areaId);
    };
    const addNewTask = async () => {
        if (user()?.id == null) {
            await getUserId();
        }
        setTaskForm({
            name: taskForm.name,
            assignedTo: taskForm.assignedTo,
            effort: taskForm.effort,
            areaId: taskForm.areaId,
            frequency: taskForm.frequency,
            frequencyType: taskForm.frequencyType,
            description: taskForm.description,
            user_id: user()?.id,
            completed: false
        });
        console.log("Todo to insert: " + JSON.stringify(taskForm));

        const {data, error} = await supabase.from('tasks').insert(taskForm)
        if (error) {
            console.log(error)
            throw error
        } else {
            props.closeModal
        }
        return;
    }

    const getAreas = async (): Promise<Area[]> => {
        const {data, error} = await supabase.from('areas').select('*')
        console.log(JSON.stringify(data))
        if (error) {
            console.log(error);
            throw error;
        }

        setAreas(data)
        return data;
    }


    const getProfiles = async (): Promise<Profile[]> => {
        const {data, error} = await supabase.from('profiles').select('*')
        console.log(JSON.stringify(data))
        if (error) {
            setErrorMessage(error.message)
            console.log(error);
            throw error;
        }
        setUsers(data)
        return data;
    }

    async function getUserId() {
        const userData = user();
        if (userData == null) {
            const userResponse: UserResponse = await supabase.auth.getUser();
            if (userResponse != null) {
                console.log(userResponse.data.user);
                setUser(userResponse.data.user);
                return userResponse.data.user?.id;
            }
        } else {
            console.log(userData.email);
            return userData.id;
        }

    }

    return (
<>
             <form onSubmit={() => addNewTask()}>
                    <div>
                        <h3 class="text-lg font-medium leading-6 text-gray-900">What needs to get done?</h3>
                        <p class="mt-1 text-sm text-gray-500">There's nothing too big to tackle
                        </p>
                    </div>
                 <div >
                     {errorMessage()}
                 </div>
                    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label for="task-name" class="block text-sm font-medium text-gray-700">Task</label>
                            <div class="mt-1">
                                <Input value={taskForm.name} onChange={updateFormField("name")} type="text"
                                       name="first-name" id="task-name" autocomplete="task"
                                       class="block w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label for="description" class="block text-sm font-medium text-gray-700">description</label>
                            <div class="mt-1">
                                <Input value={taskForm.description} onChange={updateFormField("description")}
                                       type="text" name="description" id="description" autocomplete="description"
                                       class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="area" class="block text-sm font-medium text-gray-700">Area</label>
                            <div class="mt-1">
                                <Select value={taskForm.areaId} onChange={updateFormField("areaId")}>
                                    <SelectTrigger>
                                        <SelectPlaceholder>Choose an area</SelectPlaceholder>
                                        <SelectValue />
                                        <SelectIcon />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectListbox>
                                            <For each={areas()}>
                                                {item => (
                                                    <SelectOption value={item.id}>
                                                        <SelectOptionText>{item.name}</SelectOptionText>
                                                        <SelectOptionIndicator />
                                                    </SelectOption>
                                                )}
                                            </For>
                                        </SelectListbox>
                                    </SelectContent>
                                </Select>
                                </div>
                        </div>
                            <div class="sm:col-span-3">
                                <label for="effortType" class="block text-sm font-medium text-gray-700">Effort?</label>
                                <div class={"mt-1"}>
                                <Select value={taskForm.effort} onChange={updateFormField("effort")}>
                                    <SelectTrigger>
                                        <SelectPlaceholder>How much effort?</SelectPlaceholder>
                                        <SelectValue />
                                        <SelectIcon />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectListbox>
                                            <For each={effortTypes()}>
                                                {item => (
                                                    <SelectOption value={item.effortName}>
                                                        <SelectOptionText>{item.effortName}</SelectOptionText>
                                                        <SelectOptionIndicator />
                                                    </SelectOption>
                                                )}
                                            </For>
                                        </SelectListbox>
                                    </SelectContent>
                                </Select>
                                </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label for="area" class="block text-sm font-medium text-gray-700">Assigned To</label>
                            <div class="mt-1">
                                <Select value={taskForm.assignedTo} onChange={updateFormField("assignedTo")}>
                                    <SelectTrigger>
                                        <SelectPlaceholder>Choose a User</SelectPlaceholder>
                                        <SelectValue/>
                                        <SelectIcon/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectListbox>
                                            <For each={users()}>
                                                {item => (
                                                    <SelectOption value={item.username}>
                                                        <SelectOptionText>{item.username}</SelectOptionText>
                                                        <SelectOptionIndicator/>
                                                    </SelectOption>
                                                )}
                                            </For>
                                        </SelectListbox>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </form>
    <Button leftIcon={<VsAdd></VsAdd>} type="button" onClick={async (e: Event) => {
        await addNewTask();
    }}
            class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add Task
    </Button>
        </>


    );
}