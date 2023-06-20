import {createSignal, onMount} from "solid-js";
import {Profile} from "../types/main";
import {supabase} from "../supabase-client";

export const [users, setUsers] = createSignal<Profile[]>()

export const getProfiles = async (): Promise<Profile[]> => {
    const {data, error} = await supabase.from('profiles').select('*')
    console.log(JSON.stringify(data))
    if (error) {
        console.log(error);
        throw error;
    }
    setUsers(data)
    return data;
}
onMount(async()=> {
    await getProfiles();
})

