import React from "react";
import { Pagination as BPagination } from "react-bootstrap";

interface Props {
    total: number;
    current: number;
    onChange: (page: number) => void;
}

const Pagination = ({ total, current, onChange, ...props }: Props) => {
    return (
        <BPagination>
            <BPagination.First disabled={current === 1} onClick={() => onChange(1)} />
            <BPagination.Prev
                disabled={current < 2}
                onClick={() => onChange(current - 1)}
            />
            <BPagination.Item active>{current}</BPagination.Item>
            <BPagination.Next
                disabled={current > total - 1}
                onClick={() => onChange(current + 1)}
            />
            <BPagination.Last
                disabled={current === total}
                onClick={() => onChange(total)}
            />
        </BPagination>
    );
};

export default Pagination;
