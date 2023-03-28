import { memo } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import useGoals from "../hooks/useGoals";
import FormGoal from "../components/FormGoal";

function PageAddGoal() {
	const { addGoal } = useGoals();

	const formik = useFormik({
		initialValues: {
			name: "",
			money_goal: "",
			categories: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			money_goal: Yup.string().required("The money goal is required"),
		}),
		async onSubmit(values) {
			let result = await addGoal(values);

			if (result) {
				formik.resetForm({
					...formik.initialValues,
				});
			}
		},
	});

	const style = {
		backgroundImage: `url(${
			formik.values.background_image
				? formik.values.background_image
				: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
		})`,
	};

	return (
		<div className="page add-goal">
			<div className="hero" style={style}>
				<div className="hero-content">
					<h1>Add a new goal</h1>
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
							Create
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default memo(PageAddGoal);
