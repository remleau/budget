import { memo } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import useExpenses from "../hooks/useExpenses";
import FormExpense from "../components/FormExpense";

function PageAddExpense() {
	const { addExpense } = useExpenses();

	const formik = useFormik({
		initialValues: {
			name: "",
			price: "",
			categories: [],
			date: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			price: Yup.string().required("The money goal is required"),
		}),
		async onSubmit(values) {
			let result = await addExpense(values);

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
					<h1>Add a new expense</h1>
				</div>
				<div className="overlay"></div>
			</div>
			<section className="content">
				<form
					onSubmit={formik.handleSubmit}
					className="form"
					encType="multipart/form-data"
				>
					<FormExpense formik={formik} />
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

export default memo(PageAddExpense);