import React from 'react';
import Axios from 'axios';
import Issue from './Issue';

class Issues extends React.Component {

    state = {
        issues:[],
        totalPages: 0,
        page: 1
    };

    componentDidMount () {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        console.log(sevenDaysAgo);
        Axios.head(`https://api.github.com/repos/angular/angular/issues?since=${sevenDaysAgo}`)
            .then(response => {
                let totalPages = response.headers.link.split(',');
                totalPages = totalPages[totalPages.length - 1];
                totalPages = totalPages.split(';');
                totalPages = totalPages[0];
                totalPages = totalPages.split('&');
                totalPages = totalPages[totalPages.length - 1];
                totalPages = totalPages.replace('page=', '');
                totalPages = totalPages.replace('>', '');
                console.info("Total Pages:", totalPages)
                this.setState({
                    totalPages
                });
            });
        Axios.get(`https://api.github.com/repos/angular/angular/issues?since=${sevenDaysAgo}`)
            .then(results => {
                const data = results.data;
                const issues = data.map(issue => {
                    return {
                        title: issue.title,
                        body: issue.body,
                        user: issue.user.login,
                        assignee: (issue.assignee && issue.assignee.login) ? issue.assignee.login : 'None'
                    }
                });
                console.log(JSON.stringify(issues, null, 2));
                this.setState({
                    issues
                });
            })
            .catch(err => {
                console.error(JSON.stringify(err));
            });
    }

    render () {
        const { issues } = this.state;

        return (
          <div className="card">
              {issues.map(issue => {
                  return <Issue title={issue.title} body={issue.body} user={issue.user} assignee={issue.assignee} />;
              })}
          </div>
        );
    }
}

export default Issues;