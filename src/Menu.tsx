import { useLocation } from "wouter";

export default function Menu() {
    const [_, setLocation] = useLocation();

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={() => {
                    setLocation("/profile");
                }}
                type="button"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg p-2 mt-4 font-semibold"
            >
                Profile
            </button>
            <button
                onClick={async () => {
                    setLocation("/transcript");
                }}
                type="button"
                className="w-full bg-violet-600 hover:bg-violet-700 text-white rounded-lg p-2 mt-4 font-semibold"
            >
                CGPA
            </button>
        </div>
    );
}
