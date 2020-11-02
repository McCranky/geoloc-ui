import React from "react";
import { Table } from "react-bootstrap";
import { Gps, ObjectInfo } from "../types";

interface Props {
    objects: ObjectInfo[];
}

const ObjectsFinderTable = ({ objects, ...props }: Props) => {
    const formatGps = (gps: Gps) => {
        return `${gps.latitudeSymbol}:${gps.latitude}; ${gps.longitudeSymbol}:${gps.longitude}`;
    };

    return (
        <Table>
            <thead>
                <tr>
                    {/* <th>No. #</th> */}
                    <th>Number</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>GPS</th>
                    <th>Relations</th>
                </tr>
            </thead>
            <tbody>
                {objects.map((o, index) => (
                    <tr key={o.description + index}>
                        {/* <td>{index + 1}</td> */}
                        <td>{o.number}</td>
                        <td>{o.type}</td>
                        <td>{o.description}</td>
                        <td>{formatGps(o.gps)}</td>
                        <td>{o.relationToObject}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default ObjectsFinderTable;
