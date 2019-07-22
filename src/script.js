import 'babel-polyfill';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ReactDOM from "react-dom";

const App = lazy(() => import('./app/pages/app/app.js'));

const RouterApp = () => (
	<Router>
		<Suspense fallback={<div><p>{'Загрузка'}</p></div>}>
			<Switch>
				<Route exact path="/" component={App}/>
			</Switch>
		</Suspense>
	</Router>
);

ReactDOM.render(<RouterApp />, document.getElementById("root"));
