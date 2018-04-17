import * as React from 'react';

interface TitleProps {
    text: string;
    additionalClass: string;
}

class Title extends React.Component<TitleProps> {
    render() {
        const titleText = this.props.text;
        const classes = 'outer' + (this.props.additionalClass !== '' ? ` ${this.props.additionalClass}` : '');

        return (
            <div className={classes}>
                <div className="middle">
                    <div className="inner">
                        <b>{titleText}</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default Title;