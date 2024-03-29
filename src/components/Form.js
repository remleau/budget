import React from "react";
import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Input = ({
	onChange,
	value,
	touched,
	error,
	name,
	type,
	disabled,
	placeholder,
	label,
	instruction,
}) => {
	return (
		<label htmlFor="" className="form-field">
			<p>
				{label}
				{instruction && (
					<span className="form-field-instruction">{instruction}</span>
				)}
			</p>
			<div className="form-field-content">
				<input
					type={type}
					name={name}
					className=""
					onChange={onChange}
					value={value}
					disabled={disabled}
					placeholder={placeholder}
				/>
				{touched && error && (
					<div className="form-field-error">
						<span>{error}</span>
					</div>
				)}
			</div>
		</label>
	);
};

export const ImportFiles = ({
	onChange,
	value,
	touched,
	error,
	name,
	type,
	disabled,
	formik,
	id,
}) => {
	const [filesName, setFilesName] = useState(null);

	return (
		<React.Fragment>
			<div className="import-field">
				<p>
					Import files here{" "}
					{filesName &&
						Object.values(filesName)?.map((name, i) => {
							return (
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
										/>
									</svg>
									{name.name}
								</span>
							);
						})}
				</p>
				<input
					type={type}
					name={name}
					id={id}
					className=""
					multiple
					disabled={disabled}
					onChange={(event) => {
						formik.setFieldValue("files", event.currentTarget.files);
						setFilesName(event.currentTarget.files);
					}}
				/>
				{touched && error && (
					<div className="input-field-error">
						<span>{error}</span>
					</div>
				)}
			</div>
		</React.Fragment>
	);
};

export const Select = ({
	onChange,
	value,
	touched,
	error,
	name,
	type,
	disabled,
	placeholder,
	label,
	instruction,
	options,
}) => {
	return (
		<label htmlFor="" className="form-field">
			<p>
				{label}
				{instruction && (
					<span className="form-field-instruction">{instruction}</span>
				)}
			</p>
			<div className="form-field-content">
				<select
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					multiple
				>
					<option value="" label={`Select a ${label}`}>
						Select a {label}(s)
					</option>
					{options?.map((cat) => {
						return (
							<option key={cat?.id} value={cat?.id} label={cat?.name}>
								{cat?.name}
							</option>
						);
					})}
				</select>
				{touched && error && (
					<div className="form-field-error">
						<span>{error}</span>
					</div>
				)}
			</div>
		</label>
	);
};

export const Datepicker = ({
	name,
	label,
	instruction,
	touched,
	error,
	formik,
}) => {
	return (
		<label htmlFor="" className="form-field">
			<p>
				{label}
				{instruction && (
					<span className="form-field-instruction">{instruction}</span>
				)}
			</p>
			<div className="form-field-content">
				<DatePicker
					selected={formik.values[name] && new Date(formik.values[name])}
					onChange={(date) => formik.setFieldValue(name, date)}
					dateFormat="dd/MM/yyyy"
				/>
				{touched && error && (
					<div className="form-field-error">
						<span>{error}</span>
					</div>
				)}
			</div>
		</label>
	);
};

export const Radios = ({
	onChange,
	touched,
	error,
	name,
	type,
	types,
	label,
	instruction,
}) => {
	return (
		<div className="form-field">
			<p>
				{label}
				{instruction && (
					<span className="form-field-instruction">{instruction}</span>
				)}
			</p>
			<div className="form-field-content">
				<div className="radios">
					{types &&
						types.map((t) => (
							<div className="radio" key={t}>
								<input
									type={type}
									name={name}
									className=""
									onChange={onChange}
									value={t}
									id={t}
								/>
								<label htmlFor={t} key={t}>
									<p>{t}</p>
								</label>
							</div>
						))}
				</div>
				{touched && error && (
					<div className="form-field-error">
						<span>{error}</span>
					</div>
				)}
			</div>
		</div>
	);
};
