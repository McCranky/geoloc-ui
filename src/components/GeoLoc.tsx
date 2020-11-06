import Axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Col, Container, Form, Jumbotron, Row } from "react-bootstrap";
import { FaCloudDownloadAlt, FaCloudUploadAlt } from "react-icons/fa";
import ModalMessage from "./common/ModalMessage";

interface Props {}

const GeoLoc = (props: Props) => {
    const BASE_URL = "https://localhost:5001/";
    const [plots, setPlots] = useState("");
    const [properties, setProperties] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState("");
    const [modalTitle, setModalTitle] = useState("");
    const [seedPlotsCount, setSeedPlotsCount] = useState("");
    const [seedPropertiesCount, setSeedPropertiesCount] = useState("");

    const fetchInfo = async () => {
        const { data } = await Axios.get(`${BASE_URL}storageInfo`);
        setPlots(data.plotsCount);
        setProperties(data.propertiesCount);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const handleLoad = async () => {
        setModalTitle("Load info");
        try {
            const { data } = await Axios.get(`${BASE_URL}load`);
            setModalText(
                `Successfully loaded ${data.plotsCount} plots and ${data.propertiesCount} properties to database.`
            );
            fetchInfo();
        } catch (error) {
            setModalText("Something went wrong while loading data on server.");
            console.log(error);
        }
        setShowModal(true);
    };

    const handleSave = async () => {
        setModalTitle("Save info");
        try {
            const { data } = await Axios.get(`${BASE_URL}save`);
            setModalText(
                `Successfully saved ${data.plotsCount} plots and ${data.propertiesCount} properties to local file.`
            );
        } catch (error) {
            setModalText("Something went wrong while saving data on server.");
            console.log(error);
        }
        setShowModal(true);
    };

    const handleSeed = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setModalTitle("Seed info");
        try {
            const response = await Axios.get(
                `${BASE_URL}seed?plotsCount=${+seedPlotsCount}&propertiesCount=${+seedPropertiesCount}`
            );
            console.log(response);
            setModalText(`Data sccessfully seeded.`);
            fetchInfo();
        } catch (error) {
            setModalText("Something went wrong while seeding data on server.");
            console.log(error);
        }
        setShowModal(true);
    };

    return (
        <>
            <Container>
                <Jumbotron>
                    <h2>🌍️ GeoLoc 🌍️</h2>
                    <h4>{`There are currently ${plots} plots and ${properties} properties in database.`}</h4>
                </Jumbotron>
                <Row className='justify-content-md-center m-3'>
                    <Button className='m-3' variant='success' onClick={handleLoad}>
                        Load data <FaCloudUploadAlt />
                    </Button>
                    <Button className='m-3' variant='info' onClick={handleSave}>
                        Save data <FaCloudDownloadAlt />
                    </Button>
                </Row>
                <Row className='justify-content-md-center m-3'>
                    <Form onSubmit={handleSeed}>
                        <Form.Row className='align-items-center'>
                            <Col sm={3} className='my-1'>
                                <Form.Label htmlFor='inlineFormInputPlots' srOnly>
                                    Plots
                                </Form.Label>
                                <Form.Control
                                    id='inlineFormInputPlots'
                                    placeholder='Plots'
                                    value={seedPlotsCount}
                                    onChange={(input) =>
                                        setSeedPlotsCount(input.currentTarget.value)
                                    }
                                />
                            </Col>
                            <Col sm={3} className='my-1'>
                                <Form.Label htmlFor='inlineFormInputProperties' srOnly>
                                    Properties count
                                </Form.Label>
                                <Form.Control
                                    id='inlineFormInputProperties'
                                    placeholder='Properties'
                                    value={seedPropertiesCount}
                                    onChange={(input) =>
                                        setSeedPropertiesCount(
                                            input.currentTarget.value
                                        )
                                    }
                                />
                            </Col>
                            <Col xs='auto' className='my-1'>
                                <Button variant='warning' type='submit'>
                                    Seed
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Row>
            </Container>
            <ModalMessage
                show={showModal}
                title={modalTitle}
                text={modalText}
                onHide={() => setShowModal(false)}
            />
        </>
    );
};

export default GeoLoc;
