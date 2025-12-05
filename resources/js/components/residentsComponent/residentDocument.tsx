import { router, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';

interface Document {
    id: number;
    documentName: string;
    documentPurpose: string;
    documentType: string;
}

export default function ResidentDocument() {
    const { documents, auth } = usePage().props as any;

    const handleDocumentRequest = (
        documentId: number,
        documentName: string,
    ) => {
        // Check if user is authenticated
        if (auth?.user) {
            // Redirect to dashboard with document info for authenticated users
            router.visit('/dashboard', {
                method: 'get',
                data: {
                    document_id: documentId,
                    document_name: documentName,
                },
            });
        } else {
            // Redirect to guest form for non-authenticated users
            router.visit('/guest-form', {
                method: 'get',
                data: {
                    document_id: documentId,
                    document_name: documentName,
                },
            });
        }
    };

    // Filter documents by type
    const clearanceDocuments =
        documents?.filter(
            (doc: Document) => doc.documentType === 'clearance',
        ) || [];
    const certificateDocuments =
        documents?.filter(
            (doc: Document) => doc.documentType === 'certificate',
        ) || [];
    const specialDocuments =
        documents?.filter((doc: Document) => doc.documentType === 'special') ||
        [];

    return (
        <section className="flex w-full flex-col items-center bg-slate-50 px-3 py-8 font-rubik sm:px-6 sm:py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-32 xl:py-24 2xl:px-40">
            <div className="text-center">
                <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                    Humiling ng mga Dokumento Dito!
                </h1>
            </div>
            <div className="mt-3 text-center sm:mt-4 md:mt-5">
                <p className="text-lg text-gray-800 sm:text-xl md:text-2xl">
                    Ang inyong maaasahang online na daan para sa mga kahilingan
                    at tulong mula sa barangay.
                </p>
            </div>

            {/* Barangay Clearances Section */}
            <div className="mt-8 w-full sm:mt-12 md:mt-16">
                <h2 className="mb-6 text-center text-lg font-semibold text-gray-800 sm:text-xl md:mb-8 lg:text-2xl">
                    Barangay Clearances
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {clearanceDocuments.map((service: Document) => (
                        <div
                            key={service.id}
                            className="flex flex-col rounded-xl bg-white p-4 shadow-sm sm:p-6"
                        >
                            <h3 className="mb-2 font-semibold text-gray-900 sm:mb-3">
                                {service.documentName}
                            </h3>
                            <p className="mb-3 flex-grow text-sm text-gray-600 sm:mb-4">
                                {service.documentPurpose}
                            </p>
                            <Button
                                onClick={() =>
                                    handleDocumentRequest(
                                        service.id,
                                        service.documentName,
                                    )
                                }
                                className="w-full cursor-pointer rounded-lg bg-blue-900 py-2 text-sm font-medium text-white hover:bg-blue-800 sm:py-3"
                            >
                                Get Document
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Barangay Certificates Section */}
            <div className="mt-8 w-full sm:mt-12 md:mt-16">
                <h2 className="mb-6 text-center text-lg font-semibold text-gray-800 sm:text-xl md:mb-8 lg:text-2xl">
                    Barangay Certificates
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {certificateDocuments.map((service: Document) => (
                        <div
                            key={service.id}
                            className="flex flex-col rounded-xl bg-white p-4 shadow-sm sm:p-6"
                        >
                            <h3 className="mb-2 font-semibold text-gray-900 sm:mb-3">
                                {service.documentName}
                            </h3>
                            <p className="mb-3 flex-grow text-sm text-gray-600 sm:mb-4">
                                {service.documentPurpose}
                            </p>
                            <Button
                                onClick={() =>
                                    handleDocumentRequest(
                                        service.id,
                                        service.documentName,
                                    )
                                }
                                className="w-full cursor-pointer rounded-lg bg-blue-900 py-2 text-sm font-medium text-white hover:bg-blue-800 sm:py-3"
                            >
                                Get Document
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Additional Services Section */}
            <div className="mt-8 w-full sm:mt-12 md:mt-16">
                <div className="mb-6 text-center text-lg font-semibold text-gray-800 sm:text-xl md:mb-8 lg:text-2xl">
                    Additional Services
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {specialDocuments.map((service: Document) => (
                        <div
                            key={service.id}
                            className="flex flex-col rounded-xl bg-white p-4 shadow-sm sm:p-6"
                        >
                            <h3 className="mb-2 font-semibold text-gray-900 sm:mb-3">
                                {service.documentName}
                            </h3>
                            <p className="mb-3 flex-grow text-sm text-gray-600 sm:mb-4">
                                {service.documentPurpose}
                            </p>
                            <Button
                                onClick={() =>
                                    handleDocumentRequest(
                                        service.id,
                                        service.documentName,
                                    )
                                }
                                className="w-full cursor-pointer rounded-lg bg-blue-900 py-2 text-sm font-medium text-white hover:bg-blue-800 sm:py-3"
                            >
                                Get Document
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
