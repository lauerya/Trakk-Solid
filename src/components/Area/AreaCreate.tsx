import {createStore} from "solid-js/store";
import {Area, Profile, Task} from "../../types/main";
import {createSignal, onMount} from "solid-js";
import {supabase} from "../../supabase-client";
import {users, setUsers} from "../../services/UserService";
export default function AreaCreate(){
  const [errorMessage, setErrorMessage] = createSignal<string>("")
  const [areaForm, setAreaForm] = createStore<Area>({
    name: "",
    description: "",
    user_id: '',
    image: '',
    house_id: 0,
  });


  function addNewArea() {

  }

  const updateFormField = (fieldName: string) => (event: Event) => {
    let inputElement: HTMLInputElement;
    if (typeof event.currentTarget !== 'undefined') {
      inputElement = event.currentTarget as HTMLInputElement;

      setAreaForm({
        [fieldName]: inputElement.value
      });
    } else {
      setAreaForm({
        [fieldName]: event
      });
    }

    console.log(areaForm.name);
  };
  return (
    <>

      <form onSubmit={() => addNewArea()} class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="areaName" class="block text-sm font-medium text-gray-700">
                  Area Name
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                      onChange={updateFormField("name")}
                      type="text"
                      name="areaName"
                      id="areaName"
                      class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="description" class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <div class="mt-1">
                <textarea
                    onChange={updateFormField("description")}
                    id="description"
                    name="description"
                    rows={3}
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                </div>
                <p class="mt-2 text-sm text-gray-500">Any information about the area.</p>
              </div>

              <div class="sm:col-span-6">
                <label for="photo" class="block text-sm font-medium text-gray-700">
                  Area Image
                </label>
                <div class="mt-1 flex items-center">
                <span class="h-100 w-100 overflow-hidden rounded-md bg-gray-100">
 <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      width="100" height="100"
      viewBox="0 0 50 50">
<path d="M 0 5 L 0 45 L 50 45 L 50 5 Z M 2 7 L 48 7 L 48 33 L 37.320313 33 L 30.320313 28 L 24.414063 28 L 20.328125 23.914063 L 15.460938 24.890625 L 11.15625 18.429688 L 2 27.585938 Z M 37.5 13 C 35.027344 13 33 15.027344 33 17.5 C 33 19.972656 35.027344 22 37.5 22 C 39.972656 22 42 19.972656 42 17.5 C 42 15.027344 39.972656 13 37.5 13 Z M 37.5 15 C 38.890625 15 40 16.109375 40 17.5 C 40 18.890625 38.890625 20 37.5 20 C 36.109375 20 35 18.890625 35 17.5 C 35 16.109375 36.109375 15 37.5 15 Z M 10.84375 21.570313 L 14.539063 27.109375 L 19.671875 26.085938 L 23.585938 30 L 29.679688 30 L 36.679688 35 L 48 35 L 48 43 L 2 43 L 2 30.414063 Z"></path>
</svg>
                </span>
                  <button
                      type="button"
                      class="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-8">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">More Area Information</h3>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

              <div class="sm:col-span-3">
                <label for="country" class="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <div class="mt-1">
                  <select
                      id="country"
                      name="country"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>Mexico</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        </div>
      </form>
        </>
     )
}