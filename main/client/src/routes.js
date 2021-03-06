import React, { Component } from "react";
import { connect } from "react-redux";

import Profile from "./containers/profile";

import Callback from "./functional/callback";
import UnauthRedirect from "./functional/unauthredirect";
import Home from "./functional/home";
import SignUp from "./functional/signup";

// import ShowUser from "./profile/showuser";
// import SendMessage from "./profile/sendmessage";
// import ShowMessages from "./profile/showmessages";
// import ReplyToMessage from "./profile/replytomessage";

import Posts from "./Blog/posts";
import AddPost from "./Blog/addpost";
import EditPost from "./Blog/editpost";
import ShowPost from "./Blog/showpost";
import SearchResults from "./Blog/searchResults"

import Layout from "./functional/layout"
import NavigationBar from "./functional/navbar"

import * as ACTIONS from "./store/actions/actions";

import Auth from "./utils/auth";
import AuthCheck from "./utils/authcheck";
import history from "./utils/history";

import { Router, Route, Switch, Redirect } from "react-router";

export const auth = new Auth();

const handleAuthentication = props => {
  if (props.location.hash) {
    auth.handleAuth();
  }
};

const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={props =>
      auth.isAuthenticated() === true ? (
        <Component auth={auth} {...props} />
      ) : (
          <Redirect to={{ pathname: "/signup" }} />
        )
    }
  />
);

class Routes extends Component {
  componentDidMount() {
    if (auth.isAuthenticated()) {
      this.props.login_success();
      auth.getProfile();
      setTimeout(() => {
        this.props.add_profile(auth.userProfile);
      }, 400);
    } else {
      this.props.login_failure();
      this.props.remove_profile();
    }
  }

  render() {
    return (
      <Router history={history}>
        <Layout >
          <div className="wrapper">
            <Switch>
              <Route
                exact
                path="/"
                auth={auth}
                component={Home}
                // render={() => <Home auth={auth} />}
              />

              {/* <Route exact path="/form1" component={Form1} /> */}

              {/* <Route
                exact
                path="/container1"
                render={() => <Container1 auth={auth} />}
              /> */}
              
              <Route
                path="/authcheck"
                render={() => <AuthCheck auth={auth} />}
              />
              <Route path="/redirect" component={UnauthRedirect} />
              <Route path="/signup" render={() => <SignUp auth={auth} />} />

              <Route path="/search-results" component={SearchResults} />

              {/* <Route path="/user/:uid" component={ShowUser} /> */}

              {/* <PrivateRoute
                path="/sendmessage"
                auth={auth}
                component={SendMessage}
              />
              <PrivateRoute
                path="/showmessages/:id"
                auth={auth}
                component={ShowMessages}
              />
              <PrivateRoute
                path="/replytomessage"
                auth={auth}
                component={ReplyToMessage}
              /> */}

              <Route path="/posts" component={Posts} />
              <Route path="/post/:pid" component={ShowPost} />
              <Route path="/editpost/:pid" component={EditPost} />
              <Route path="/addpost" component={AddPost} />

              <Route
                path="/callback"
                render={props => {
                  console.log(props)
                  handleAuthentication(props);
                  return <Callback />;
                }}
              />
              {/* <Route
                path="/component1"
                render={props => <Component1 {...props} />}
              /> */}

              {/* <Route path="/listitem/:id" component={RenderListItem} /> */}

              {/* <PrivateRoute
                path="/privateroute"
                auth={auth}
                component={PrivateComponent}
              /> */}
              <PrivateRoute path="/profile" auth={auth} component={Profile} />
            </Switch>
          </div>
        </Layout>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login_success: () => dispatch(ACTIONS.login_success()),
    login_failure: () => dispatch(ACTIONS.login_failure()),
    add_profile: profile => dispatch(ACTIONS.add_profile(profile)),
    remove_profile: () => dispatch(ACTIONS.remove_profile())
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Routes);
