import * as React from 'react';
import CommitList from './CommitList';
import CommitDetail from './CommitDetail';
import Repository from './models/Repository';
import Commit from './models/Commit';
import Title from './Title';

interface RepoInfoProps {
    repo?: Repository;
    commits?: Array<Commit>;
    selectedCommit?: string;
    onCommitSelect(sha: string): void;
}

export default class RepoInfo extends React.Component<RepoInfoProps> {
    getCommitBySha(sha?: string) {
        const commits = this.props.commits;
        if (commits !== undefined) {
            for (const commit of commits) {
                if (commit.sha === sha) {
                    return commit;
                }
            }
        }
        return undefined;
    }

    render() {
        const repo = this.props.repo;
        const commits = this.props.commits;
        const selectedCommit = this.getCommitBySha(this.props.selectedCommit);

        if (repo != null) {
            return (
                <div className="repo-info">
                    <div className="left">
                        <Title additionalClass="commits-title" text={`Commits (${repo.name})`} />
                        <CommitList
                            commits={commits}
                            onSelect={this.props.onCommitSelect}
                            selectedCommit={this.props.selectedCommit}
                        />
                    </div>
                    <div className="right">
                        <CommitDetail commit={selectedCommit} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="repo-info">
                    <div className="left">
                        <Title additionalClass="commits-title" text="No repo given" />
                        <CommitList
                            commits={commits}
                            onSelect={this.props.onCommitSelect}
                            selectedCommit={this.props.selectedCommit}
                        />
                    </div>
                    <div className="right">
                        <CommitDetail commit={selectedCommit} />
                    </div>
                </div>
            );
        }
    }
}