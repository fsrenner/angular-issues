import React from 'react';
import Axios from 'axios';
import ReactPaginate from 'react-paginate';
import Issue from './Issue';

class Issues extends React.Component {

    state = {
        issues:[],
        totalPages: 0,
        page: 1,
        isLoading: true
    };

    fetchIssuesData = (date, page) => {
        this.setState({
            isLoading: true
        })
        Axios.get(`https://api.github.com/repos/angular/angular/issues?since=${date}&page=${page}`)
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
                    issues,
                    isLoading: false
                });
            })
            .catch(err => {
                console.error(JSON.stringify(err));
            });
    }

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
                totalPages = Number(totalPages);
                console.info("Total Pages:", totalPages)
                this.setState({
                    totalPages
                });
            });
        this.fetchIssuesData(sevenDaysAgo, this.state.page);
    }

    handlePageClick = data => {
        let selected = data.selected + 1;
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        console.log(selected);
        this.fetchIssuesData(sevenDaysAgo, selected);
    }

    render () {
        const { 
            issues,
            totalPages,
            isLoading
         } = this.state;

        return (
            <React.Fragment>
                <div className="formatter">
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
                {(isLoading) 
                    ? <div class="text-right">
                        <div class="spinner-border text-primary" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </div>
                    : null}
                </div>
                <div className="card">
                    {issues.map(issue => {
                        return <Issue title={issue.title} body={issue.body} user={issue.user} assignee={issue.assignee} />;
                    })}
                </div>
            </React.Fragment>
        );
    }
}

export default Issues;