import { memo, useEffect, useRef } from "react";
import { useGlobalContext } from "../utils/GlobalProvider";

import { Input } from "../components/Form";
import { useFormik } from "formik";
import * as Yup from "yup";

function PageProfile() {
	const { user, update_user } = useGlobalContext();

	const style = {
		backgroundImage:
			"url(https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)",
	};

	const formik = useFormik({
		initialValues: {
			monthly_income: user.monthly_income || "",
			name: user.name || "",
			currency: user.currency || "",
			prefered_currency: user.prefered_currency || "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			currency: Yup.string().required("The currency is required"),
			monthly_income: Yup.number()
				.typeError("You must specify a number")
				.min(1)
				.required("You must specify a number"),
		}),
		async onSubmit(values) {
			values.currency = values.currency.toUpperCase();
			values.prefered_currency = values.prefered_currency.toUpperCase();
			await update_user(values);
			formik.resetForm({
				...formik.initialValues,
			});
		},
	});

	return (
		<div className="page profile">
			<div className="hero" style={style}>
				<div className="hero-content">
					<h1>Personal information</h1>
				</div>
				<div className="overlay"></div>
			</div>
			<section className="content">
				<form
					onSubmit={formik.handleSubmit}
					className="form"
					encType="multipart/form-data"
				>
					<Input
						onChange={formik.handleChange}
						value={formik.values.name}
						touched={formik.touched.name}
						error={formik.errors.name}
						name="name"
						type="text"
						label={"Name"}
					/>
					<div className="form-col">
						<Input
							onChange={formik.handleChange}
							value={formik.values.monthly_income}
							touched={formik.touched.monthly_income}
							error={formik.errors.monthly_income}
							name="monthly_income"
							type="number"
							label={"Monthly income"}
						/>
						<Input
							onChange={formik.handleChange}
							value={formik.values.currency}
							touched={formik.touched.currency}
							error={formik.errors.currency}
							name="currency"
							type="text"
							label={"Your current currency"}
						/>
						<Input
							onChange={formik.handleChange}
							value={formik.values.prefered_currency}
							touched={formik.touched.prefered_currency}
							error={formik.errors.prefered_currency}
							name="prefered_currency"
							type="text"
							label={"Prefered currency"}
						/>
					</div>

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

export default memo(PageProfile);
