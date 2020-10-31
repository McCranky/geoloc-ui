import React, { FormEvent } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useState } from "react";
import { Plot } from "../../types";
import FormGroup from "../common/FormGroup";

interface Props {
    plot: Plot;
    onLeave: () => void;
    onSubmit: (plot: Plot) => void;
    create?: boolean;
}

const PlotForm = ({ plot, onLeave, onSubmit, create, ...props }: Props) => {
    const [number, setNumber] = useState(`${plot.number}`);
    const [description, setDescription] = useState(plot.description);
    const [latitudeSymbol, setLatitudeSymbol] = useState(plot.gps.latitudeSymbol);
    const [longitudeSymbol, setLongitudeSymbol] = useState(plot.gps.longitudeSymbol);
    const [latitude, setLatitude] = useState(`${plot.gps.latitude}`);
    const [longitude, setLongitude] = useState(`${plot.gps.longitude}`);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({
            number: +number,
            description: description,
            id: plot.id,
            properties: plot.properties,
            gps: {
                latitude: +latitude,
                longitude: +longitude,
                latitudeSymbol: latitudeSymbol,
                longitudeSymbol: longitudeSymbol,
            },
        });
    };

    return (
        <>
            <h2 className='mt-5'>Plot modification</h2>
            <Form className='m-5' onSubmit={handleSubmit}>
                <FormGroup
                    label='Number'
                    type='number'
                    value={number}
                    onChange={setNumber}
                />
                <FormGroup
                    label='Description'
                    type='text'
                    value={description}
                    onChange={setDescription}
                />

                <hr />
                <h4>GPS</h4>

                <FormGroup
                    label='Latitude Symbol'
                    type='text'
                    value={latitudeSymbol}
                    onChange={setLatitudeSymbol}
                />
                <FormGroup
                    label='Latitude'
                    type='number'
                    value={latitude}
                    onChange={setLatitude}
                />

                <FormGroup
                    label='Longtitude Symbol'
                    type='text'
                    value={longitudeSymbol}
                    onChange={setLongitudeSymbol}
                />
                <FormGroup
                    label='Longtitude'
                    type='number'
                    value={longitude}
                    onChange={setLongitude}
                />

                <Form.Group as={Row} className='mt-3'>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Button className='mr-2' type='submit'>
                            {plot.id === "" ? "Add" : "Save"}
                        </Button>
                        <Button variant='danger' onClick={onLeave}>
                            Back
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default PlotForm;
