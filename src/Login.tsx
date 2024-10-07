import { RotatingLines } from "react-loader-spinner";
import { useGetCaptcha } from "./hooks/useCaptcha";
import { useLogin } from "./hooks/useLogin";
import { useRef } from "react";
import { useLocation } from "wouter";

function App() {
    const { data: captcha, isLoading: captchaLoading } = useGetCaptcha();
    const { mutateAsync, isLoading } = useLogin();
    const [_, setLocation] = useLocation();

    const username = useRef<string>("");
    const password = useRef<string>("");
    const cap = useRef<string>("");

    async function onSubmit() {
        if (captcha === undefined || isLoading) {
            return;
        }

        const data = await mutateAsync({
            username: username.current,
            password: password.current,
            captcha: cap.current,
        });

        console.log(data);

        if (data.success) {
            setLocation("/menu");
        }
    }

    return (
        <form
            className="h-full w-full"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-white" htmlFor="username">
                    Username
                </label>
                <input
                    id="username"
                    placeholder="e.g, 2023UIT3033"
                    onChange={(e) => (username.current = e.target.value)}
                    className="
                    h-8
                    rounded-lg outline-none focus:outline-none active:outline-none px-2 bg-neutral-700 text-white"
                />
            </div>
            <div className="flex flex-col gap-1 mb-4">
                <label className="text-white" htmlFor="password">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    onChange={(e) => (password.current = e.target.value)}
                    placeholder="Your Password"
                    className="
                    h-8
                    rounded-lg outline-none focus:outline-none active:outline-none px-2 bg-neutral-700 text-white"
                />
            </div>

            <div className="w-full h-fit flex justify-center items-center gap-4">
                {captchaLoading ? (
                    <RotatingLines strokeColor="#7c3aed" width="40px" />
                ) : (
                    <img
                        src={captcha}
                        className="w-1/4 aspect-auto border-2 border-violet-500 rounded-lg"
                    />
                )}
                <input
                    id="captcha"
                    type="text"
                    onChange={(e) => (cap.current = e.target.value)}
                    placeholder="Enter Captcha"
                    className="
                    h-8
                    rounded-lg outline-none focus:outline-none active:outline-none px-2 bg-neutral-700 text-white"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg p-2 mt-4 font-semibold"
            >
                {isLoading ? (
                    <RotatingLines strokeColor="#7c3aed" width="40px" />
                ) : (
                    "Submit"
                )}
            </button>
        </form>
    );
}

export default App;
