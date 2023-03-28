import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useGoals from "../hooks/useGoals";

import DynamicIcon from "../components/DynamicIcon";
import FormGoal from "../components/FormGoal";

import { useFormik } from "formik";
import * as Yup from "yup";

function PageEditGoal() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { goals, updateGoal, deleteGoal } = useGoals();

	const singleGoal = goals?.filter((cat) => cat.id === id).at(0);

	const formik = useFormik({
		initialValues: {
			name: singleGoal?.name || "",
			money_goal: singleGoal?.money_goal || "",
			categories: singleGoal?.categories || "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			money_goal: Yup.string().required("The money goal is required"),
		}),
		async onSubmit(values) {
			await updateGoal(singleGoal.id, values);
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
			<div className="hero" style={style}>
				<div className="hero-content">
					<h1>
						<DynamicIcon name={formik.values.icon} size={40} />
						Edit {formik.values.name} goal
					</h1>
				</div>
				<div className="hero-actions">
					<a href="/#" onClick={() => removeGoal(singleGoal?.id)}>
						<DynamicIcon size={18} name="CiTrash" />
						Delete {singleGoal?.name} goal
					</a>
				</div>
				<div className="overlay"></div>
			</div>
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
					</div>
				</form>
			</section>
		</div>
	);
}

export default memo(PageEditGoal);
