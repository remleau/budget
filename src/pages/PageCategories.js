import { memo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/Routes";
import { Mousewheel } from "swiper";

import useCategories from "../hooks/useCategories";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import DynamicIcon from "../components/DynamicIcon";
import Hero from "../components/Hero";

function PageCategories() {
	const swiperRef = useRef(null);
	const { categories } = useCategories();

	const style = {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
	};

	return (
		<div className="page categories">
			<Hero title={`My categories`} length={categories?.length} style={style} />

			<section className="slider">
				<Swiper
					ref={swiperRef}
					slidesPerView={"auto"}
					spaceBetween={20}
					slidesOffsetAfter={75}
					modules={[Mousewheel]}
					mousewheel={true}
				>
					<SwiperSlide>
						<NavLink to={ROUTES.ADDCATEGORIE}>
							<div className="swiper-card">
								<div className="swiper-card-content button-card">
									<DynamicIcon size={40} name="CiSquarePlus" />
									<p>Add a categorie</p>
								</div>
							</div>
						</NavLink>
					</SwiperSlide>
					{categories?.map((categorie) => {
						return (
							<SwiperSlide key={categorie.id}>
								<NavLink
									to={ROUTES.CATEGORIE.replace(":id", categorie.id.toString())}
								>
									<div className="swiper-card">
										<div className="swiper-card-content">
											<DynamicIcon size={40} name={categorie.icon} />
											<p>{categorie.name}</p>
										</div>
									</div>
								</NavLink>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>
		</div>
	);
}

export default memo(PageCategories);
