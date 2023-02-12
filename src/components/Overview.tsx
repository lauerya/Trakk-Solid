import Weather from "./Weather";

export default function Overview(){
    const cards = [
        { name: 'Tasks due Today', href: '#', icon: '', amount: '5' },

        // More items...
    ]
    return (
        <div class="mt-8">
            <div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" style="padding: 2em">
                <h2 class="text-lg font-medium leading-6 text-gray-900">Overview</h2>
                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card */}
                    {cards.map((card) => (
                        <div class="overflow-hidden rounded-lg bg-white shadow">
                            <div class="p-5">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                    </div>
                                    <div class="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt class="truncate text-sm font-medium text-gray-500">{card.name}</dt>
                                            <dd>
                                                <div
                                                    class="text-lg font-medium text-gray-900">{card.amount}</div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-gray-50 px-5 py-3">
                                <div class="text-sm">
                                    <a href={card.href} class="font-medium text-cyan-700 hover:text-cyan-900">
                                        View all
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <Weather></Weather>
                                </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-5 py-3">
                            <div class="text-sm">
                                <a class="font-medium text-cyan-700 hover:text-cyan-900">
                                    View Weather Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}