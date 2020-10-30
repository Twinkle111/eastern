import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ProfileCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.info.avatar}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {props.info.first_name + " " + props.info.last_name}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="h6">
            {props.info.email}
          </Typography>
          <Divider variant="inset" component="li" />
          <Typography variant="body2" color="textSecondary" component="p">
            {props.companyDetail}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
