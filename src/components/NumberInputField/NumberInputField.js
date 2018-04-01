import React, { Component } from 'react';

class NumberInputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelID: ''
    }
  }

  componentWillMount() {
    this.setState({
      labelID: `${this.props.elemID}-addon`
    })
  }

  // https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
  onChange = (e) => {
    // const regexDecimals = /^\d+(\.\d{1,2})?$/;
    const regexOnlyNumbers = /^\d+$/;

    if (e.target.value === '' || regexOnlyNumbers.test(e.target.value)) {
      this.props.setValue(e.target.value);
    }
  };

  render() {
    const { elemID, label, value, disabled } = this.props;
    const { labelID } = this.state;

    return (
      <div className="input-group input-group-sm col-xl-2 col-lg-4 vertical-space-sm">
        <div className="input-group-prepend">
          <span className="input-group-text" id={labelID}>{label}</span>
        </div>
        <input
          type="text"
          className="form-control"
          id={elemID}
          aria-describedby={labelID}
          value={value}
          disabled={disabled}
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default NumberInputField;