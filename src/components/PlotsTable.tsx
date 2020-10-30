import React from "react";
import { Button, Table as BTable } from "react-bootstrap";
import { Gps, Plot } from "../types";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Props {
    plots: Plot[];
    onModify: (plot: Plot) => void;
    onDelete: (plot: Plot) => void;
}

const PlotsTable = ({ plots, onModify: onPlotModify, onDelete, ...props }: Props) => {
    const formatGps = (gps: Gps) => {
        return `${gps.latitudeSymbol}:${gps.latitude}; ${gps.longtitudeSymbol}:${gps.longtitudeSymbol}`;
    };

    // const colums = [
    //     {
    //         path: "number",
    //         label: "Number",
    //     },
    //     {
    //         path: "description",
    //         label: "Description",
    //     },
    //     {
    //         path: "gps",
    //         label: "GPS",
    //     },
    //     {
    //         path: "properties",
    //         label: "Properties",
    //     },
    //     {
    //         key: "modify",
    //         content: (plot: Plot) => (
    //             <Button variant='primary' onClick={() => onPlotModify(plot)}>
    //                 Modify <FaRegEdit />
    //             </Button>
    //         ),
    //     },
    //     {
    //         key: "delete",
    //         content: (plot: Plot) => (
    //             <Button variant='danger'>
    //                 Delete <MdDelete />
    //             </Button>
    //         ),
    //     },
    // ];
    return (
        <BTable>
            <thead>
                <tr>
                    <th>Number</th>
                    <th>Description</th>
                    <th>GPS</th>
                    <th>Properties</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {plots.map((p) => (
                    <tr key={p.id}>
                        <td>{p.number}</td>
                        <td>{p.description}</td>
                        <td>{formatGps(p.gps)}</td>
                        <td>{p.properties}</td>
                        <td>
                            <Button variant='primary' onClick={() => onPlotModify(p)}>
                                Modify <FaRegEdit />
                            </Button>
                        </td>
                        <td>
                            <Button variant='danger' onClick={() => onDelete(p)}>
                                Delete <MdDelete />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </BTable>

        // <Table
        //     data={plots.map((plot) => ({
        //         id: plot.id,
        //         number: plot.number,
        //         description: plot.description,
        //         gps: formatGps(plot.gps),
        //         properties: plot.properties,
        //     }))}
        //     columns={colums}
        // />
    );
};

export default PlotsTable;
