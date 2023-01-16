import {createSignal} from "solid-js";
import {supabase} from "../supabase-client";

export function AddTaskForm(props: any) {
    const [newTodo, setNewTodo] = createSignal<Task>();

    const addNewTask = async () => {
        console.log("Todo to insert: " + newTodo())
        const {data, error} = await supabase.from('tasks').insert(newTodo())
        if (error){
            console.log(error)
            throw error
        }
        return;
    }

    return (
        <form>

            <input class={"task-input"}
                onChange={(e) => {
                    let newTask: Task;
                    newTask = {
                        areaId: 1,
                        assignedTo: "",
                        completed: false,
                        description: "description",
                        effort: 1,
                        frequency: 1,
                        frequencyType: "",
                        user_id: 'ce6ce087-f31c-40a2-896a-d8352b1ec577',
                        name: (e.target as HTMLButtonElement).value
                    };
                    setNewTodo(newTask);
                }}
            />
            <button
                type="submit"
                onClick={async (e) => {
                    e.preventDefault();
                    await addNewTask();
                }}
            >
                Add
            </button>
        </form>
    );
}