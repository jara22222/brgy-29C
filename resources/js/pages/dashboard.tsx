import CertificateForm from '@/components/residentsComponent/certificateForm';
import CertificateInfo from '@/components/residentsComponent/certificateInfo';
import Process from '@/components/residentsComponent/process';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="w-full px-3 py-6 font-inter sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 xl:px-16 2xl:px-20">
                <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8 md:space-y-10">
                    <CertificateInfo />
                    <Process />
                    <CertificateForm />
                </div>
            </div>
        </AppLayout>
    );
}
