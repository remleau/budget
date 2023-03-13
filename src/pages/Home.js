import { memo, useEffect, useRef } from 'react';
import { useGlobalContext } from '../utils/GlobalProvider';

import PageProfile from './Profile';

function Home() {
	const { user } = useGlobalContext();

	console.log('user', user);

	return (
		<div className="page home">
			<PageProfile />
		</div>
	);
}

export default memo(Home);
