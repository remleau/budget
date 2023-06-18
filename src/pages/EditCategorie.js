import { memo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ROUTES } from "../utils/Routes";
import useCategories from "../hooks/useCategories";

import DynamicIcon from "../components/DynamicIcon";
import FormCategorie from "../components/FormCategorie";
import { useFormik } from "formik";
import * as Yup from "yup";

function PageEditCategorie() {
	const { id } = useParams();
	const navigate = useNavigate();

	const { categories, updateCategorie, deleteCategorie } = useCategories();

	const singleCategorie = categories?.filter((cat) => cat.id === id).at(0);

	const formik = useFormik({
		initialValues: {
			name: singleCategorie?.name || "",
			background_image: singleCategorie?.background_image || "",
			icon: singleCategorie?.icon || "",
		},
		enableReinitialize: true,
		validationSchema: Yup.object({
			name: Yup.string().required("The name is required"),
			background_image: Yup.string().required("The background is required"),
		}),
		async onSubmit(values) {
			await updateCategorie(singleCategorie.id, values);
		},
	});

	const removeCat = async (id) => {
		let res = await deleteCategorie(id);
		if (res) {
			navigate(ROUTES.CATEGORIES);
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
						Edit {formik.values.name} categorie
					</h1>
				</div>
				<div className="hero-actions">
					<button onClick={() => removeCat(singleCategorie?.id)}>
						<DynamicIcon size={18} name="CiTrash" />
						Delete {singleCategorie?.name} categrorie
					</button>
				</div>
				<div className="overlay"></div>
			</div>
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
							Update
						</button>
					</div>
				</form>
			</section>
		</div>
	);
}

export default memo(PageEditCategorie);
