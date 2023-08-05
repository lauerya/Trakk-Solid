import {createStore} from "solid-js/store";
import {Area, Profile, Task} from "../../types/main";
import {createSignal, onMount, Show} from "solid-js";
import {supabase} from "../../supabase-client";
import {Button} from "@hope-ui/solid";
import {User, UserResponse} from "@supabase/supabase-js";
import {useParams} from "@solidjs/router";
import {VsAdd} from "solid-icons/vs";


export default function AreaEdit(){
    let fileInputRef: any = null;
    const [areaParam, setAreaParam] = createSignal<string>();
    const [errorMessage, setErrorMessage] = createSignal<string>("")
    const [user, setUser] = createSignal<User | null>();
    const [areaForm, setAreaForm] = createStore<Area>({
        name: "",
        description: "",
        created_at: "",
        user_id: "",
        size: 'Small',
        image: '',
        house_id: 1
    }as Area);

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
            setUser(userData)
            return userData.id;
        }
    }

    onMount(async () => {
        setAreaParam(useParams<{ id: string }>().id)
        let { data, error } = await supabase
            .from('areas')
            .select("*")
            .eq('id', areaParam())
        if (data) {
            let area = data[0];
            setAreaForm({
                    name: area.name,
                    description: area.description,
                    created_at: area.created_at,
                    user_id: area.user_id,
                    size: area.size,
                    image: area.image,
                    house_id: area.house_id
                } as Area);

        }
    });

    function validateForm() {
        if (areaForm.name == "") {
            setErrorMessage("Please enter a name for the area.")
            return false;
        }
        if (areaForm.description == "") {
            setErrorMessage("Please enter a description for the area.")
            return false;
        }
        if (areaForm.size == "") {
            setErrorMessage("Please enter a size for the area.")
            return false;
        }
        return true;
    }

    async function addNewArea() {
        var validForm = validateForm();
        if (!validForm) {return};
        var userId = await getUserId();
        var imageUrl = handleImageChange();
        var areaFormToSend = {
            name: areaForm.name,
            description: areaForm.description,
            created_at: areaForm.created_at,
            user_id: userId,
            image: areaForm.image,
            house_id: areaForm.house_id,
        }
        console.log("Area form to send: ", areaFormToSend)
        const {data, error} = await supabase.from('areas').update(areaFormToSend).eq('id', areaForm.id)
        console.log("Data: ", data)
    }

    async function handleImageChange(): Promise<string | undefined> {
        const avatarFile = fileInputRef.files[0]
        if (!avatarFile) {
            return "";
        }
        const fileName = `${areaForm.name}-${areaForm.user_id}-${Date.now().toString(10)}`
        const {data, error} = await supabase
            .storage
            .from('avatars')
            .upload(`${fileName}`, avatarFile, {
                cacheControl: '3600',
                upsert: false
            })
        console.log("Data: ", data)
        setAreaForm({image: `${fileName}`})
    }
    const updateFormField = (fieldName: string) => (event: Event) => {
        let inputElement: HTMLInputElement;
        if (typeof event.currentTarget !== 'undefined') {
            inputElement = event.currentTarget as HTMLInputElement;

            setAreaForm({
                [fieldName]: inputElement.value
            });
        } else {
            setAreaForm({
                [fieldName]: event
            });
        }
    };

    async function updateArea() {
        var validForm = validateForm();
        if (!validForm) {return};
        var userId = await getUserId();
        var imageUrl = handleImageChange();
        var areaFormToSend = {
            name: areaForm.name,
            description: areaForm.description,
            created_at: areaForm.created_at,
            user_id: userId,
            image: areaForm.image,
            house_id: areaForm.house_id,
        }
        console.log("Area form to send: ", areaFormToSend)
        const {data, error} = await supabase.from('areas').update(areaFormToSend).eq('id', areaForm.id)
        console.log("Data: ", data)
    }

    return (
        <>

            <form class="space-y-8 divide-y divide-gray-200 bg-gray-200 p-5">
                <div class="space-y-8 divide-y divide-gray-200">
                    <div>
                        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div class="sm:col-span-4">
                                <label for="areaName" class="block text-sm font-medium text-black">
                                    Area Name
                                </label>
                                <div class="mt-1 flex rounded-md shadow-sm">
                                    <input
                                        onChange={updateFormField("name")}
                                        value={areaForm?.name}
                                        type="text"
                                        name="areaName"
                                        id="areaName"
                                        class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                    />
                                </div>
                            </div>

                            <div class="sm:col-span-6">
                                <label for="description" class="block text-sm font-medium text-black">
                                    Description
                                </label>
                                <div class="mt-1">
                <textarea
                    value={areaForm.description}
                    onChange={updateFormField("description")}
                    id="description"
                    name="description"
                    rows={3}
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                />
                                </div>
                                <p class="mt-2 text-sm text-black">Any information about the area.</p>
                            </div>

                            <input
                                value={areaForm.image}
                                type="file"
                                hidden
                                ref={fileInputRef}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Button
                                onClick={() => fileInputRef.click()}

                            >
                                Select Image
                            </Button>
                            <Show when={fileInputRef?.files[0] != null}>
                                {fileInputRef.files[0]}
                                <img src={fileInputRef.files[0]} alt="area image" />
                            </Show>
                        </div>
                    </div>

                    <div class="pt-8">
                        <div>
                            <h3 class="text-lg font-medium leading-6 text-gray-900">More Area Information</h3>
                        </div>
                        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                            <div class="sm:col-span-3">
                                <label for="size" class="block text-sm font-medium text-black">
                                    Area Size
                                </label>
                                <div class="mt-1">
                                    <select
                                        id="size"
                                        name="size"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                                        onChange={updateFormField("size")}
                                    >
                                        <option>Small</option>
                                        <option>Medium</option>
                                        <option>Large</option>
                                    </select>
                                </div>
                            </div>
                            <Show when={areaParam() != null}>
                                <Button leftIcon={<VsAdd></VsAdd>} type="button" onClick={async (e: Event) => {
                                    await updateArea();
                                }}
                                        class="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

                                    Update Task
                                </Button>
                            </Show>
                            <Show when={areaParam() == null}>

                            <Button  class="button btn btn-primary bg-blue-500" onClick={() => addNewArea()}>Create New
                                Area
                            </Button>
                            </Show>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}