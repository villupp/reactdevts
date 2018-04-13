import * as React from 'react';

interface TextInputFieldProps {
    label: string;
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

    render() {
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" onChange={this.handleChange} className="text-input" />
            </div>
        );
    }
}

export default TextInputField;