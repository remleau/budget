import React, { memo } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

function Pagination() {
	const { paged, setPaged } = useGlobalContext();

	const handlePageClick = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= paged.totalPages) {
			setPaged({
				page: pageNumber,
				nbPerPage: paged.nbPerPage,
				totalPages: paged.totalPages,
			});
		}
	};

	const getPageNumbers = () => {
		const pageNumbers = [];
		for (
			let i = Math.max(1, paged.page - 2);
			i <= Math.min(paged.totalPages, paged.page + 2);
			i++
		) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	};

	const pageNumbers = getPageNumbers();

	return (
		paged.totalPages > 1 && (
			<div className="pagination">
				<button
					onClick={() => handlePageClick(paged.page - 1)}
					disabled={paged.page === 1}
				>
					Previous
				</button>
				{pageNumbers.map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => handlePageClick(pageNumber)}
						className={paged.page === pageNumber ? "active" : ""}
					>
						{pageNumber}
					</button>
				))}
				<button
					onClick={() => handlePageClick(paged.page + 1)}
					disabled={paged.page === paged.totalPages}
				>
					Next
				</button>
			</div>
		)
	);
}

export default memo(Pagination);
