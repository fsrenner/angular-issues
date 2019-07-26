import React from 'react';
import 'typeface-roboto';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Issues from './Issues';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    control: {
        padding: theme.spacing(2),
    }
}));

function App() {
    const classes = useStyles();
    const [spacing] = React.useState(2);
  return (
    <React.Fragment>
      <Container maxWidth="lg">

          <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                  <Grid container justify="center" spacing={spacing}>
                      <Issues/>
                  </Grid>
              </Grid>
          </Grid>
          {/*<div className={classes.root}>*/}
              {/*<Grid container spacing={3}>*/}
                  {/*<Grid item xs={12}>*/}
                    {/*<Issues />*/}
                  {/*</Grid>*/}
              {/*</Grid>*/}
          {/*</div>*/}
      </Container>
    </React.Fragment>
  );
}

export default App;
