import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useGoals from "../hooks/useGoals";

import DynamicIcon from "../components/DynamicIcon";
import FormGoal from "../components/FormGoal";
import Hero from "../components/Hero";

import { useFormik } from "formik";
import * as Yup from "yup";

function PageEditGoal() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { goal, updateGoal, deleteGoal } = useGoals({ goalId: id });

	const formik = useFormik({
		initialValues: {
			name: goal?.name || "",
			money_goal: goal?.money_goal || "",
			categories: goal?.categories || [],
			description: goal?.description || "",
			due_date: goal?.due_date || "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			money_goal: Yup.string().required("The money goal is required"),
		}),
		async onSubmit(values) {
			await updateGoal(goal.id, values);
		},
	});

	const removeGoal = async (id) => {
		let res = await deleteGoal(id);
		if (res) {
			navigate(ROUTES.GOALS);
		}
	};

	const style = {
		backgroundImage: `url(${
			formik.values.background_image
				? formik.values.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		<div className="page add-categorie">
			<Hero
				title={`Edit ${formik.values.name} goal`}
				style={style}
				actions={
					<button onClick={() => removeGoal(goal?.id)}>
						<DynamicIcon size={18} name="CiTrash" />
						Delete {goal?.name} goal
					</button>
				}
			/>

			<section className="content">
				<form
					onSubmit={formik.handleSubmit}
					className="form"
					encType="multipart/form-data"
				>
					<FormGoal formik={formik} />

					<div className="form-actions">
						<button
							type="submit"
							className={`btn ${
								Object.keys(formik.errors).length === 0 ? "" : "disabled"
							}`}
						>
							Update
						</button>
						{new Date(goal?.due_date).getTime() < new Date().getTime() && (
							<button type="submit" className={`btn`}>
								Archive it
							</button>
						)}
					</div>
				</form>
			</section>
		</div>
	);
}

export default memo(PageEditGoal);
