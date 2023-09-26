import { memo } from "react";
import { Datepicker, Input, Select, Radios } from "./Form";

import useGoals from "../hooks/useGoals";
import useCategories from "../hooks/useCategories";

function FormExpense({ formik }) {
	const { categories } = useCategories();
	const { goals } = useGoals();

	return (
		<>
			<div className="form-col">
				<Input
					onChange={formik.handleChange}
					value={formik.values.name}
					touched={formik.touched.name}
					error={formik.errors.name}
					name="name"
					type="text"
					label={"Name"}
				/>
				<Input
					onChange={formik.handleChange}
					value={formik.values.price}
					touched={formik.touched.price}
					error={formik.errors.price}
					name="price"
					type="number"
					label={"Price"}
				/>
			</div>
			<div className="form-col">
				<Radios
					onChange={formik.handleChange}
					value={formik.values.type}
					touched={formik.touched.type}
					error={formik.errors.type}
					name="type"
					label={"Choose a type of expense"}
					type="radio"
					types={["goods", "payment", "savings", "stocks"]}
				/>
				<Datepicker
					name="date"
					formik={formik}
					label={"Date of expense"}
					touched={formik.touched.date}
					error={formik.errors.date}
				/>
			</div>
			<div className="form-col">
				<Select
					onChange={formik.handleChange}
					value={formik.values.goals}
					touched={formik.touched.goals}
					error={formik.errors.goals}
					name="goals"
					label={"Goals"}
					options={goals}
				/>
			</div>
			<div className="form-col">
				<Select
					onChange={formik.handleChange}
					value={formik.values.categories}
					touched={formik.touched.categories}
					error={formik.errors.categories}
					name="categories"
					label={"Catégories"}
					options={categories}
				/>
			</div>
		</>
	);
}

export default memo(FormExpense);
