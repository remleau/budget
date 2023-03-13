import React, { memo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { ROUTES } from '../utils/Routes';
import { useGlobalContext } from '../utils/GlobalProvider';

import Avatar from './Avatar';
import { CiBank, CiVault, CiFolderOn, CiUser, CiPlug1 } from 'react-icons/ci';

function Header() {
	const { logout, user } = useGlobalContext();

	return (
		<header>
			<Avatar />

			<div className="menu">
				<ul>
					<li>
						<NavLink to={ROUTES.ROOT}>
							<CiUser size={18} />
							<span>Home</span>
						</NavLink>
					</li>

					<li>
						<NavLink to={ROUTES.BUDGETS}>
							<CiVault size={18} />
							<span>Budgets</span>
						</NavLink>
					</li>

					<li>
						<NavLink to={ROUTES.STOCKS}>
							<CiBank size={18} />
							<span>Stocks</span>
						</NavLink>
					</li>

					<li>
						<NavLink to={ROUTES.CATEGORIES}>
							<CiFolderOn size={18} />
							<span>Categories</span>
						</NavLink>
					</li>
				</ul>
			</div>

			{user && (
				<div className="logout">
					<button onClick={() => logout()}>
						<CiPlug1 size={18} />
						<span>Logout</span>
					</button>
				</div>
			)}
		</header>
	);
}

export default memo(Header);
