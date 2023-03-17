import { memo } from "react";
import { Input } from "./Form";

function FormCategorie({ formik }) {
	return (
		<>
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
					value={formik.values.background_image}
					touched={formik.touched.background_image}
					error={formik.errors.background_image}
					name="background_image"
					type="text"
					label={"background image"}
					instruction="Only domain available: https://unsplash.com"
				/>
				<Input
					onChange={formik.handleChange}
					value={formik.values.icon}
					touched={formik.touched.icon}
					error={formik.errors.icon}
					name="icon"
					type="text"
					label={"Icon name"}
					instruction="Check out icons: https://react-icons.github.io/react-icons/icons?name=ci"
				/>
			</div>
		</>
	);
}

export default memo(FormCategorie);
