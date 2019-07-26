import React from 'react';
import Axios from 'axios';
import Issue from './Issue';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';


class Issues extends React.Component {

    state = {
        issues:[],
        isLoading: true
    };

    componentDidMount () {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        console.log(sevenDaysAgo);
        Axios.get(`https://api.github.com/repos/angular/angular/issues?since=${sevenDaysAgo}`)
            .then(results => {
                const issues = results.data;
                console.log(issues);
                this.setState({
                    issues,
                    isLoading: false
                });
            })
            .catch(err => {
                console.error(JSON.stringify(err));
            });
    }

    render () {
        const {
            issues,
            isLoading
        } = this.state;

        return (
          <React.Fragment>
              <h1>Angular Issues</h1>
              <GridList cols={3}>
                  {issues.map((issue, key) => {
                      return (
                          <GridListTile key={key}>
                              <Issue
                                  title={issue.title}
                                  body={issue.body}
                                  user={issue.user.login}
                                  assignee={(issue.assignee && issue.assignee.login) ? issue.assignee.login : 'none'}
                              />
                          </GridListTile>
                      );
                  })}

              </GridList>

          </React.Fragment>
        );
    }
}

export default Issues;