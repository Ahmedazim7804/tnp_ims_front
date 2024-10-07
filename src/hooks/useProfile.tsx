import { useQuery } from "react-query";

function apiGetProfile(): Promise<Map<string, string>> {
    console.log("Called Profile API");

    return fetch("http://localhost:3001/profile", {
        credentials: "include",
    }).then((res) => res.json());
}

export function useProfile() {
    const { data, error, isLoading } = useQuery({
        queryFn: apiGetProfile,
        queryKey: "profile",
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
    });

    return { data, error, isLoading };
}
