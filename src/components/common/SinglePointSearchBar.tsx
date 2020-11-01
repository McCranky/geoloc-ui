import React, { FormEvent, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri";

interface Props {
    onSearch: (lat: number, lon: number) => void;
    cancel: boolean;
}

const SinglePointSearchBar = ({ cancel, onSearch, ...props }: Props) => {
    const [latitude, setLatitude] = useState("");
    const [longtitude, setLongtitude] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(+latitude, +longtitude);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row className='align-items-center'>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLatitude' srOnly>
                        Latitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLatitude'
                        placeholder='Latitude'
                        value={latitude}
                        onChange={(input) => setLatitude(input.currentTarget.value)}
                    />
                </Col>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLongtitude' srOnly>
                        Longtitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLongtitude'
                        placeholder='Longtitude'
                        value={longtitude}
                        onChange={(input) => setLongtitude(input.currentTarget.value)}
                    />
                </Col>
                <Col xs='auto' className='my-1'>
                    {!cancel && (
                        <Button variant='info' type='submit'>
                            Search <BsSearch />
                        </Button>
                    )}
                    {cancel && (
                        <Button variant='warning' type='submit'>
                            Cancel <RiCloseFill />
                        </Button>
                    )}
                </Col>
            </Form.Row>
        </Form>
    );
};

export default SinglePointSearchBar;
