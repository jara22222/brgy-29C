import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4">
            <Head title="Log in" />

            {/* 2. CARD CONTAINER: White background, rounded corners, shadow */}
            <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8">
                {/* 3. LOGO & HEADER SECTION */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <img
                        src="/myassets/Logo.png"
                        alt="BRGY. 29-C"
                        className="mb-4 h-16 w-auto"
                    />
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome Back, Resident!
                    </h1>
                </div>

                {/* 4. FORM SECTION */}
                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="flex flex-col gap-5"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label
                                    htmlFor="email"
                                    className="text-gray-600"
                                >
                                    Email address or user name
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    placeholder="email@example.com"
                                    className="rounded-lg border-gray-300 px-4 py-2"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-gray-600"
                                    >
                                        Password
                                    </Label>
                                    {/* 'Hide' button logic usually requires local state, typically handled by a UI component */}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    placeholder="Password"
                                    className="rounded-lg border-gray-300 px-4 py-2"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="rounded border-gray-300 text-[#172F92]"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-sm font-normal text-gray-600"
                                >
                                    Remember me
                                </Label>
                            </div>

                            {/* Terms Text (From Image) */}
                            <div className="text-xs text-gray-500">
                                By continuing, you agree to the{' '}
                                <a href="#" className="underline">
                                    Terms of use
                                </a>{' '}
                                and{' '}
                                <a href="#" className="underline">
                                    Privacy Policy.
                                </a>
                            </div>

                            {/* Main Login Button */}
                            <Button
                                type="submit"
                                tabIndex={4}
                                disabled={processing}
                                className="w-full cursor-pointer rounded-lg bg-[#172F92] py-6 text-base font-semibold text-white hover:bg-[#112370]"
                            >
                                {processing && <Spinner className="mr-2" />}
                                Log In
                            </Button>

                            {/* Links Below Button */}
                            <div className="flex flex-col items-center gap-2 text-sm">
                                {canResetPassword && (
                                    <Link
                                        href={request()}
                                        className="font-medium text-gray-600 hover:text-gray-900 hover:underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}

                                <div className="text-gray-500">
                                    Don't have an account?{' '}
                                    <Link
                                        href={register()}
                                        className="font-semibold text-gray-900 underline"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </Form>

                {/* 5. SOCIAL LOGIN / DIVIDER SECTION */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-3">
                        {/* Google Button */}
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                        >
                            {/* Google Icon SVG */}
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                            Sign in with Google
                        </button>

                        {/* Guest Button */}
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
                        >
                            Continue as Guest
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
