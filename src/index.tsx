/* @refresh reload */
import { render } from 'solid-js/web';
import {Router} from "@solidjs/router"
import './index.css';
import App from './App';
import {GlobalContextProvider} from "./state";

render(() =>
    (<Router>
        <GlobalContextProvider>
        <App />
        </GlobalContextProvider>
</Router>), document.getElementById('root') as HTMLElement);
