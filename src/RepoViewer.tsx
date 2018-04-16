import * as React from 'react';
import Repository from './models/Repository';
import Commit from './models/Commit';
import Service from './Service';
import TextInputField from './TextInputField';
import RepoInfo from './RepoInfo';

interface RepoViewerProps {
    value: string;
}

interface RepoViewerState {
    repoName: string;
    repo?: Repository;
    commits?: Array<Commit>;
    selectedCommit?: string;
}

class RepoViewer extends React.Component<RepoViewerProps, RepoViewerState> {
    searchTimeout: number;

    constructor(props: RepoViewerProps) {
        super(props);
        this.state = {
            repoName: '',
            repo: undefined,
            commits: undefined,
            selectedCommit: undefined
        };
        this.searchTimeout = 0;
        this.onRepoNameChange = this.onRepoNameChange.bind(this);
        this.onCommitSelect = this.onCommitSelect.bind(this);
    }

    onCommitSelect(sha: string) {
        this.setState({
            selectedCommit: sha
        });
    }

    onRepoNameChange(repoName: string) {
        if (this.searchTimeout !== 0) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = 0;
        }

        this.setState({
            repo: undefined
        });

        this.searchTimeout = window.setTimeout(
            () => {
                let service = new Service();
                service.getRepo(repoName)
                    .then((repo: Repository) => {
                        this.setState({
                            repo: repo
                        });
                        return service.getCommits(repo.fullName);
                    })
                    .then((commits: Array<Commit>) => {
                        this.setState({
                            commits: commits
                        });
                        clearTimeout(this.searchTimeout);
                        this.searchTimeout = 0;
                    })
                    .catch((err) => {
                        this.setState({
                            repo: undefined
                        });
                        clearTimeout(this.searchTimeout);
                        this.searchTimeout = 0;
                    });
            },
            500);
    }

    render() {
        const repo = this.state.repo;
        const commits = this.state.commits;
        const selectedCommit = this.state.selectedCommit;
        const initialRepoName = 'villupp/reactdev';
        const textInputIdentifier = 'repo-name';

        return (
            <div className="repo-viewer">
                <TextInputField
                    label="Repository name: "
                    className="repo-name-input"
                    onChange={this.onRepoNameChange}
                    initialValue={initialRepoName}
                    identifier={textInputIdentifier}
                />
                <RepoInfo
                    repo={repo}
                    commits={commits}
                    onCommitSelect={this.onCommitSelect}
                    selectedCommit={selectedCommit}
                />
            </div>
        );
    }
}

export default RepoViewer;
