import {Task} from "~/types/main";
import {supabase} from "~/supabase-client";
import {createSignal} from "solid-js";
const [taskList, setTaskList] = createSignal<Task[] | null>(null)

const getTaskList = async (): Promise<Task[]> => {
    const {data, error} = await supabase.from('tasks').select("*").
    if (error){
        console.log(error)
        throw error
    }
    setTaskList(data);
    return data
}
