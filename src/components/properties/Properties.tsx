import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { Property } from "../../types";
import Pagination from "../common/Pagination";
import SinglePointSearchBar from "../common/SinglePointSearchBar";
import PropertiesTable from "./PropertiesTable";
import PropertyForm from "./PropertyForm";

interface Props {}

const Properties = (props: Props) => {
    const [search, setSearch] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);

    const [properties, setProperties] = useState<Property[]>([]);
    const [property, setProperty] = useState<Property>(null!);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const BASE_URL = "https://localhost:5001/properties";

    const memoFetch = useCallback(async () => {
        const { data: result } = search
            ? await Axios.get(
                  `${BASE_URL}/${latitude}/${longtitude}?pageNumber=${page}&pageSize=10`
              )
            : await Axios.get(`${BASE_URL}?pageNumber=${page}&pageSize=10`);

        setProperties(result.data);
        setPageCount(result.totalPages);
    }, [page, search, latitude, longtitude]);

    useEffect(() => {
        memoFetch();
    }, [memoFetch]);

    const handleSearch = (lat: number, lon: number) => {
        setLatitude(lat);
        setLongtitude(lon);
        setSearch(!search);
    };

    const handleDelete = async (propertie: Property) => {
        const originalPlots = properties;
        const currentPlots = properties.filter((p) => p.id !== propertie.id);
        setProperties(currentPlots);
        try {
            await Axios.delete(
                `${BASE_URL}/${propertie.id}/${propertie.gps.latitude}/${propertie.gps.longitude}`
            );
            memoFetch();
        } catch (error) {
            setProperties(originalPlots);
        }
    };

    const handleModify = async (newProperty: Property) => {
        if (property.id === "") {
            const body = {
                registerNumber: newProperty.registerNumber,
                description: newProperty.description,
                gps: newProperty.gps,
            };
            console.log(body);
            await Axios.post(`${BASE_URL}`, body);
        } else {
            const body = {
                id: property.id,
                latitude: property.gps.latitude,
                longitude: property.gps.longitude,
                property: newProperty,
            };
            await Axios.put(`${BASE_URL}`, body);
        }
        memoFetch();
        setProperty(null!);
    };

    const handleAddButton = () => {
        setProperty({
            id: "",
            description: "",
            registerNumber: 0,
            plots: [],
            gps: {
                latitude: 0,
                longitude: 0,
                latitudeSymbol: "N",
                longitudeSymbol: "W",
            },
        });
    };
    return (
        <Container fluid>
            {!properties && <h2>Here will be properties in a moment...</h2>}

            {properties && !property && (
                <>
                    <Row className='justify-content-md-center m-3'>
                        <SinglePointSearchBar onSearch={handleSearch} cancel={search} />
                    </Row>
                    <Row className='justify-content-md-center'>
                        <PropertiesTable
                            properties={properties}
                            onModify={setProperty}
                            onDelete={handleDelete}
                        />
                    </Row>
                    <Row className='justify-content-md-center'>
                        <Pagination
                            total={pageCount}
                            current={page}
                            onChange={setPage}
                        />
                    </Row>
                </>
            )}

            {property && (
                <PropertyForm
                    property={property}
                    onLeave={() => setProperty(null!)}
                    onSubmit={handleModify}
                />
            )}

            {!property && !search && (
                <Row className='justify-content-md-center'>
                    <Button variant='outline-none' onClick={handleAddButton}>
                        <GrAddCircle size='3em' />
                    </Button>
                </Row>
            )}
        </Container>
    );
};

export default Properties;
