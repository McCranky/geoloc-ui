import React, { FormEvent } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { useState } from "react";
import { Plot } from "../types";

interface Props {
    plot: Plot;
    onLeave: () => void;
    onSubmit: (plot: Plot) => void;
}

const PlotForm = ({ plot, onLeave, onSubmit, ...props }: Props) => {
    const [modifiedPlot, setModifiedPlot] = useState<Plot>(
        JSON.parse(JSON.stringify(plot))
    );

    const handleChange = (e: any) => {
        const newPlot = {
            ...modifiedPlot,
            [e.currentTarget.name]: e.currentTarget.value,
        };
        setModifiedPlot(newPlot);
    };

    const handleNumChange = (e: any) => {
        const newPlot = {
            ...modifiedPlot,
            [e.currentTarget.name]: +e.currentTarget.value,
        };
        setModifiedPlot(newPlot);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Edited plot: ", modifiedPlot);
        console.log("Origin plot: ", plot);

        onSubmit(modifiedPlot);
    };

    return (
        <>
            <h2 className='mt-5'>Plot modification</h2>
            <Form className='m-5' onSubmit={handleSubmit}>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Number
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            value={modifiedPlot.number}
                            onChange={handleNumChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Description
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='text'
                            name='description'
                            value={modifiedPlot.description}
                            onChange={handleChange}
                        />
                    </Col>
                </Form.Group>

                <hr />
                <h4>GPS</h4>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Latitude Symbol
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='text'
                            value={modifiedPlot.gps.latitudeSymbol}
                            onChange={(input) =>
                                (modifiedPlot.gps.latitudeSymbol =
                                    input.currentTarget.value)
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Latitude
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            value={modifiedPlot.gps.latitude}
                            onChange={(input) =>
                                (modifiedPlot.gps.latitude = +input.currentTarget.value)
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Longtitude Symbol
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='text'
                            value={modifiedPlot.gps.longtitudeSymbol}
                            onChange={(input) =>
                                (modifiedPlot.gps.longtitudeSymbol =
                                    input.currentTarget.value)
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                        Longtitude
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type='number'
                            value={modifiedPlot.gps.longtitude}
                            onChange={(input) =>
                                (modifiedPlot.gps.longtitude = +input.currentTarget
                                    .value)
                            }
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className='mt-3'>
                    <Col sm={{ span: 10, offset: 1 }}>
                        <Button className='mr-2' type='submit'>
                            Save
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
