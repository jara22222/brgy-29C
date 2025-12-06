import { Head, usePage } from '@inertiajs/react';
import React from 'react';

interface Certificate {
    id: number;
    name: string;
    address: string;
    purpose: string;
    document_name: string;
    status: string;
    userstatus: string;
    created_at: string;
    updated_at: string;
    user?: {
        id: number;
        name: string;
        email: string;
    };
}

interface PageProps {
    certificates: Certificate[];
    auth?: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string;
        };
    };
    [key: string]: any; // Add index signature for Inertia
}

const RequestedCertificatesIndex: React.FC = () => {
    const { props } = usePage<PageProps>();
    const { certificates, auth } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'completed':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Requested Certificates" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 bg-white p-6">
                            <h1 className="mb-6 text-2xl font-bold text-gray-900">
                                Requested Certificates
                            </h1>

                            {certificates.length === 0 ? (
                                <div className="py-12 text-center">
                                    <p className="text-gray-500">
                                        No certificate requests found.
                                    </p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Address
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Document
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Purpose
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                    Date
                                                </th>
                                                {auth?.user?.role !==
                                                    'resident' && (
                                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                                        Requested By
                                                    </th>
                                                )}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {certificates.map((certificate) => (
                                                <tr
                                                    key={certificate.id}
                                                    className="hover:bg-gray-50"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                                                        {certificate.name}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {certificate.address}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {
                                                            certificate.document_name
                                                        }
                                                    </td>
                                                    <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">
                                                        {certificate.purpose}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span
                                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(certificate.status)}`}
                                                        >
                                                            {certificate.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                        {new Date(
                                                            certificate.created_at,
                                                        ).toLocaleDateString()}
                                                    </td>
                                                    {auth?.user?.role !==
                                                        'resident' && (
                                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                            {certificate.user
                                                                ?.name || 'N/A'}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RequestedCertificatesIndex;
