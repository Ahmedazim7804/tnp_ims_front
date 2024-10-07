import { useMutation, useQuery, useQueryClient } from "react-query";

function apiLogin({
    username,
    password,
    captcha,
}: {
    username: string;
    password: string;
    captcha: string;
}): Promise<{
    success: boolean;
    message: string;
}> {
    console.log("object");

    return fetch("http://localhost:3001/auth/login", {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
            captcha,
        }),
    }).then((res) => {
        const success = res.ok;

        return res.json().then((data) => {
            return {
                ...data,
                success,
            };
        });
    });
}

export function useLogin() {
    const queryClient = useQueryClient();

    const { mutate, mutateAsync, isLoading } = useMutation({
        mutationFn: apiLogin,
        mutationKey: "login",
        onError: () => {
            queryClient.invalidateQueries("captcha");
        },
    });

    return { mutate, mutateAsync, isLoading };
}
