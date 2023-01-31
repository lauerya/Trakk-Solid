import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './supabase-client'
import { AuthSession } from '@supabase/supabase-js'
import Login from './routes/login'
import TaskList from './components/TaskList'
import Navbar from "./components/Navbar";
import { Router } from '@solidjs/router'
import Today from "./routes/Today";
import {HopeProvider} from "@hope-ui/solid";

const App: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null)

  createEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  })

  return (
      <Router>
          <HopeProvider>
          <Navbar/>
              <div class="container" style={{padding: '50px 0 100px 0'}}>
                  {!session() ? <Login/> : <Today/>}
              </div>
              </HopeProvider>
      </Router>
  )
}

export default App