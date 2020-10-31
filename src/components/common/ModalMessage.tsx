import React from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
    show: boolean;
    title: string;
    text: string;
    onHide: () => void;
}

const ModalMessage = ({ show, title, text, onHide, ...props }: Props) => {
    return (
        <Modal
            show={show}
            size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id='contained-modal-title-vcenter'>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <h4>Centered Modal</h4> */}
                <p>{text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='info' onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalMessage;
