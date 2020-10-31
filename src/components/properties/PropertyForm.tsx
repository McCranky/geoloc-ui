import React, { FormEvent, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Property } from "../../types";
import FormGroup from "../common/FormGroup";

interface Props {
    property: Property;
    onLeave: () => void;
    onSubmit: (property: Property) => void;
    create?: boolean;
}

const PropertyForm = ({ property, create, onLeave, onSubmit, ...props }: Props) => {
    const [registerNumber, setRegisterNumber] = useState(`${property.registerNumber}`);
    const [description, setDescription] = useState(property.description);
    const [latitudeSymbol, setLatitudeSymbol] = useState(property.gps.latitudeSymbol);
    const [longitudeSymbol, setLongitudeSymbol] = useState(
        property.gps.longitudeSymbol
    );
    const [latitude, setLatitude] = useState(`${property.gps.latitude}`);
    const [longitude, setLongitude] = useState(`${property.gps.longitude}`);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        onSubmit({
            registerNumber: +registerNumber,
            description: description,
            id: property.id,
            plots: property.plots,
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
            <h2 className='mt-5'>Property modification</h2>
            <Form className='m-5' onSubmit={handleSubmit}>
                <FormGroup
                    label='Register Number'
                    type='number'
                    value={registerNumber}
                    onChange={setRegisterNumber}
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
                            {property.id === "" ? "Add" : "Save"}
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

export default PropertyForm;
