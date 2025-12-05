import { Mail, MapPin, Phone } from 'lucide-react';

export default function ResidentContactUs() {
    return (
        <section className="w-full py-6 font-inter md:py-8 lg:py-12">
            {/* Header Section */}
            <div className="mb-8 text-center">
                <div className="mb-4">
                    <span className="text-sm font-semibold text-blue-600 uppercase">
                        Contact us
                    </span>
                </div>
                <h1 className="mb-4 text-2xl font-bold text-gray-800 md:text-3xl lg:text-4xl">
                    Maaari mo kaming padalhan ng mensahe para sa katanungan at
                    alalahanin.
                </h1>
                <p className="text-base text-gray-600 md:text-lg">
                    Kami ay laging narito para sagutin ang inyong mga
                    katanungan.
                </p>
            </div>

            {/* Contact Grid Section */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:mt-12 lg:grid-cols-3">
                {/* Email Column */}
                <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-gray-800">
                        Email
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">
                        Our friendly team is here to help.
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                        hi@untitledui.com
                    </p>
                </div>

                {/* Office Column */}
                <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-gray-800">
                        Office
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">
                        Come say hello at our office HQ.
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                        100 Smith Street
                        <br />
                        Collingwood VIC 3066 AU
                    </p>
                </div>

                {/* Phone Column */}
                <div className="text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
                        <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-gray-800">
                        Phone
                    </h3>
                    <p className="mb-3 text-sm text-gray-600">
                        Mon-Fri from 8am to 5pm.
                    </p>
                    <p className="text-sm font-semibold text-blue-700">
                        +1 (555) 000-0000
                    </p>
                </div>
            </div>
        </section>
    );
}
