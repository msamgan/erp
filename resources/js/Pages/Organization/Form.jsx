import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import {Transition} from "@headlessui/react";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Link} from "@inertiajs/react";

export default function Form({data, setData, errors, processing, recentlySuccessful, onSubmit}) {
    return (
        <form
            onSubmit={onSubmit}
            className="mt-6 space-y-6">
            <div>
                <InputLabel htmlFor="name" value="Name" isRequired={true}/>
                <TextInput
                    id="name"
                    className="mt-1 block w-1/2"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    isFocused
                    autoComplete="name"
                />
                <InputError className="mt-2" message={errors.name}/>
            </div>

            <div>
                <InputLabel htmlFor="location" value="Location" isRequired={false}/>
                <TextInput
                    id="location"
                    className="mt-1 block w-1/2"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    autoComplete="location"
                />
                <InputError className="mt-2" message={errors.location}/>
            </div>

            <div className="flex items-center gap-4">
                <PrimaryButton disabled={processing}>Save</PrimaryButton>

                <Transition
                    show={recentlySuccessful}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-gray-600">Saved.</p>
                </Transition>
            </div>
        </form>
    )
}
