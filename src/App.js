import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import * as actions from "./actions/Action";
import UsersList from "./widgets/UsersList";
import UserDetails from "./widgets/UserDetails";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUserDetails: false,
    };
  }

  handleVisibilityOfUserDetail = (show) => {
    this.setState({ showUserDetails: show });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.showUserDetails ? (
            <div>
              <UsersList
                userList={this.props.userList}
                setUserList={this.props.setUserList}
                setSelectedUserData={this.props.setSelectedUserData}
                showUserDetails={this.handleVisibilityOfUserDetail}
                adData={this.props.adData}
              />
            </div>
          ) : (
            <UserDetails
              adData={this.props.adData}
              selectedUserData={this.props.selectedUserData}
              showUserDetails={this.handleVisibilityOfUserDetail}
            />
          )}
          <h3>Eastern Enterprise - Twinkle Jain</h3>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserList: (userList, adData) =>
      dispatch(actions.setUserList(userList, adData)),
    setSelectedUserData: (userData) =>
      dispatch(actions.setSelectedUserData(userData)),
  };
};

const mapStateToProps = (state) => ({
  userList: state.appReducer.userList,
  adData: state.appReducer.adData,
  selectedUserData: state.appReducer.selectedUserData,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
