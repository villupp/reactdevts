import * as React from 'react';
import Commit from './models/Commit';

interface CommitListItemProps {
    commit: Commit;
}

class CommitListItem extends React.Component<CommitListItemProps> {
    render() {
        const commit = this.props.commit;
        const commitDate = formattedDate(commit.date);

        return (
            <div className="commit-item">
                <div>{commitDate} | {commit.authorName}</div>
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