import FeedBack from '@/components/residentsComponent/feedBack';
import RequestStatus from '@/components/residentsComponent/requestStatus';
import ResidentContactUs from '@/components/residentsComponent/ResidentContactUs';
import ResidentDocument from '@/components/residentsComponent/residentDocument';
import AppLayout from '@/layouts/app-layout';
import { residentdashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resident Dashboard',
        href: residentdashboard().url,
    },
];

export default function ResidentDashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="w-full px-2 pt-16 pb-4 font-inter sm:px-4 sm:pt-18 sm:pb-6 md:px-6 md:pt-20 md:pb-8 lg:px-8 lg:pt-20 lg:pb-10 xl:px-12 xl:pt-20 2xl:px-16">
                <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 md:space-y-8">
                    <RequestStatus />
                    <ResidentDocument />
                    <ResidentContactUs />
                    <FeedBack />
                </div>
            </div>
        </AppLayout>
    );
}
