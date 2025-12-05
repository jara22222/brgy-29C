import InputError from '../input-error';
import { Input } from '../ui/input';

export default function AccountInfo(props: { form: any }) {
    const { form } = props;
    return (
        <div className="flex w-full flex-col justify-center gap-6">
            {/* Username */}
            <div className="Street flex flex-1 flex-col gap-2">
                <h2 className="text-sm text-gray-600 sm:text-[14px]">*Username</h2>
                <Input
                    required
                    name="username"
                    id="username"
                    placeholder="Enter Your Username"
                    value={form.data.userName}
                    onChange={(e) => form.setData('userName', e.target.value)}
                    tabIndex={1}
                />
                <InputError message={form.errors.userName} />
            </div>
            {/* Password */}
            <div className="Street flex flex-1 flex-col gap-2">
                <h2 className="text-sm text-gray-600 sm:text-[14px]">*Password</h2>
                <Input
                    required
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter Your Password"
                    value={form.data.password}
                    onChange={(e) => form.setData('password', e.target.value)}
                    tabIndex={2}
                />
                <InputError message={form.errors.password} />
            </div>
            {/* Confirm Password */}
            <div className="Street flex flex-1 flex-col gap-2">
                <h2 className="text-sm text-gray-600 sm:text-[14px]">*Confirm Password</h2>
                <Input
                    required
                    name="password_confirmation"
                    id="password_confirmation"
                    type="password"
                    placeholder="Re-enter Password"
                    value={form.data.password_confirmation}
                    onChange={(e) =>
                        form.setData('password_confirmation', e.target.value)
                    }
                    tabIndex={3}
                />
                <InputError message={form.errors.password_confirmation} />
            </div>
        </div>
    );
}
