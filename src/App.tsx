import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Header from "./Components/Header";
import Search from "./Routes/Search";
import PlayMedia from "./Routes/Play";

function App(){
	return (
		<Router>
			<Header/>
			<Switch>
				<Route path="/tv"><Tv/></Route>
				<Route path="/search"><Search/></Route>
				<Route path="/:media/:movieId/play"><PlayMedia/></Route>
				<Route path={["/","/movies/:movieId"]}>
					<Home/>
					<Redirect to="/" />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;