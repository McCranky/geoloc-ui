import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Plot } from "../types";
import Pagination from "./common/Pagination";
import PlotForm from "./PlotForm";
import PlotsTable from "./PlotsTable";

interface Props {}

const Plots = (props: Props) => {
    const [plots, setPlots] = useState<Plot[]>([]);
    const [plot, setPlot] = useState<Plot>(null!);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const BASE_URL = "https://localhost:5001/";

    useEffect(() => {
        const fetchData = async () => {
            const result = await (
                await Axios.get(`${BASE_URL}plots?pageNumber=${page}&pageSize=10`)
            ).data;
            setPlots(result.data);
            setPageCount(result.totalPages);
        };
        fetchData();
    }, [page, plot]);

    const handleDelete = async (plot: Plot) => {
        const originalPlots = plots;
        const currentPlots = plots.filter((p) => p.id !== plot.id);
        setPlots(currentPlots);
        try {
            await Axios.delete(
                `${BASE_URL}plots/${plot.id}/${plot.gps.latitude}/${plot.gps.longtitude}`
            );
        } catch (error) {
            setPlots(originalPlots);
        }
    };

    const handleModify = (newPlot: Plot) => {
        const body = {
            id: plot.id,
            latitude: plot.gps.latitude,
            longtitude: plot.gps.longtitude,
            plot: newPlot,
        };
        Axios.put(`${BASE_URL}plots`, body);
    };

    return (
        <Container>
            {!plots && <h2>Here will be plots in a moment...</h2>}

            {plots && !plot && (
                <Row className='justify-content-md-center'>
                    <PlotsTable
                        plots={plots}
                        onModify={setPlot}
                        onDelete={handleDelete}
                    />
                    <Pagination total={pageCount} current={page} onChange={setPage} />
                </Row>
            )}

            {plot && (
                <PlotForm
                    plot={plot}
                    onLeave={() => setPlot(null!)}
                    onSubmit={handleModify}
                />
            )}
        </Container>
    );
};

export default Plots;
