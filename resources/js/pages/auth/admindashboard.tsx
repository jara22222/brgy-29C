import AddNewStaffComponent from '@/components/registerComponents/addNewStaff';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { adminaccountmanagement } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Download,
    HelpCircle,
    Plus,
    Search,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: adminaccountmanagement().url,
    },
];

export default function Dashboard(props: { residents: [] }) {
    const { residents } = props;
    const [showAddModal, setShowAddModal] = useState(false);

    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
            titleError?: string;
            descriptionError?: string;
        };
    };

    const shownToast = useRef(false);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        } else if (flash?.error) {
            toast.error(flash.error);
        }
        shownToast.current = true;
    }, [flash]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <Toaster position="top-right" />
            <AddNewStaffComponent
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
            />
            <div className="min-h-screen bg-gray-50 p-6 font-inter">
                {/* Top Header Section */}
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Account Management
                    </h1>

                    <Button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 rounded-lg bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800"
                    >
                        Add Staff New Account <Plus size={16} />
                    </Button>
                </div>

                {/* Main Content Card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    {/* Blue Header Bar */}
                    <div className="flex flex-col items-center justify-between gap-4 border-b-8 border-b-yellow-300 bg-blue-900 p-4 md:flex-row">
                        <h2 className="text-lg font-semibold tracking-wide text-white">
                            Staff Management
                        </h2>

                        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                            {/* Search */}
                            <div className="group relative">
                                <Search
                                    className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-blue-500"
                                    size={18}
                                />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full rounded-lg border-none bg-white py-2 pr-4 pl-10 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-64"
                                />
                            </div>

                            {/* Date Filter */}
                            <div className="relative">
                                <Calendar
                                    className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
                                    size={18}
                                />
                                <select className="w-full cursor-pointer appearance-none rounded-lg border-none bg-white py-2 pr-8 pl-10 text-sm font-medium text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none md:w-auto">
                                    <option>10/01/25 - 11/01/25</option>
                                    <option>All Time</option>
                                </select>
                            </div>

                            {/* Download Button */}
                            <Button className="flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
                                Download All <Download size={16} />
                            </Button>
                        </div>
                    </div>

                    {/* Sub-header / Stats */}
                    <div className="flex items-center gap-3 border-b border-gray-100 bg-white px-6 py-4">
                        <h3 className="text-lg font-medium text-gray-800">
                            Accounts
                        </h3>
                        <span className="rounded-full border border-purple-200 bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-700">
                            users
                        </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-start">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase">
                                    <th className="w-24 px-6 py-4">Invoice</th>

                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">
                                        <div className="group flex cursor-help items-center gap-1">
                                            Role
                                            <HelpCircle
                                                size={14}
                                                className="text-gray-400 transition-colors group-hover:text-gray-600"
                                            />
                                        </div>
                                    </th>
                                    <th className="px-6 py-4">Email address</th>
                                    <th className="px-6 py-4">Date Joined</th>
                                    <th className="px-6 py-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 bg-white">
                                <td className="px-6 py-4">001</td>
                                <td className="flex items-center justify-center gap-2 px-6 py-4">
                                    <Avatar>
                                        <AvatarImage
                                            src="./myassets/Logo.png"
                                            className="border"
                                        />
                                        <AvatarFallback>Cn</AvatarFallback>
                                    </Avatar>
                                    <span>sad</span>
                                </td>
                                <td className="px-6 py-4">Role</td>
                                <td className="px-6 py-4 text-center align-middle">
                                    Email add
                                </td>
                                <td className="px-6 py-4 text-center align-middle">
                                    Date
                                </td>
                                <td className="px-6 py-4 text-center align-middle">
                                    Actions
                                </td>
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-200 bg-white px-6 py-4 sm:flex-row">
                        <Button className="cursor-pointer items-center gap-2 rounded-lg bg-blue-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
                            <ChevronLeft size={16} /> Previous
                        </Button>

                        <Button className="cursor-pointer items-center gap-2 rounded-lg bg-blue-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
                            Next <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
