import { Accessor, Setter, createContext, useContext, createSignal } from "solid-js";
import {AuthSession} from "@supabase/supabase-js";
import {Area} from "./types/main";
import {supabase} from "./supabase-client";

interface ContextProps {
    session: Accessor<AuthSession | undefined>,
    setSession: Setter<AuthSession>,
    areas: Accessor<Area[] | undefined>,
    setAreas: Setter<Area[]>
}

const GlobalContext = createContext<ContextProps>();

export function GlobalContextProvider(props: any) {
    const [session, setSession] = createSignal<AuthSession>()
    const [areas, setAreas] = createSignal<Area[]>()


    return (
        <GlobalContext.Provider value={{ session, setSession, areas, setAreas }}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export const useGlobalContext = () => useContext(GlobalContext)!;