import { memo } from "react";

function Search({ goals, onFilter }) {
	return (
		<div className="search">
			<input type="text" onChange={onFilter} />
		</div>
	);
}

export default memo(Search);
