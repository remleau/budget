import { memo, useRef, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { ROUTES } from "../utils/Routes";

import { Mousewheel } from "swiper";

import useExpenses from "../hooks/useExpenses";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import Table from "../components/Table";
import DynamicIcon from "../components/DynamicIcon";
import Hero from "../components/Hero";

function PageExpenses() {
	const swiperRef = useRef(null);

	const { expenses, setExpenses } = useExpenses();

	const columns = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Name",
				size: 25,
			},
			{
				accessorKey: "price",
				header: "Price",
				size: 25,
			},
			{
				accessorKey: "date",
				header: "Date",
				size: 25,
			},
			{
				accessorKey: "type",
				header: "Type",
				size: 25,
			},
		],
		[]
	);

	const style = {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
	};

	return (
		<div className="page expenses">
			<Hero title={`My expenses`} length={expenses?.length} style={style} />

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
						<NavLink to={ROUTES.ADDEXPENSE}>
							<div className="swiper-card">
								<div className="swiper-card-content button-card">
									<DynamicIcon size={40} name="CiSquarePlus" />
									<p>Add an expense</p>
								</div>
							</div>
						</NavLink>
					</SwiperSlide>
					{expenses?.map((expense) => {
						return (
							<SwiperSlide key={expense.id}>
								<NavLink
									to={ROUTES.EXPENSE.replace(":id", expense.id.toString())}
								>
									<div className="swiper-card">
										<div className="swiper-card-content">
											<p>{expense.name}</p>
										</div>
									</div>
								</NavLink>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>
			<section className="content">
				<h3>Lastest expenses of this month</h3>

				<Table
					expenses={expenses}
					setExpenses={setExpenses}
					columns={columns}
				/>
			</section>
		</div>
	);
}

export default memo(PageExpenses);
