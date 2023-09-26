import { memo } from "react";
import { Datepicker, Input, Select } from "./Form";

import { useGlobalContext } from "../utils/GlobalProvider";
import useCategories from "../hooks/useCategories";

function FormGoal({ formik }) {
	const { user } = useGlobalContext();
	const { categories } = useCategories();

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
					value={formik.values.money_goal}
					touched={formik.touched.money_goal}
					error={formik.errors.money_goal}
					name="money_goal"
					type="number"
					label={"The amount of money to save up"}
					instruction={`Based on ${user.currency}`}
				/>
			</div>
			<div className="form-col">
				<Input
					onChange={formik.handleChange}
					value={formik.values.description}
					touched={formik.touched.description}
					error={formik.errors.description}
					name="description"
					type="text"
					label={"Description of your goal"}
				/>
				<Datepicker
					formik={formik}
					name="due_date"
					label={"Due date of your goal"}
					touched={formik.touched.due_date}
					error={formik.errors.due_date}
				/>
			</div>
			<div className="form-col">
				<Select
					onChange={formik.handleChange}
					value={formik.values.categories}
					touched={formik.touched.categories}
					error={formik.errors.categories}
					name="categories"
					label={"Choose a categorie"}
					options={categories}
				/>
			</div>
		</>
	);
}

export default memo(FormGoal);
