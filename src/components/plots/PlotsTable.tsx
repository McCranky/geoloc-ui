import React from "react";
import { Button, Table as BTable } from "react-bootstrap";
import { Gps, Plot } from "../../types";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Props {
    plots: Plot[];
    onModify: (plot: Plot) => void;
    onDelete: (plot: Plot) => void;
}

const PlotsTable = ({ plots, onModify: onPlotModify, onDelete, ...props }: Props) => {
    const formatGps = (gps: Gps) => {
        return `${gps.latitudeSymbol}:${gps.latitude}; ${gps.longitudeSymbol}:${gps.longitude}`;
    };

    return (
        <BTable>
            <thead>
                <tr>
                    {/* <th>No. #</th> */}
                    <th>Number</th>
                    <th>Description</th>
                    <th>GPS</th>
                    <th>Properties</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {plots.map((p, index) => (
                    <tr key={p.id}>
                        {/* <td>{index + 1}</td> */}
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
    );
};

export default PlotsTable;
