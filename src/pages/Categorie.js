import { memo } from "react";
import { NavLink, useParams } from "react-router-dom";

import useCategories from "../hooks/useCategories";

import DynamicIcon from "../components/DynamicIcon";

function PageCategorie() {
	const { id } = useParams();
	const { categories } = useCategories();

	const singleCategorie = categories?.filter((cat) => cat.id === id).at(0);

	console.log(singleCategorie);

	const style = {
		backgroundImage: `url(${
			singleCategorie?.background_image
				? singleCategorie.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		singleCategorie && (
			<div className="page categories">
				<section>
					<div className="hero" style={style}>
						<div className="hero-content">
							<h1>
								<DynamicIcon name={singleCategorie.icon} size={40} />
								{singleCategorie.name} categorie
							</h1>
						</div>
						<div className="hero-actions">
							<NavLink to={"/edit"}>
								<DynamicIcon size={18} name="CiPen" />
								Edit {singleCategorie.name} categrorie
							</NavLink>

							<NavLink to={"/delete"}>
								<DynamicIcon size={18} name="CiTrash" />
								Delete {singleCategorie.name} categrorie
							</NavLink>
						</div>
						<div className="overlay"></div>
					</div>
				</section>
			</div>
		)
	);
}

export default memo(PageCategorie);
