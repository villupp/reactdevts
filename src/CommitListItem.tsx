import * as React from 'react';
import Commit from './models/Commit';

interface CommitListItemProps {
    commit: Commit;
}

class CommitListItem extends React.Component<CommitListItemProps> {
    render() {
        const commit: Commit = this.props.commit;

        return (
            <div className="commit-list">
                <h4>{commit.sha}</h4>
                <div>{commit.authorName}</div>
                <div>{commit.authorEmail}</div>
                <div>{commit.message}</div>
            </div>
        );
    }
}

export default CommitListItem;