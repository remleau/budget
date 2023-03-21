import { memo, useRef } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/Routes";
import { Mousewheel } from "swiper";

import useGoals from "../hooks/useGoals";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import DynamicIcon from "../components/DynamicIcon";

function PageGoals() {
	const swiperRef = useRef(null);
	const { goals } = useGoals();

	const style = {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
	};

	return (
		<div className="page goals">
			<section>
				<div className="hero" style={style}>
					<div className="hero-content">
						<h1>
							My goals <sup>({goals?.length})</sup>
						</h1>
					</div>
					<div className="overlay"></div>
				</div>
			</section>
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
						<NavLink to={ROUTES.ADDGOAL}>
							<div className="swiper-card">
								<div className="swiper-card-content">
									<DynamicIcon size={40} name="CiSquarePlus" />
									<p>Add a goal</p>
								</div>
							</div>
						</NavLink>
					</SwiperSlide>
					{goals?.map((goal) => {
						return (
							<SwiperSlide key={goal.id}>
								<NavLink to={ROUTES.GOAL.replace(":id", goal.id.toString())}>
									<div className="swiper-card">
										<div className="swiper-card-content">
											<p>{goal.name}</p>
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

export default memo(PageGoals);
