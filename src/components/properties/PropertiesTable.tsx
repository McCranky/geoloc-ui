import React from "react";
import { Button, Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Gps, Property } from "./../../types/index";

interface Props {
    properties: Property[];
    onModify: (property: Property) => void;
    onDelete: (property: Property) => void;
}

const PropertiesTable = ({
    properties,
    onModify: onPlotModify,
    onDelete,
    ...props
}: Props) => {
    const formatGps = (gps: Gps) => {
        return `${gps.latitudeSymbol}:${gps.latitude}; ${gps.longitudeSymbol}:${gps.longitude}`;
    };

    return (
        <Table>
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
                {properties.map((p, index) => (
                    <tr key={p.id}>
                        {/* <td>{index + 1}</td> */}
                        <td>{p.registerNumber}</td>
                        <td>{p.description}</td>
                        <td>{formatGps(p.gps)}</td>
                        <td>{p.plots}</td>
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
        </Table>
    );
};

export default PropertiesTable;
