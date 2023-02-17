import {Component} from "solid-js";
import {supabase} from "../supabase-client";
import Auth from "../routes/login";

const LoginWithGoogle: Component = () => {

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: getURL()
            }
        })
    }
    const getURL = () => {
        console.log(import.meta.url)
        console.log(import.meta.env.BASE_URL)
        console.log(JSON.stringify(import.meta.env))

        let url =
            import.meta.url ?? // Set this to your site URL in production env.
            import.meta.env.BASE_URL ?? // Automatically set by Vercel.
            'http://localhost:3000/';
        // Make sure to include `https://` when not localhost.
        url = url.includes('http') ? url : `https://${url}`;
        // Make sure to including trailing `/`.
        url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
        return url;
    };
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