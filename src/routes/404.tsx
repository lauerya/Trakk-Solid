import {A} from "@solidjs/router";

export default function NotFound(){
    return (
        <div class="flex min-h-full flex-col bg-white pt-16 pb-12">
            <main class="mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-6 lg:px-8">
                <div class="flex flex-shrink-0 justify-center">
                    <A href="/" class="inline-flex">
                        <span class="sr-only">Your Company</span>
                        <img class="h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    </A>
                </div>
                <div class="py-16">
                    <div class="text-center">
                        <p class="text-base font-semibold text-indigo-600">404</p>
                        <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found.</h1>
                        <p class="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div class="mt-6">
                            <a href="#" class="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                Go back home
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="mx-auto w-full max-w-7xl flex-shrink-0 px-6 lg:px-8">
                <nav class="flex justify-center space-x-4">
                    <A href="/Today" class="text-sm font-medium text-gray-500 hover:text-gray-600">Go to Today View</A>
                    <span class="inline-block border-l border-gray-300" aria-hidden="true"></span>
                </nav>
            </footer>
        </div>

)
}