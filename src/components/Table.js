import { memo } from "react";
import { NavLink } from "react-router-dom";

import useCurrency from "../hooks/useCurrency";

import { convertDate } from "../utils/fn";
import { ROUTES } from "../utils/Routes";

import TableFilters from "../components/TableFilters";
import Pagination from "../components/Pagination";

function Table({ expenses, setExpenses, columns, categories }) {
	const { convertPrice } = useCurrency();

	return (
		<div className="table">
			{setExpenses && (
				<div className="table-filters">
					<TableFilters setExpenses={setExpenses} categories={categories} />
				</div>
			)}

			<div className="table-columns">
				{columns?.map((column) => (
					<div className="table-column" key={column.header}>
						<div className="table-row">{column.header}</div>
					</div>
				))}
			</div>

			<div className="table-content">
				{columns?.map((column) => (
					<div className="table-column" key={column.accessorKey}>
						{expenses?.map((expense) => (
							<div className="table-row" key={expense.id}>
								<div className="table-row-content">
									{column.accessorKey === "date" ? (
										convertDate(expense[column.accessorKey])
									) : column.accessorKey === "price" ||
									  column.accessorKey === "total" ? (
										convertPrice(expense[column.accessorKey])
									) : column.accessorKey === "name" ? (
										<NavLink
											to={ROUTES.EXPENSE.replace(":id", expense.id.toString())}
										>
											{expense[column.accessorKey]}
										</NavLink>
									) : (
										expense[column.accessorKey]
									)}
								</div>
							</div>
						))}
					</div>
				))}
			</div>

			{setExpenses && (
				<div className="table-paged">
					<Pagination />
				</div>
			)}
		</div>
	);
}

export default memo(Table);
