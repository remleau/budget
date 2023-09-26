import { memo } from "react";
import { convertDate } from "../utils/fn";
import useCurrency from "../hooks/useCurrency";

function Table({ expenses, columns }) {
	const { convertPrice } = useCurrency();

	return (
		<div className="table">
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
									{column.accessorKey == "date"
										? convertDate(expense[column.accessorKey])
										: column.accessorKey == "price"
										? convertPrice(expense[column.accessorKey])
										: expense[column.accessorKey]}
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}

export default memo(Table);
