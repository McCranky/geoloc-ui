import React from "react";

interface Props {
    columns: any;
}

const TableHead = ({ columns, ...props }: Props) => {
    return (
        <thead>
            <tr>
                {columns.map((c: any) => (
                    <th key={c.path || c.key}>{c.label}</th>
                ))}
            </tr>
        </thead>
    );
};

export default TableHead;
