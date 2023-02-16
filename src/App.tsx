import { Component, createEffect, createSignal } from 'solid-js'
import { supabase } from './supabase-client'
import Login from './routes/login'
import Navbar from "./components/Navbar";
import Today from "./routes/Today";
import {HopeProvider} from "@hope-ui/solid";
import {Routes, Route, Router, Navigate, useNavigate} from "@solidjs/router"
import Areas from "./routes/Areas";
import Account from "./routes/Account";
import {useGlobalContext} from "./state";
import AreaTaskList from "./components/AreaTaskList";
import AreaEdit from "./components/AreaEdit";

const App: Component = () => {
    const {session, setSession } = useGlobalContext();

    const navigate = useNavigate()

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
              <Routes>
                  <Route path={"/Today"} component={Today}></Route>
                  <Route path={"/Areas/:areaId"} component={AreaTaskList}></Route>
                  <Route path={"/AreaEdit/:areaId"} component={AreaEdit}></Route>

                  <Route path={"/login"} component={Login}></Route>
                  <Route path={"/Areas"} component={Areas}></Route>
                  <Route path={"/logout"} data={logout}></Route>
                  <Route path={"/Account"} component={Account}/>

              </Routes>
              </div>

          </HopeProvider>
  )
}

export default App