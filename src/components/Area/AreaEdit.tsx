import {useParams} from "@solidjs/router";
import {createResource, For, Resource} from "solid-js";
import {supabase} from "~/supabase-client";
import {Area} from "~/types/main";

export default function AreaEdit() {
    const params = useParams();

    async function fetchAreaInfo() {
        const {data, error} = await supabase
            .from('areas')
            .select('*')
            .eq('id', params.areaId)
        console.log(JSON.stringify(data))
        if (error) {
            console.log(error);
            throw error;
        }
        return data;
    }

    async function uploadFile(){
        const avatarFile = event.target.files[0]
        const { data, error } = await supabase
            .storage
            .from('avatars')
            .upload('public/avatar1.png', avatarFile, {
                cacheControl: '3600',
                upsert: false
            })
    }

    let areaInfo: Resource<Area[]>;
    [areaInfo] = createResource(() => params.areaId, fetchAreaInfo);

    return (
        <div class="overflow-hidden bg-white shadow sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Area Information</h3>
            </div>
            <For each={areaInfo()}>{(area: Area) =>
                <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <div class="text-sm font-medium text-gray-500">Area Name</div>
                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{area.name}</div>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <div class="text-sm font-medium text-gray-500">Area description</div>
                            <div
                                class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{area.description}</div>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <div class="text-sm font-medium text-gray-500">Created At</div>
                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{area.created_at}</div>
                        </div>
                        <div class="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                            <div class="text-sm font-medium text-gray-500">Area Attachments</div>
                            <div class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
                                    <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div class="flex w-0 flex-1 items-center">
                                            <span class="ml-2 w-0 flex-1 truncate">repair_12-30-2021.pdf</span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a href="src/components/Area/AreaEdit#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                    <li class="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                        <div class="flex w-0 flex-1 items-center">
                                            <span class="ml-2 w-0 flex-1 truncate">inspection.pdf</span>
                                        </div>
                                        <div class="ml-4 flex-shrink-0">
                                            <a href="src/components/Area/AreaEdit#" class="font-medium text-indigo-600 hover:text-indigo-500">
                                                Download
                                            </a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </dl>
                </div>

            }


            </For>

        </div>
    )
}
