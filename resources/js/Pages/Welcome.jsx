import {Head, Link} from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({auth, laravelVersion, phpVersion}) {
    const handleImageError = () => {
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome"/>

            <div className="flex flex-col items-center justify-center h-screen">
                <ApplicationLogo className="w-64 text-gray-600"/>
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-4xl font-bold text-center mb-6">Welcome to the CRM</h1>
                    <p className="text-lg text-gray-700 text-center">
                        Our Customer Relationship Management (CRM) system.
                    </p>
                    <div className="flex justify-center mt-8">
                        <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              href={route('login')}
                        >
                            Access CRM
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
