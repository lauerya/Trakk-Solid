import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './supabase-client'
import { AuthSession } from '@supabase/supabase-js'
import Account from './components/Account'
import Login from './components/login'
import LoginWithGoogle from './components/LoginWithGoogle'
import TaskList from './components/TaskList'

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
      <div class="container" style={{ padding: '50px 0 100px 0' }}>
        {!session() ? <Login /> : <TaskList />}
      </div>
  )
}

export default App