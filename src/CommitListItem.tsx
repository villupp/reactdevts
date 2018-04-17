import * as React from 'react';
import Commit from './models/Commit';

interface CommitListItemProps {
    commit: Commit;
    selected: boolean;
    onSelect(sha: string): void;
}

class CommitListItem extends React.Component<CommitListItemProps> {
    render() {
        const commit = this.props.commit;
        const commitDate = formattedDate(commit.date);
        const className = 'commit-item' + (this.props.selected === true ? ' selected' : '');

        return (
            <div className={className} onClick={() => this.props.onSelect(commit.sha)}>
                <div>{commitDate}</div>
                <div>{commit.authorEmail}</div>
            </div>
        );
    }
}

function formattedDate(dateToFormat: Date) {
    const date = dateToFormat.getDate();
    const month = dateToFormat.getMonth() + 1;
    const year = dateToFormat.getFullYear();
    const hours = dateToFormat.getHours();
    const minutes = dateToFormat.getMinutes();

    let strMinutes = minutes.toString();

    if (minutes.toString().length === 1) {
        strMinutes = '0' + minutes;
    }
    return date + '.' + month + '.' + year + ' ' + hours + '.' + strMinutes;
}

export default CommitListItem;