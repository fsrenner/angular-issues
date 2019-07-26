import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 500,
    }
}));

const Issue = (props) => {
    const classes = useStyles();
    const {
        title,
        body,
        user,
        assignee
    } = props;
    return(
        <Card className={classes.card}>
            <CardHeader
                title={title}
                subheader={user}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {body}
                </Typography>
            </CardContent>
            <Typography>{assignee}</Typography>
        </Card>
    );
};

export default Issue;