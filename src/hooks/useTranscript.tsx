import { useMutation, useQuery } from "react-query";
import { ICourseData, ISemesterData } from "../types";

function apiGetTranscript(): Promise<{
    courseWiseData: Array<ICourseData>;
    semesterWiseData: Array<ISemesterData>;
}> {
    console.log("Called Transcript API");

    return fetch("http://localhost:3001/transcript", {
        credentials: "include",
    }).then((res) => res.json());
}

export function useTranscript() {
    const { data, error, isLoading } = useQuery({
        queryFn: apiGetTranscript,
        queryKey: "transcript",
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60,
    });

    return { data, error, isLoading };
}
