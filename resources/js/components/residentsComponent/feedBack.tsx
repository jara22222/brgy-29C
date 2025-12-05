import { Mail, User } from 'lucide-react';
import { useState } from 'react';

const Feedback = () => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        feedback: '',
    });

    const handleRatingSelect = (index: number) => {
        setSelectedRating(index);
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log({ ...formData, rating: selectedRating });
        // Add submission logic here
    };

    // Emoji data structure
    const ratings = [
        { emoji: '😠', label: "Didn't meet\nexpectations" },
        { emoji: '🙁', label: '' },
        { emoji: '😐', label: 'Met\nexpectations' },
        { emoji: '🙂', label: '' },
        { emoji: '😁', label: 'Exceeded\nexpectations' },
    ];

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="w-full space-y-8 rounded-xl bg-white p-6 shadow-sm md:p-10">
                {/* Header Section */}
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                        Rate your experience
                    </h1>
                    <p className="text-gray-500">
                        Please take a moment to rate your experience with our
                        service.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Form Fields Container */}
                    <div className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label
                                htmlFor="fullName"
                                className="text-sm font-medium text-gray-500"
                            >
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="John Carter"
                                    className="w-full rounded-lg border border-gray-200 py-3 pr-10 pl-4 text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                                <User className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-gray-500"
                            >
                                Email address
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email address"
                                    className="w-full rounded-lg border border-gray-200 py-3 pr-10 pl-4 text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100"
                                />
                                <Mail className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Rating Section */}
                    <div className="space-y-4">
                        <div className="flex items-start justify-between gap-2 sm:gap-4">
                            {ratings.map((item, index) => {
                                const isSelected = selectedRating === index;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() =>
                                            handleRatingSelect(index)
                                        }
                                        className="group flex flex-col items-center gap-3 transition-transform focus:outline-none active:scale-95"
                                    >
                                        <div
                                            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl shadow-sm transition-all duration-200 sm:h-14 sm:w-14 sm:text-3xl ${
                                                isSelected
                                                    ? 'scale-110 bg-[#1e3a8a] text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            } `}
                                        >
                                            {item.emoji}
                                        </div>
                                        {item.label && (
                                            <span
                                                className={`max-w-[80px] text-center text-[10px] leading-tight font-medium sm:text-xs ${isSelected ? 'text-[#1e3a8a]' : 'text-gray-500'} `}
                                            >
                                                {item.label}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Comment Section */}
                    <div className="space-y-2">
                        <label
                            htmlFor="feedback"
                            className="text-sm font-bold text-gray-800"
                        >
                            Tell us about your experience (optional)
                        </label>
                        <textarea
                            id="feedback"
                            name="feedback"
                            value={formData.feedback}
                            onChange={handleInputChange}
                            placeholder="Write your feedback here..."
                            rows={5}
                            className="w-full resize-none rounded-lg border border-gray-200 p-4 text-gray-800 placeholder-gray-300 transition-all outline-none focus:border-[#1e3a8a] focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {/* Action Button */}
                    <button
                        type="submit"
                        className="w-full rounded-lg bg-[#1e3a8a] py-4 font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-900"
                    >
                        Submit feedback
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Feedback;
