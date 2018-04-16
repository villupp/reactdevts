import * as React from 'react';
import CommitListItem from './CommitListItem';
import Commit from './models/Commit';

interface CommitListProps {
    commits?: Array<Commit>;
    selectedCommit?: string;
    onSelect(sha: string): void;
}

class CommitList extends React.Component<CommitListProps> {
    render() {
        let commits = new Array<JSX.Element>();

        if (this.props.commits != null) {
            commits = this.props.commits.map((commit) => {
                let selected = false;
                if (commit.sha === this.props.selectedCommit) {
                    selected = true;
                }
                return (
                    <CommitListItem
                        key={commit.sha}
                        commit={commit}
                        selected={selected}
                        onSelect={this.props.onSelect}
                    />
                );
            });
        }

        if (commits.length > 0) {
            return (
                <div className="commit-list">
                    {commits}
                </div>
            );
        } else {
            return (
                <div>No commits.</div>
            );
        }
    }
}

export default CommitList;