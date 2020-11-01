import React, { FormEvent, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

interface Props {
    onSearch: (lat1: number, lon1: number, lat2: number, lon2: number) => void;
}

const TwoPointsSearchBar = ({ onSearch, ...props }: Props) => {
    const [lat1, setLat1] = useState("");
    const [lat2, setLat2] = useState("");
    const [lon1, setLon1] = useState("");
    const [lon2, setLon2] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(+lat1, +lon1, +lat2, +lon2);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Row className='align-items-center'>
                <Form.Label className='my-1 mr-2' htmlFor='inlineFormCustomSelectPref'>
                    Point 1
                </Form.Label>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLatitude' srOnly>
                        Latitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLatitude'
                        placeholder='Latitude'
                        value={lat1}
                        onChange={(input) => setLat1(input.currentTarget.value)}
                    />
                </Col>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLongtitude' srOnly>
                        Longtitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLongtitude'
                        placeholder='Longtitude'
                        value={lon1}
                        onChange={(input) => setLon1(input.currentTarget.value)}
                    />
                </Col>
            </Form.Row>
            <Form.Row className='align-items-center'>
                <Form.Label className='my-1 mr-2' htmlFor='inlineFormCustomSelectPref'>
                    Point 2
                </Form.Label>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLatitude' srOnly>
                        Latitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLatitude'
                        placeholder='Latitude'
                        value={lat2}
                        onChange={(input) => setLat2(input.currentTarget.value)}
                    />
                </Col>
                <Col sm={3} className='my-1'>
                    <Form.Label htmlFor='inlineFormInputLongtitude' srOnly>
                        Longtitude
                    </Form.Label>
                    <Form.Control
                        id='inlineFormInputLongtitude'
                        placeholder='Longtitude'
                        value={lon2}
                        onChange={(input) => setLon2(input.currentTarget.value)}
                    />
                </Col>
            </Form.Row>
            <Form.Row className='align-items-center'>
                <Col xs='8' className='my-2'>
                    <Button variant='info' type='submit'>
                        Search <BsSearch />
                    </Button>
                </Col>
            </Form.Row>
        </Form>
    );
};

export default TwoPointsSearchBar;
