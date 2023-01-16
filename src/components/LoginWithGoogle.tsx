import {Component} from "solid-js";
import {supabase} from "../supabase-client";

const LoginWithGoogle: Component = () => {

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    async function signOutWithGoogle(){
        const { error } = await supabase.auth.signOut()

    }

    return <>
        <button aria-label="Continue with google" role="button" onclick={() => signInWithGoogle()}
                class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10">
            <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg2.svg" alt="google"/>
            <p class="text-base font-medium ml-4 text-gray-700">Continue with Google</p>
        </button>

    </>
}

export default LoginWithGoogle;