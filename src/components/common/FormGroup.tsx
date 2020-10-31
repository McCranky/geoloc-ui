import React from "react";
import { Col, Form, Row } from "react-bootstrap";

interface Props {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
}

const FormGroup = ({ label, type, value, onChange, ...props }: Props) => {
    return (
        <Form.Group as={Row}>
            <Form.Label column sm={2}>
                {label}
            </Form.Label>
            <Col sm={10}>
                <Form.Control
                    type={type}
                    value={value}
                    onChange={(input) => onChange(input.currentTarget.value)}
                />
            </Col>
        </Form.Group>
    );
};

export default FormGroup;
