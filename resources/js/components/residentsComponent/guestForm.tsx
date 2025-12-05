import { router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '../ui/button';
import RequirementsModal from './requirementsModal';

interface FormErrors {
    [key: string]: string;
}

export default function GuestForm() {
    const { url } = usePage();
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const documentId = urlParams.get('document_id');
    const documentName = urlParams.get('document_name');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        purpose: '',
        document_id: documentId ? parseInt(documentId, 10) : '',
        document_name: documentName || '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate form data
        if (!formData.name || !formData.address || !formData.purpose) {
            alert('Please fill in all required fields.');
            return;
        }

        // Set submitting state to disable form
        setIsSubmitting(true);

        // Create submission data without email field
        const submissionData = {
            name: formData.name,
            address: formData.address,
            purpose: formData.purpose,
            document_id: formData.document_id
                ? parseInt(formData.document_id.toString(), 10)
                : null,
            document_name: formData.document_name,
        };

        // Submit data to backend using Inertia
        router.post('/guest-certificate-request', submissionData, {
            onSuccess: () => {
                // Show success modal after successful submission
                setIsModalOpen(true);
                // Reset form on successful submission
                setFormData({
                    name: '',
                    email: '',
                    address: '',
                    purpose: '',
                    document_id: documentId || '',
                    document_name: documentName || '',
                });
                // Reset submitting state
                setIsSubmitting(false);
            },
            onError: (errors: FormErrors) => {
                console.error('Submission errors:', errors);
                console.error('Form data being submitted:', submissionData);

                // Display specific error messages
                if (errors && typeof errors === 'object') {
                    const errorMessages = Object.values(errors).flat();
                    alert(
                        `Error submitting certificate request:\n${errorMessages.join('\n')}`,
                    );
                } else {
                    alert(
                        'Error submitting certificate request. Please try again.',
                    );
                }

                // Reset submitting state on error
                setIsSubmitting(false);
                // Do NOT show modal on error
            },
        });
    };

    const handleConfirmSubmission = () => {
        // Close the modal after user confirms seeing the success message
        setIsModalOpen(false);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="w-full py-6 font-sans md:py-8 lg:py-12">
            {/* Main Header */}
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
                    Guest Certificate Application Form
                </h1>
                <p className="text-lg text-gray-500 md:text-xl">
                    Paraan ng pag proseso sa dokumento para sa mga non-resident
                </p>
            </div>

            {/* Document Information */}
            {documentName && (
                <div className="mb-8 text-center">
                    <div className="mx-auto inline-block rounded-lg bg-blue-50 px-6 py-3">
                        <p className="text-sm text-blue-600">
                            Requesting Document:
                        </p>
                        <p className="text-lg font-semibold text-blue-800">
                            {documentName}
                        </p>
                    </div>
                </div>
            )}

            {/* Form Container */}
            <div className="mx-auto max-w-3xl">
                <form
                    onSubmit={handleSubmit}
                    className="overflow-hidden rounded-xl shadow-lg"
                >
                    {/* Card Header */}
                    <div className="bg-[#1e3a8a] px-6 py-4 md:px-8 md:py-6">
                        <h2 className="text-xl font-semibold text-white md:text-2xl">
                            Request Information
                        </h2>
                        <p className="mt-1 text-sm text-blue-100">
                            Please provide your details for the certificate
                            request
                        </p>
                    </div>

                    {/* Form Body */}
                    <div className="bg-white px-6 py-6 md:px-8 md:py-8">
                        <div className="space-y-6">
                            {/* Field 1: Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Juan Dela Cruz"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                            </div>

                            {/* Field 2: Email (Optional) */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Email Address (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="juan.delacruz@example.com"
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                            </div>

                            {/* Field 3: Address */}
                            <div>
                                <label
                                    htmlFor="address"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Complete Address*
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Juan Luna Street, 29-C, Davao City, Davao Del Sur"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                            </div>

                            {/* Field 4: Purpose */}
                            <div>
                                <label
                                    htmlFor="purpose"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Purpose of Request*
                                </label>
                                <textarea
                                    id="purpose"
                                    name="purpose"
                                    value={formData.purpose}
                                    onChange={handleInputChange}
                                    placeholder="Enter your purpose for requesting this certificate"
                                    required
                                    rows={4}
                                    disabled={isSubmitting}
                                    className="w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-8">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full cursor-pointer rounded-lg bg-[#1e3a8a] px-6 py-3 text-base font-medium text-white transition-colors duration-200 hover:bg-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {isSubmitting
                                    ? 'Submitting...'
                                    : 'Request Document'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Requirements Modal */}
            <RequirementsModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirmSubmission}
            />
        </div>
    );
}
