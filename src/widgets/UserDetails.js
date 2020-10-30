import React, { Component } from "react";
import { isUndefinedOrNull } from "../utils/StringValidator";
import { getUserData } from "../utils/RestUtilCalls";
import ProfileCard from "./ProfileCard";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
export class UserReposDetails extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {},
    };
  }

  componentDidMount() {
    getUserData(this.props.selectedUserData.id, this.success, this.fail);
  }

  success = (value) => {
    let newObj = {};
    if (!isUndefinedOrNull(value)) {
      newObj[value.data.id] = value;
    }
    this.setState({ userDetails: newObj });
  };

  fail(value) {}

  render() {
    return (
      <div>
        <ArrowBackIcon
          onClick={(value) => this.props.showUserDetails(false)}
          style={{ fontSize: 100 }}
        ></ArrowBackIcon>
        <h2>{this.props.adData.company}</h2>

        <ProfileCard
          info={this.props.selectedUserData}
          companyDetail={this.props.adData.text}
        />
      </div>
    );
  }
}

export default UserReposDetails;
