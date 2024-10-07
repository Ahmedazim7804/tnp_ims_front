import { useQuery } from "react-query";

function apiGetCaptcha(): Promise<{
    captchaImage: string;
}> {
    console.log("object");

    return fetch("http://localhost:3001/auth/captcha", {
        credentials: "include",
    }).then((res) => res.json());
}

export function useGetCaptcha() {
    const { data, isLoading, error } = useQuery({
        queryFn: apiGetCaptcha,
        queryKey: "captcha",
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        select(data) {
            return data.captchaImage;
        },
    });

    return { data, isLoading, error };
}
