import * as React from 'react';
import CommitList from './CommitList';
import CommitDetail from './CommitDetail';
import Repository from './models/Repository';
import Commit from './models/Commit';

interface RepoInfoProps {
    repo?: Repository;
    commits?: Array<Commit>;
}

export default class RepoInfo extends React.Component<RepoInfoProps> {
    render() {
        const repo = this.props.repo;
        const commits = this.props.commits;
        const selectedCommit = commits !== undefined && commits.length > 0 ? commits[0] : undefined;

        if (repo != null) {
            return (
                <div className="repo-info">
                    <div className="left">
                        <div className="commits-title"><b>Commits</b></div>
                        <CommitList commits={commits} />
                    </div>
                    <div className="right">
                        <CommitDetail commit={selectedCommit} />
                    </div>
                </div>
            );
        } else {
            return (
                <div>No repo given</div>
            );
        }
    }
}