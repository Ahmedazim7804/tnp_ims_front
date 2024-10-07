import React from "react";
import { useProfile } from "./hooks/useProfile";
import { RotatingLines } from "react-loader-spinner";
import { camelCaseToNormal } from "./utils";

export default function Profile() {
    const { data: profile, isLoading, error } = useProfile();

    if (isLoading || profile === undefined) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <RotatingLines strokeColor="#7c3aed" width="40px" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-1">
            {Object.entries(profile).map(([key, value]) => {
                return (
                    <div key={key} className="flex flex-row justify-between">
                        <span className="text-white text-lg">
                            {camelCaseToNormal(key)}
                        </span>
                        <span className="text-white">{value}</span>
                    </div>
                );
            })}
        </div>
    );
}
