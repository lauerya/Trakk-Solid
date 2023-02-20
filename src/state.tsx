import {Accessor, Setter, createContext, useContext, createSignal} from "solid-js";
import {AuthSession} from "@supabase/supabase-js";
import {Area, Task} from "./types/main";
import {supabase} from "./supabase-client";

interface ContextProps {
    session: Accessor<AuthSession | undefined>,
    setSession: Setter<AuthSession>,
    areas: Accessor<Area[] | undefined>,
    setAreas: Setter<Area[]>
    tasks: Accessor<Task[] | undefined>,
    setTasks: Setter<Task[]>
}

const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props: any) {
    const [session, setSession] = createSignal<AuthSession>()
    const [areas, setAreas] = createSignal<Area[]>()
    const [tasks, setTasks] = createSignal<Task[]>()

    return (
        <GlobalContext.Provider value={{ session, setSession, areas, setAreas, tasks, setTasks }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext)!;