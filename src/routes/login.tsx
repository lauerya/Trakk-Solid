import { createSignal } from 'solid-js'
import { supabase } from '../supabase-client'
import LoginWithGoogle from "../components/LoginWithGoogle";
import {A} from "@solidjs/router";

export default function Auth() {
    const [loading, setLoading] = createSignal(false)
    const [email, setEmail] = createSignal('')

    const handleOtpLogin = async (e: SubmitEvent) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { error } = await supabase.auth.signInWithOtp({ email: email() })
            if (error) throw error
            alert('Check your email for the login link!')
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
                <form class="form-widget" onSubmit={handleOtpLogin}>
                  <div class="h-full bg-slate-800 w-full py-16 px-4">
                <div class="flex flex-col items-center justify-center">
                    <img src="src/routes/login" alt="logo"/> {/*TODO: Add Logo*/}
                        <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                            <p tabIndex="0"
                               class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login to
                                Trakk</p>
                            <p tabIndex="0"
                               class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500">Don't
                                have account? <A href="javascript:void(0)"
                                                 class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"> Sign
                                    up here</A></p>
                            <LoginWithGoogle></LoginWithGoogle>

                            <div class="w-full flex items-center justify-between py-5">
                                <hr class="w-full bg-gray-400"/>
                                    <p class="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
                                    <hr class="w-full bg-gray-400  "/>
                            </div>
                            <div>
                                <label id="email" class="text-sm font-medium leading-none text-gray-800">
                                    Email
                                </label>
                                <input aria-labelledby="email" type="email"
                                       class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            </div>
                            <div class="mt-6  w-full">
                                <label  class="text-sm font-medium leading-none text-gray-800">
                                    Password
                                </label>
                                <div class="relative flex items-center justify-center">
                                    <input id="pass" type="password"
                                           class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                                    <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg"
                                             alt="viewport"/>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8">
                                <button role="button"
                                        class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Create
                                    my account
                                </button>
                            </div>
                        </div>
                </div>
            </div>
                </form>

</>
    )
}