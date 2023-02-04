import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './supabase-client'
import { AuthSession } from '@supabase/supabase-js'
import Login from './routes/login'
import TaskList from './components/TaskList'
import Navbar from "./components/Navbar";
import Today from "./routes/Today";
import {HopeProvider} from "@hope-ui/solid";
import {Routes, Route, Router, Navigate, useNavigate} from "@solidjs/router"
import Account from "./routes/Account";
import Areas from "./routes/Areas";

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null)
    const navigate = useNavigate()

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

    async function logout() {
        var result = await supabase.auth.signOut();
        navigate("/login", { replace: true })

        if (result.error){

        }else {
            navigate("/login", { replace: true })
        }


    }
  return (
          <HopeProvider>
          <Navbar/>
              <div class="container" style={{padding: '50px 0 100px 0'}}>
                  {!session() ? <Navigate href={"/login"}/> : <Navigate href={"/Today"}/>}
              <Routes>
                  <Route path={"/Today"} component={Today}></Route>
                  <Route path={"/login"} component={Login}></Route>
                  <Route path={"/Areas"} component={Areas}></Route>
                  <Route path={"/logout"} data={logout}></Route>

              </Routes>
              </div>

          </HopeProvider>
  )
}

export default App