import { memo } from "react";
import DynamicIcon from "./DynamicIcon";

function Hero({ title, style, length, iconName, actions, description }) {
	return (
		<div className="hero">
			<div className="hero-content">
				<h1>
					{iconName && <DynamicIcon name={iconName} size={40} />}

					{title}
					{length && <sup>({length})</sup>}
				</h1>
				{description && <p>{description}</p>}
			</div>

			{actions && <div className="hero-actions">{actions}</div>}
			<div className="overlay"></div>
			<div className="hero-bg" style={style}></div>
		</div>
	);
}

export default memo(Hero);
