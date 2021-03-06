import * as React from 'react';
import Commit from './models/Commit';
import Title from './Title';

interface CommitDetailProps {
    commit?: Commit;
}

class CommitDetail extends React.Component<CommitDetailProps> {
    render() {
        const commit = this.props.commit;
        const commitDate = this.props.commit !== undefined ? formattedDate(this.props.commit.date) : '';

        if (commit !== undefined) {
            return (
                <div>
                    <Title additionalClass="commit-details-title" text="Commit Details" />
                    <div className="commit-detail">
                        <table>
                            <tbody>
                                <tr>
                                    <th>SHA</th>
                                    <td>{commit.sha}</td>
                                </tr>
                                <tr>
                                    <th>Message</th>
                                    <td>{commit.message}</td>
                                </tr>
                                <tr>
                                    <th>Author</th>
                                    <td>{commit.authorName} ({commit.authorEmail})</td>
                                </tr>
                                <tr>
                                    <th>Committed on</th>
                                    <td>{commitDate}</td>
                                </tr>
                                <tr>
                                    <th>Additions</th>
                                    <td className="green-text">+{commit.additions}</td>
                                </tr>
                                <tr>
                                    <th>Deletions</th>
                                    <td className="red-text">-{commit.deletions}</td>
                                </tr>
                                <tr>
                                    <th>Total modifications</th>
                                    <td>{commit.totalModifications}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <Title additionalClass="commit-details-title" text="No commit selected" />
                </div>
            );
        }
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

export default CommitDetail;