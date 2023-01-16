import {batch, Component, createEffect, createSignal, For, Index} from "solid-js";
import {supabase} from "../supabase-client";
import TaskComponent from "./TaskComponent";
import {AddTaskForm} from "./AddTaskForm";

interface ITaskList {
    taskList: Task[];
}
function TaskList() {
    const [loading, setLoading] = createSignal(true)
    const [taskList, setTaskList] = createSignal<Task[] | null>(null)

    createEffect(() => {
        getTaskList().then(r => console.log("Task List Fetching Done"))
    })

createEffect(() => {
    console.log(JSON.stringify(taskList))
})
    const updateTask = async (e: Event) => {
        e.preventDefault()

        try {
            setLoading(true)
            const updates = {
                taskList
            }

            let { error } = await supabase.from('task').update(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    const getTaskList = async (): Promise<Task[]> => {
        const {data, error} = await supabase.from('tasks').select()
        if (error){
            console.log(error)
            throw error
        }
        setTaskList(data);
        return data
    }


    return <>
        <For each={taskList()}>
            {(todo) =>
                <div class={"list-disc list-outside "}>
                    <TaskComponent todo={todo} setTodos={setTaskList} />
                </div>
            }
        </For>

        <AddTaskForm setTodos={setTaskList} />
    </>
}

export default TaskList;