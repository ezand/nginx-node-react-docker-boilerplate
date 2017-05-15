import React from "react";
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";
import {createStore} from "redux";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import logo from "./logo.svg";
import "./App.css";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const customHistory = createBrowserHistory();

function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
}

let store = createStore(counter);

store.subscribe(() =>
    console.log("You have clicked 'Home' " + store.getState() + " time" + (store.getState() > 1 ? "s" : "") + "...")
);

const handleHomeClick = () => {
    store.dispatch({type: 'INCREMENT'});
};

const Status = ({code, children}) => (
    <Route render={({staticContext}) => {
        if (staticContext)
            staticContext.status = code
        return children
    }}/>
);

const NotFound = () => (
    <Status code={404}>
        <div>
            <h1>Sorry, can’t find that.</h1>
        </div>
    </Status>
);

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
);

const About = () => (
    <div>
        <h2>About</h2>
        <RaisedButton
            label="Go to topics"
            containerElement={<Link to="/topics"/>}/>
    </div>
);

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
);

const Topics = ({match}) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
            <h3>Please select a topic.</h3>
        )}/>
    </div>
);

const App = () => (
    <MuiThemeProvider>
        <Router history={customHistory}>
            <div className="App">
                <div className="AppHeader">
                    <img src={logo} className="AppLogo" alt="logo"/>

                    <ul className="Navigation">
                        <li><Link to="/" onClick={handleHomeClick.bind(this)}>Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>
                </div>

                <div className="Content">
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/topics" component={Topics}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </div>
        </Router>
    </MuiThemeProvider>
);

export default App
