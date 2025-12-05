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
            <div className="w-full px-3 pt-20 pb-6 font-inter sm:px-6 sm:pt-20 sm:pb-8 md:px-8 md:pt-20 md:pb-10 lg:px-12 lg:pt-20 lg:pb-12 xl:px-16 xl:pt-20 2xl:px-20">
                <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8 md:space-y-10">
                    <RequestStatus />
                    <ResidentDocument />
                    <ResidentContactUs />
                    <FeedBack />
                </div>
            </div>
        </AppLayout>
    );
}
