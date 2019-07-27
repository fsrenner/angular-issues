import React from 'react';
import PropTypes from 'prop-types';


const Issue = props => {

    const {
        title,
        body,
        user,
        assignee
    } = props;

    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <h6 className="card-title">{user}</h6>
                <p className="card-text">{body}</p>
            </div>
            <div className="card-footer">
                <small className="text-muted">Assignee: {assignee}</small>
            </div>
        </div>
    );
};

Issue.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
};

export default Issue;