import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pageButtons = [];

        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                pageButtons.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={currentPage === i ? "active" : ""}
                    >
                        {i}
                    </button>
                );
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                pageButtons.push(<span key={`dots${i}`}>...</span>);
            }
        }

        return pageButtons;
    };

    return <div className="pagination">{renderPageNumbers()}</div>;
};


export default Pagination;
