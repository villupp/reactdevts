import * as React from 'react';

const ID_PREFIX = 'text-input-field-';

interface TextInputFieldProps {
    identifier: string;
    label: string;
    initialValue?: string;
    className?: string;
    onChange(repoName: string): void;
}

class TextInputField extends React.Component<TextInputFieldProps> {
    constructor(props: TextInputFieldProps) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.props.onChange(e.currentTarget.value);
    }

    componentDidMount() {
        if (this.props.initialValue !== undefined) {
            var el = document.getElementById(ID_PREFIX + this.props.identifier);
            if (el !== undefined) {
                (el as HTMLInputElement).value = this.props.initialValue;
                this.props.onChange(this.props.initialValue);
            }
        }
    }

    render() {
        var identifier = ID_PREFIX + this.props.identifier;
        return (
            <div className={this.props.className}>
                <label>{this.props.label}</label>
                <input id={identifier} type="text" onChange={this.handleChange} className="text-input" />
            </div>
        );
    }
}

export default TextInputField;