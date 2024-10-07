import React from "react";
import { useTranscript } from "./hooks/useTranscript";
import { RotatingLines } from "react-loader-spinner";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ICourseData, ISemesterData } from "./types";

const courseColumnsDef: ColumnDef<ICourseData>[] = [
    {
        accessorKey: "courseCode",
        header: "Course Code",
    },

    {
        accessorKey: "courseTitle",
        header: "Course Title",
    },

    {
        accessorKey: "courseType",
        header: "Course Type",
    },

    {
        accessorKey: "sem",
        header: "Semester",
    },

    {
        accessorKey: "credits",
        header: "Credits",
    },

    {
        accessorKey: "gradeLetter",
        header: "Grade Letter",
    },

    {
        accessorKey: "gradePoints",
        header: "Grade Points",
    },

    {
        accessorKey: "creditPoints",
        header: "Credit Points",
    },
];

const semesterColumnsDef: ColumnDef<ISemesterData>[] = [
    {
        accessorKey: "semester",
        header: "Semester",
    },

    {
        accessorKey: "totalCredit",
        header: "Total Credit",
    },

    {
        accessorKey: "totalCreditPoints",
        header: "Total Credit Points",
    },

    {
        accessorKey: "sgpa",
        header: "SGPA",
    },

    {
        accessorKey: "creditSecured",
        header: "Credit Secured",
    },
];

export default function Transcript() {
    const { data: transcript, isLoading, error } = useTranscript();

    const coursesTable = useReactTable({
        data: transcript?.courseWiseData ?? [],
        columns: courseColumnsDef,
        getCoreRowModel: getCoreRowModel(),
    });

    const semesterTable = useReactTable({
        data: transcript?.semesterWiseData ?? [],
        columns: semesterColumnsDef,
        getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading || transcript === undefined) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <RotatingLines strokeColor="#7c3aed" width="40px" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <p className="text-lg font-bold self-center">
                    Course Wise Data
                </p>

                <table className="border-2 border-neutral-400 mb-8">
                    <thead className="border-b-2 border-neutral-400">
                        {coursesTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-lg border-2 border-neutral-400 px-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {coursesTable.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-[1px] border-neutral-500"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-[1px] border-neutral-600 text-center py-2 px-2 w-32 h-16"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

                <p className="text-lg font-bold self-center">
                    Semester Wise Data
                </p>

                <table className="border-2 border-neutral-400 mb-8">
                    <thead className="border-b-2 border-neutral-400">
                        {semesterTable.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-lg border-2 border-neutral-400 px-4"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {semesterTable.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className="border-[1px] border-neutral-500"
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className="border-[1px] border-neutral-600 text-center py-2 px-2 w-32 h-16"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
