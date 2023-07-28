import {createStore} from "solid-js/store";
import {Area, Profile, Task} from "../../types/main";
import {createSignal, onMount, Show} from "solid-js";
import {supabase} from "../../supabase-client";
import {Button} from "@hope-ui/solid";
import {User, UserResponse} from "@supabase/supabase-js";
export default function AreaCreate(){
  let fileInputRef: any = null;
  const [errorMessage, setErrorMessage] = createSignal<string>("")
  const [user, setUser] = createSignal<User | null>();
  const [areaForm, setAreaForm] = createStore<Area>({
    name: "",
    description: "",
    created_at: "",
    user_id: '',
    size: '',
    image: '',
    house_id: 1 //TODO GEt house id from user's house
  });

  const getUserId = async (): Promise<any> => {
    const userData = user();
    if (userData == null) {
      const userResponse: UserResponse = await supabase.auth.getUser();
      if (userResponse != null) {
        console.log(userResponse.data.user);
        setUser(userResponse.data.user);
        return userResponse.data.user?.id;
      }
    } else {
      console.log(userData.email);
      setUser(userData)
      return userData.id;
    }
  };

  async function addNewArea() {
    var userId = await getUserId();
    handleImageChange();
    var areaFormToSend = {
      name: areaForm.name,
      description: areaForm.description,
        created_at: new Date().toISOString(),
        user_id: userId,
        image: areaForm.image,
        house_id: areaForm.house_id,
    }
    const {data, error} = await supabase.from('areas').insert(areaFormToSend).select()

  }

  function handleImageChange(){
    const avatarFile = fileInputRef.files[0]
    const fileName = `${areaForm.name}-${areaForm.user_id}-${Date.now().toString(10)}`
    const { data, error } = supabase
        .storage
        .from('avatars')
        .upload(`public/${fileName}`, avatarFile, {
          cacheControl: '3600',
          upsert: false
        })

    setAreaForm({image: `public/${fileName}`})
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

    console.log(areaForm);
  };
  return (
    <>

      <form class="space-y-8 divide-y divide-gray-200 bg-gray-200 p-5">
        <div class="space-y-8 divide-y divide-gray-200">
          <div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label for="areaName" class="block text-sm font-medium text-black">
                  Area Name
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                      onChange={updateFormField("name")}
                      type="text"
                      name="areaName"
                      id="areaName"
                      class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div class="sm:col-span-6">
                <label for="description" class="block text-sm font-medium text-black">
                  Description
                </label>
                <div class="mt-1">
                <textarea
                    onChange={updateFormField("description")}
                    id="description"
                    name="description"
                    rows={3}
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                />
                </div>
                <p class="mt-2 text-sm text-black">Any information about the area.</p>
              </div>

              <input
                  type="file"
                  hidden
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageChange}
              />
              <Button
                  onClick={() => fileInputRef.click()}

              >
                Select Image
              </Button>
              <Show when={fileInputRef?.files[0] != null}>
                {fileInputRef.files[0]}
                <img src={fileInputRef.files[0]} alt="area image" />
              </Show>
              </div>
            </div>

          <div class="pt-8">
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">More Area Information</h3>
            </div>
            <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

              <div class="sm:col-span-3">
                <label for="size" class="block text-sm font-medium text-black">
                  Country
                </label>
                <div class="mt-1">
                  <select
                      id="size"
                      name="country"
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-black"
                      onChange={(e) => {
                        updateFormField("size");
                      }}
                  >
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
              <Button type="submit" class="button btn btn-primary bg-blue-500" onClick={() => addNewArea()}>Create New
                Area
              </Button>
            </div>
          </div>
        </div>
      </form>
        </>
     )
}