import React from "react";
import _ from "lodash";

interface Props {
    data: any;
    columns: any;
}

const TableBody = ({ data, columns, ...props }: Props) => {
    const renderCell = (item: any, column: any) => {
        if (column.content) {
            return column.content(item);
        } else {
            return _.get(item, column.path);
        }
    };

    const createKey = (item: any, column: any) => {
        return item.id + (column.path || column.key);
    };

    return (
        <tbody>
            {data.map((item: any) => (
                <tr key={item.id}>
                    {columns.map((col: any) => (
                        <td key={createKey(item, col)}>{renderCell(item, col)}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
};

export default TableBody;
