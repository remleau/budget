import * as Icons from "react-icons/ci";

export default function DynamicIcon({ name, size = "40" }) {
	const IconComponent = Icons[name];

	if (!IconComponent) {
		// Return a default one
		return <Icons.CiBank size={size} />;
	}

	return <IconComponent size={size} />;
}
