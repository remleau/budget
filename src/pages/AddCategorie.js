import { memo, useEffect, useRef } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import useCategories from "../hooks/useCategories";
import FormCategorie from "../components/FormCategorie";

function PageAddCategorie() {
	const { addCategorie } = useCategories();

	const formik = useFormik({
		initialValues: {
			name: "",
			background_image: "",
			icon: "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			background_image: Yup.string().required("The background is required"),
		}),
		async onSubmit(values) {
			let result = await addCategorie(values);

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
		<div className="page add-categorie">
			<section>
				<div className="hero" style={style}>
					<div className="hero-content">
						<h1>Add a new categorie</h1>
					</div>
					<div className="overlay"></div>
				</div>
			</section>
			<section className="content">
				<form
					onSubmit={formik.handleSubmit}
					className="form"
					encType="multipart/form-data"
				>
					<FormCategorie formik={formik} />
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

export default memo(PageAddCategorie);
