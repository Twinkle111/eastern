import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Button, Link } from "@material-ui/core";
import { isUndefinedOrNull } from "../utils/StringValidator";
import { getUserList } from "../utils/RestUtilCalls";

const classes = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextPageAvailable: true,
      prevPageAvailable: false,
      currentPageNo: 1,
    };
    this.handleSearchIconClick = this.onUserNameClick.bind(this);
    this.getListItems = this.getListItems.bind(this);
  }

  componentDidMount() {
    this.getUserList(this.state.currentPageNo);
  }

  getUserList = (pageNumber) => {
    getUserList(pageNumber, this.success, this.fail);
  };

  fail(value) {
    console.log(value);
  }

  success = (value) => {
    if (!isUndefinedOrNull(value)) {
      let newObj = {};
      value.data.forEach((element) => {
        newObj[element.id] = element;
      });
      this.setState({
        nextPageAvailable: value.total_pages > value.page,
        prevPageAvailable: value.page > 1,
        currentPageNo: value.page,
      });
      this.props.setUserList(newObj, value.ad);
    }
  };

  onUserNameClick = (event) => {
    let key = event.target.getAttribute("id");
    this.props.setSelectedUserData(this.props.userList[key]);
    this.props.showUserDetails(true);
  };

  getList = () => {
    let usersList = this.props.userList;
    if (isUndefinedOrNull(usersList)) {
      usersList = {};
    }

    let userListItems = Object.entries(usersList).map((entry) => {
      let key = entry[0];
      let value = entry[1];
      return (
        <div>
          {this.getListItems(
            key,
            value.avatar,
            value.first_name + " " + value.last_name,
            "email: " + value.email
          )}
          <Divider variant="inset" component="li" />
        </div>
      );
    });

    return (
      <List className={classes.root}>
        {userListItems.length > 0 ? (
          <div>
            <h2>{this.props.adData.company}</h2>
            <h4>{this.props.adData.text}</h4>
            {userListItems}
          </div>
        ) : (
          ""
        )}
      </List>
    );
  };

  getListItems(key, avatar, link, details) {
    return (
      <ListItem key={key} alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link id={key} onClick={this.onUserNameClick}>
              {link}
            </Link>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {details}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    );
  }

  render() {
    return (
      <div>
        <h1>TODO</h1>
        <Button
          variant="contained"
          color="primary"
          disabled={this.state.nextPageAvailable}
          onClick={() => this.getUserList(this.state.currentPageNo - 1)}
        >
          Previous Page
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={this.state.prevPageAvailable}
          onClick={() => this.getUserList(this.state.currentPageNo + 1)}
        >
          Next Page
        </Button>
        {this.getList()}
      </div>
    );
  }
}
