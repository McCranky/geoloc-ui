import React from "react";
import { Table as BTable } from "react-bootstrap";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface Props {
    data: any;
    columns: any;
}

const Table = ({ data, columns, ...props }: Props) => {
    return (
        <BTable>
            <TableHead columns={columns} />
            <TableBody columns={columns} data={data} />
        </BTable>
    );
};

export default Table;
