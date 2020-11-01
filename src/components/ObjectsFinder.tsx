import Axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { RiCloseFill } from "react-icons/ri";
import { ObjectInfo } from "../types";
import Pagination from "./common/Pagination";
import TwoPointsSearchBar from "./common/TwoPointsSearchBar";
import ObjectsFinderTable from "./ObjectsFinderTable";

interface Props {}

const ObjectsFinder = (props: Props) => {
    const BASE_URL = "https://localhost:5001/find/";

    const [lat1, setLat1] = useState(0);
    const [lat2, setLat2] = useState(0);
    const [lon1, setLon1] = useState(0);
    const [lon2, setLon2] = useState(0);

    const [objects, setObjects] = useState<ObjectInfo[]>([]);
    const [search, setSearch] = useState(false);

    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const memoFetch = useCallback(async () => {
        const { data: result } = await Axios.get(
            `${BASE_URL}${lat1}/${lon1}/${lat2}/${lon2}?pageNumber=${page}&pageSize=10`
        );

        setObjects(result.data);
        setPageCount(result.totalPages);
    }, [page, lat1, lon1, lat2, lon2]);

    useEffect(() => {
        memoFetch();
    }, [memoFetch]);

    const handleSearch = async (
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    ) => {
        setLat1(lat1);
        setLon1(lon1);
        setLat2(lat2);
        setLon2(lon2);
        setSearch(!search);
    };

    return (
        <Container>
            <Row className='justify-content-md-center m-3'>
                {!search && <TwoPointsSearchBar onSearch={handleSearch} />}
                {search && (
                    <>
                        <h4 className='m-3'>{`Searching from [${lat1}:${lon1}] to [${lat2}:${lon2}]`}</h4>
                        <Button variant='warning' onClick={() => setSearch(false)}>
                            Cancel <RiCloseFill />
                        </Button>
                    </>
                )}
            </Row>
            {search && (
                <>
                    <ObjectsFinderTable objects={objects} />
                    <Row className='justify-content-md-center'>
                        <Pagination
                            current={page}
                            total={pageCount}
                            onChange={setPage}
                        />
                    </Row>
                </>
            )}
        </Container>
    );
};

export default ObjectsFinder;
