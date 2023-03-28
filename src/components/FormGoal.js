import { memo } from "react";
import { Input, Select } from "./Form";

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
					type="text"
					label={"The amount of money to save up"}
					instruction={`Based on ${user.currency}`}
				/>
			</div>
			<Select
				onChange={formik.handleChange}
				value={formik.values.categories}
				touched={formik.touched.categories}
				error={formik.errors.categories}
				name="categories"
				label={"Choose a categorie"}
				categories={categories}
			/>
		</>
	);
}

export default memo(FormGoal);
