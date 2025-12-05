import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Input,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { router } from '@inertiajs/react';
import { EyeOff, Loader2, X } from 'lucide-react';
import React, { Fragment, useState } from 'react';
import toast from 'react-hot-toast';

// FIXED: The previous Button component was calling itself recursively.
// Changed to render a standard HTML <button> tag.
const Button = ({ children, className, ...props }: any) => (
    <button className={className} {...props}>
        {children}
    </button>
);

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddNewStaffComponent({ isOpen, onClose }: ModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [birthMonth, setBirthMonth] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    // Address fields
    const [street, setStreet] = useState('');
    const [purok, setPurok] = useState('');
    const [barangay, setBarangay] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal, setPostal] = useState('');

    // Contact fields
    const [email, setEmail] = useState('');
    const [mobileNo, setMobileNo] = useState('');

    // Account fields
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // Name fields
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');

    // Additional fields
    const [gender, setGender] = useState('');
    const [civilStatus, setCivilStatus] = useState('');

    const updateDateOfBirth = () => {
        if (birthMonth && birthDate && birthYear) {
            const month = birthMonth.padStart(2, '0');
            const date = birthDate.padStart(2, '0');
            const dateStr = `${birthYear}-${month}-${date}`;
            setDateOfBirth(dateStr);
        }
    };

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = {
            firstName,
            middleName,
            lastName,
            gender,
            civilStatus,
            dateOfBirth,
            street,
            purok,
            barangay,
            city,
            province,
            postal,
            email,
            mobileNo,
            userName,
            password,
            password_confirmation: passwordConfirmation,
        };

        router.post('/admin', formData, {
            onSuccess: () => {
                onClose();
            },
            onError: (errors: Record<string, string>) => {
                toast.error('Error adding staff', {
                    position: 'top-right',
                });
            },
            onFinish: () => {
                setIsSubmitting(false);
            },
        });
    };

    return (
        <Transition show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                {/* Backdrop / Overlay */}
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </TransitionChild>

                {/* Modal Positioning Wrapper */}
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-2xl transition-all">
                                {/* Modal Header */}
                                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                                    <DialogTitle
                                        as="h2"
                                        className="text-xl font-bold text-gray-800"
                                    >
                                        Add New Staff Account
                                    </DialogTitle>
                                    <Button
                                        onClick={onClose}
                                        type="button"
                                        disabled={isSubmitting}
                                        className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
                                    >
                                        <X size={20} />
                                    </Button>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <fieldset
                                        disabled={isSubmitting}
                                        className="group"
                                    >
                                        {/* Modal Body */}
                                        <div className="space-y-6 p-6 transition-opacity group-disabled:opacity-60">
                                            {/* Basic Info Section */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    Basic Information
                                                </h3>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    {/* First Name Field */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            *First name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            required
                                                            placeholder="Enter Your First Name"
                                                            value={firstName}
                                                            onChange={(e) =>
                                                                setFirstName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                    {/* Middle Name Field */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            Middle name (as
                                                            applicable)
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter Your Middle Name"
                                                            value={middleName}
                                                            onChange={(e) =>
                                                                setMiddleName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                    {/* Last Name Field */}
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            *Last name
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            required
                                                            placeholder="Enter Your Last Name"
                                                            value={lastName}
                                                            onChange={(e) =>
                                                                setLastName(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>

                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            What's your gender?
                                                            (optional)
                                                        </label>
                                                        <select
                                                            className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                            value={gender}
                                                            onChange={(e) =>
                                                                setGender(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                Select Gender
                                                            </option>
                                                            <option value="Female">
                                                                Female
                                                            </option>
                                                            <option value="Male">
                                                                Male
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            *What's your Civil
                                                            Status?
                                                        </label>
                                                        <select
                                                            className="h-11 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                            value={civilStatus}
                                                            onChange={(e) =>
                                                                setCivilStatus(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select civil
                                                                status
                                                            </option>
                                                            <option value="Single">
                                                                Single
                                                            </option>
                                                            <option value="Married">
                                                                Married
                                                            </option>
                                                            <option value="Divorced">
                                                                Divorced
                                                            </option>
                                                            <option value="Widowed">
                                                                Widowed
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Date of Birth
                                                    </label>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        <select
                                                            className="h-9 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                            value={birthMonth}
                                                            onChange={(e) => {
                                                                setBirthMonth(
                                                                    e.target
                                                                        .value,
                                                                );
                                                                setTimeout(
                                                                    updateDateOfBirth,
                                                                    0,
                                                                );
                                                            }}
                                                        >
                                                            <option value="">
                                                                Month
                                                            </option>
                                                            {months.map(
                                                                (
                                                                    month,
                                                                    index,
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            month
                                                                        }
                                                                        value={(
                                                                            index +
                                                                            1
                                                                        ).toString()}
                                                                    >
                                                                        {month}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                        <select
                                                            className="h-9 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                            value={birthDate}
                                                            onChange={(e) => {
                                                                setBirthDate(
                                                                    e.target
                                                                        .value,
                                                                );
                                                                setTimeout(
                                                                    updateDateOfBirth,
                                                                    0,
                                                                );
                                                            }}
                                                        >
                                                            <option value="">
                                                                Date
                                                            </option>
                                                            {days.map((day) => (
                                                                <option
                                                                    key={day}
                                                                    value={day.toString()}
                                                                >
                                                                    {day}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <select
                                                            className="h-9 w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-2 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                            value={birthYear}
                                                            onChange={(e) => {
                                                                setBirthYear(
                                                                    e.target
                                                                        .value,
                                                                );
                                                                setTimeout(
                                                                    updateDateOfBirth,
                                                                    0,
                                                                );
                                                            }}
                                                        >
                                                            <option value="">
                                                                Year
                                                            </option>
                                                            {years.map(
                                                                (year) => (
                                                                    <option
                                                                        key={
                                                                            year
                                                                        }
                                                                        value={year.toString()}
                                                                    >
                                                                        {year}
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-gray-100" />

                                            {/* Contact Information */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    Address Information
                                                </h3>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        House No. / Street
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter Your Street"
                                                        value={street}
                                                        onChange={(e) =>
                                                            setStreet(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-12 w-full rounded-lg border border-gray-300 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Purok / Zone / Sitio
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter Your Purok"
                                                        value={purok}
                                                        onChange={(e) =>
                                                            setPurok(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-12 w-full rounded-lg border border-gray-300 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Barangay Name
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter Your Barangay"
                                                        value={barangay}
                                                        onChange={(e) =>
                                                            setBarangay(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-12 w-full rounded-lg border border-gray-300 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            City / Municipality
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter Your City"
                                                            value={city}
                                                            onChange={(e) =>
                                                                setCity(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            Province
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter Your Province"
                                                            value={province}
                                                            onChange={(e) =>
                                                                setProvince(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Postal Code
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Enter Your Postal Code"
                                                        value={postal}
                                                        onChange={(e) =>
                                                            setPostal(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="mt-10">
                                                    <h3 className="text-lg font-bold text-gray-800">
                                                        Contacts Information
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            Email Address
                                                        </label>
                                                        <Input
                                                            type="email"
                                                            placeholder="oliviarhye@gmail.com"
                                                            value={email}
                                                            onChange={(e) =>
                                                                setEmail(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-sm font-semibold text-gray-700">
                                                            Mobile Number
                                                        </label>
                                                        <Input
                                                            type="text"
                                                            placeholder="+639876543456"
                                                            value={mobileNo}
                                                            onChange={(e) =>
                                                                setMobileNo(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-11 w-full rounded-lg border border-gray-300 px-3 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="border-gray-100" />

                                            {/* Privacy Security */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    Privacy Security
                                                </h3>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Username
                                                    </label>
                                                    <Input
                                                        type="text"
                                                        placeholder="@oliviarhye123"
                                                        value={userName}
                                                        onChange={(e) =>
                                                            setUserName(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-12 w-full rounded-lg border border-gray-300 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Password
                                                    </label>
                                                    <div className="relative">
                                                        <Input
                                                            type="password"
                                                            placeholder="••••••••••"
                                                            value={password}
                                                            onChange={(e) =>
                                                                setPassword(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="h-12 w-full rounded-lg border border-gray-300 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                        />
                                                        <EyeOff
                                                            className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-gray-400"
                                                            size={18}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-1.5">
                                                    <label className="text-sm font-semibold text-gray-700">
                                                        Confirm Password
                                                    </label>
                                                    <Input
                                                        type="password"
                                                        placeholder="••••••••••"
                                                        value={
                                                            passwordConfirmation
                                                        }
                                                        onChange={(e) =>
                                                            setPasswordConfirmation(
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="h-12 w-full rounded-lg border border-gray-300 bg-gray-50 px-4 transition focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Modal Footer */}
                                        <div className="sticky bottom-0 z-10 flex justify-end gap-3 rounded-b-xl border-t border-gray-200 bg-gray-50 px-8 py-5">
                                            <Button
                                                onClick={onClose}
                                                type="button"
                                                disabled={isSubmitting}
                                                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex min-w-[140px] items-center justify-center gap-2 rounded-lg bg-blue-900 px-6 py-2.5 font-medium text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-700"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2
                                                            className="animate-spin"
                                                            size={18}
                                                        />
                                                        Saving...
                                                    </>
                                                ) : (
                                                    'Create Account'
                                                )}
                                            </Button>
                                        </div>
                                    </fieldset>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
