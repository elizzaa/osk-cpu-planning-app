import React, { Component } from 'react';

class NumberInputField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelID: '',
      errorStatus: false
    }
  }

  componentWillMount() {
    this.setState({
      labelID: `${this.props.elemID}-addon`
    })
  }

  // https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
  onChange = (e) => {
    const { required } = this.props;

    // const regexDecimals = /^\d+(\.\d{1,2})?$/;
    const regexOnlyNumbers = /^\d+$/;

    if (e.target.value === '' || regexOnlyNumbers.test(e.target.value)) {
      const value = e.target.value;

      // update displayed value
      this.props.setValue(value);

      if (required) {
        // check if valid
        const errorStatus = (value.length === 0);
        this.setState({ errorStatus });
      }
    }
  };

  render() {
    const { elemID, label, value, disabled } = this.props;
    const { labelID, errorStatus } = this.state;

    return (
    <div className="col-xl-2 col-lg-4 vertical-space-sm">
      <div className="input-group input-group-sm">
        <div className="input-group-prepend">
          <span className={"input-group-text " + (errorStatus && "input-error")} id={labelID}>
            {label}
          </span>
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

      {
        errorStatus &&
        <p className="error-msg">
          {'Lauks ir obligāts'}
        </p>
      }
    </div>
    );
  }
}

export default NumberInputField;