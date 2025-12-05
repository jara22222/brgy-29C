import { router, usePage } from '@inertiajs/react';
import {
    Check,
    ChevronLeft,
    ChevronRight,
    Download,
    FileText,
    MoreVertical,
} from 'lucide-react';

export default function RequestStatus() {
    const { auth, certificates, completedCertificates } = usePage<any>().props;
    const currentUser = auth.user;

    const getStatusSteps = (status: string) => {
        const steps = [
            { key: 'request', short: 'Req', full: 'Request', completed: true },
            {
                key: 'verification',
                short: 'Ver',
                full: 'Verification',
                completed: false,
            },
            {
                key: 'processing',
                short: 'Proc',
                full: 'Processing',
                completed: false,
            },
            {
                key: 'completed',
                short: 'Done',
                full: 'Completed',
                completed: false,
            },
        ];

        const statusIndex = steps.findIndex((step) => step.key === status);
        if (statusIndex !== -1) {
            for (let i = 0; i <= statusIndex; i++) {
                steps[i].completed = true;
            }
        }

        return steps;
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const truncateDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    // Custom tooltip component
    const DateTooltip = ({
        date,
        children,
    }: {
        date: string;
        children: React.ReactNode;
    }) => {
        return (
            <div className="group relative inline-block">
                {children}
                <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                    {formatDate(date)}
                    <div className="absolute top-full left-1/2 -mt-1 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
            </div>
        );
    };
    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="mb-6 text-center sm:mb-8 md:mb-10">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Mabuhay, {currentUser.name}!
                </h1>
                <h2 className="mb-4 text-lg text-gray-800 sm:text-xl md:text-2xl">
                    Welcome to Barangay 29-C Online Portal!
                </h2>
                <p className="mx-auto max-w-2xl text-sm text-gray-600 sm:text-base">
                    Dito sa aming barangay website, maaari ka nang mag-request
                    ng Barangay Certificate at Barangay Clearance nang mabilis
                    at madali online!
                </p>
            </div>

            {/* Request Cards Grid */}
            <div className="grid grid-cols-1 gap-4 lg:gap-6 xl:grid-cols-2 xl:gap-8">
                {/* Left Panel: Request Status Card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                        Request Status
                    </h3>

                    {/* Table Headers */}
                    <div className="mb-3 hidden grid-cols-4 gap-2 text-xs font-medium text-gray-500 sm:grid sm:gap-4 md:gap-6">
                        <div>Document Name</div>
                        <div className="col-span-2">Status</div>
                        <div>Date Requested</div>
                    </div>

                    {/* Request Items */}
                    {certificates &&
                    certificates.data &&
                    certificates.data.length > 0 ? (
                        certificates.data.map((certificate: any) => {
                            const steps = getStatusSteps(certificate.status);
                            return (
                                <div
                                    key={certificate.id}
                                    className="rounded-lg border p-4"
                                >
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4 sm:items-start sm:gap-6">
                                        {/* File Icon and Info */}
                                        <div className="flex items-center gap-2 sm:col-span-1">
                                            <div className="rounded bg-blue-100 p-2">
                                                <FileText className="h-4 w-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {certificate.document_name ||
                                                        certificate.name}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Certificate
                                                </div>
                                            </div>
                                        </div>

                                        {/* Progress Stepper */}
                                        <div className="sm:col-span-2">
                                            <div className="relative flex items-center justify-between px-2">
                                                {/* Progress Line */}
                                                <div className="absolute top-2 right-2 left-2 z-0 h-0.5 bg-gray-200"></div>
                                                {steps.map((step, index) => (
                                                    <div
                                                        key={step.key}
                                                        className="absolute top-2 z-0 h-0.5 bg-green-500"
                                                        style={{
                                                            left: `${(index / (steps.length - 1)) * 100}%`,
                                                            width:
                                                                index ===
                                                                steps.length - 1
                                                                    ? '0'
                                                                    : `${100 / steps.length}%`,
                                                            display:
                                                                step.completed &&
                                                                index <
                                                                    steps.length -
                                                                        1
                                                                    ? 'block'
                                                                    : 'none',
                                                        }}
                                                    ></div>
                                                ))}

                                                {/* Steps */}
                                                <div className="relative z-10 flex w-full items-center justify-between">
                                                    {steps.map((step) => (
                                                        <div
                                                            key={step.key}
                                                            className="group flex flex-col items-center"
                                                        >
                                                            <div
                                                                className={`flex h-4 w-4 items-center justify-center rounded-full ${
                                                                    step.completed
                                                                        ? 'bg-green-500'
                                                                        : 'bg-gray-300'
                                                                }`}
                                                            >
                                                                {step.completed && (
                                                                    <Check className="h-2 w-2 text-white" />
                                                                )}
                                                            </div>
                                                            <span className="mt-1 text-[12px] text-gray-600 group-hover:hidden">
                                                                {step.short}
                                                            </span>
                                                            <span className="mt-1 hidden text-[12px] text-gray-600 group-hover:block">
                                                                {step.full}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date and Action */}
                                        <div className="flex flex-col items-end justify-between sm:col-span-1">
                                            <div className="flex items-center gap-2">
                                                <DateTooltip
                                                    date={
                                                        certificate.created_at
                                                    }
                                                >
                                                    <div className="cursor-help text-sm text-gray-500 transition-colors hover:text-gray-700">
                                                        {truncateDate(
                                                            certificate.created_at,
                                                        )}
                                                    </div>
                                                </DateTooltip>
                                                <button className="rounded p-1 hover:bg-gray-100">
                                                    <MoreVertical className="h-4 w-4 text-gray-400" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="rounded-lg border p-8 text-center text-gray-500">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p>No certificate requests found.</p>
                            <p className="text-sm">
                                Start by requesting a document from the options
                                below.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {certificates && certificates.last_page > 1 && (
                        <div className="mt-4 flex items-center justify-between">
                            <div className="text-sm text-gray-700">
                                Showing {certificates.from} to {certificates.to}{' '}
                                of {certificates.total} results
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() =>
                                        router.get(certificates.prev_page_url)
                                    }
                                    disabled={!certificates.prev_page_url}
                                    className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </button>
                                <span className="text-sm text-gray-600">
                                    Page {certificates.current_page} of{' '}
                                    {certificates.last_page}
                                </span>
                                <button
                                    onClick={() =>
                                        router.get(certificates.next_page_url)
                                    }
                                    disabled={!certificates.next_page_url}
                                    className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Panel: Request History Card */}
                <div className="rounded-lg bg-white p-6 shadow-md">
                    {/* Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Request History
                            </h3>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                        <button className="flex items-center gap-2 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50">
                            <Download className="h-4 w-4" />
                            Download All
                        </button>
                    </div>

                    {/* Table Headers */}
                    <div className="mb-3 grid grid-cols-4 gap-4 text-xs font-medium text-gray-500">
                        <div>Document Name</div>
                        <div>Status</div>
                        <div>Date uploaded</div>
                        <div>Last updated</div>
                        <div></div>
                    </div>

                    {/* Request History Items */}
                    {completedCertificates &&
                    completedCertificates.data &&
                    completedCertificates.data.length > 0 ? (
                        completedCertificates.data.map((certificate: any) => (
                            <div
                                key={certificate.id}
                                className="flex items-center gap-3 border-b p-3"
                            >
                                <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                    <Check className="h-3 w-3" />
                                    Completed
                                </div>
                                <div className="flex flex-1 items-center gap-2">
                                    <div className="rounded bg-blue-100 p-1">
                                        <FileText className="h-3 w-3 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">
                                            {certificate.document_name ||
                                                certificate.name}
                                            .pdf
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Certificate
                                        </div>
                                    </div>
                                </div>
                                <DateTooltip date={certificate.created_at}>
                                    <div className="cursor-help text-xs text-gray-500 transition-colors hover:text-gray-700">
                                        {truncateDate(certificate.created_at)}
                                    </div>
                                </DateTooltip>
                                <button className="rounded p-1 hover:bg-gray-100">
                                    <Download className="h-4 w-4 text-gray-400" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="rounded-lg border p-8 text-center text-gray-500">
                            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                            <p>No completed requests found.</p>
                            <p className="text-sm">
                                Your completed certificate requests will appear
                                here.
                            </p>
                        </div>
                    )}

                    {/* Request History Pagination */}
                    {completedCertificates &&
                        completedCertificates.last_page > 1 && (
                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-700">
                                    Showing {completedCertificates.from} to{' '}
                                    {completedCertificates.to} of{' '}
                                    {completedCertificates.total} results
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            router.get(
                                                completedCertificates.prev_page_url,
                                            )
                                        }
                                        disabled={
                                            !completedCertificates.prev_page_url
                                        }
                                        className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </button>
                                    <span className="text-sm text-gray-600">
                                        Page{' '}
                                        {completedCertificates.current_page} of{' '}
                                        {completedCertificates.last_page}
                                    </span>
                                    <button
                                        onClick={() =>
                                            router.get(
                                                completedCertificates.next_page_url,
                                            )
                                        }
                                        disabled={
                                            !completedCertificates.next_page_url
                                        }
                                        className="flex items-center gap-1 rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Next
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
