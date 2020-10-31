import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { GrAddCircle } from "react-icons/gr";
import { Plot } from "../../types";
import Pagination from "../common/Pagination";
import SinglePointSearchBar from "../common/SinglePointSearchBar";
import PlotForm from "./PlotForm";
import PlotsTable from "./PlotsTable";

interface Props {}

const Plots = (props: Props) => {
    const [search, setSearch] = useState(false);
    const [latitude, setLatitude] = useState(0);
    const [longtitude, setLongtitude] = useState(0);

    const [plots, setPlots] = useState<Plot[]>([]);
    const [plot, setPlot] = useState<Plot>(null!);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const BASE_URL = "https://localhost:5001/plots";

    const memoFetch = useCallback(async () => {
        const { data: result } = search
            ? await Axios.get(
                  `${BASE_URL}/${latitude}/${longtitude}?pageNumber=${page}&pageSize=10`
              )
            : await Axios.get(`${BASE_URL}?pageNumber=${page}&pageSize=10`);

        setPlots(result.data);
        setPageCount(result.totalPages);
    }, [page, search, latitude, longtitude]);

    useEffect(() => {
        memoFetch();
        console.log("Effect!");
    }, [memoFetch]);

    const handleSearch = (lat: number, lon: number) => {
        setLatitude(lat);
        setLongtitude(lon);
        setSearch(!search);
    };

    const handleDelete = async (plot: Plot) => {
        const originalPlots = plots;
        const currentPlots = plots.filter((p) => p.id !== plot.id);
        setPlots(currentPlots);
        try {
            await Axios.delete(
                `${BASE_URL}/${plot.id}/${plot.gps.latitude}/${plot.gps.longitude}`
            );
            memoFetch();
        } catch (error) {
            setPlots(originalPlots);
        }
    };

    const handleModify = async (newPlot: Plot) => {
        if (plot.id === "") {
            const body = {
                number: newPlot.number,
                description: newPlot.description,
                gps: newPlot.gps,
            };
            console.log(body);
            await Axios.post(`${BASE_URL}`, body);
        } else {
            const body = {
                id: plot.id,
                latitude: plot.gps.latitude,
                longitude: plot.gps.longitude,
                plot: newPlot,
            };
            await Axios.put(`${BASE_URL}`, body);
        }
        memoFetch();
        setPlot(null!);
    };

    const handleAddButton = () => {
        setPlot({
            id: "",
            description: "",
            number: 0,
            properties: [],
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
            {!plots && <h2>Here will be plots in a moment...</h2>}

            {plots && !plot && (
                <>
                    <Row className='justify-content-md-center m-3'>
                        <SinglePointSearchBar onSearch={handleSearch} cancel={search} />
                    </Row>
                    <Row className='justify-content-md-center'>
                        <PlotsTable
                            plots={plots}
                            onModify={setPlot}
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

            {plot && (
                <PlotForm
                    plot={plot}
                    onLeave={() => setPlot(null!)}
                    onSubmit={handleModify}
                />
            )}

            {!plot && !search && (
                <Row className='justify-content-md-center'>
                    <Button variant='outline-none' onClick={handleAddButton}>
                        <GrAddCircle size='3em' />
                    </Button>
                </Row>
            )}
        </Container>
    );
};

export default Plots;
