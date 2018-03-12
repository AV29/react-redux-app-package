/* eslint-disable react/no-multi-comp*/
import React from 'react';
import {bool, number, string, func, oneOf, oneOfType, object, array} from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Select from 'react-select';
import Highlighter from 'react-highlight-words';

/**
 * @description SelectInput component.
 * Represents a Select control with ability to filter by input value. Utilizes 'react-select' package {@link https://github.com/JedWatson/react-select}
 * @example
 <SelectInput
 name="yourName"
 onChange={handleChange}
 value={this.state.value}
 className="your-class-name"
 disabled
 label="Your Label"
 placeholder="Your placeholder"
 options={[{value: '1', label: 'One'},{value: '2', label: 'Two'}]}
 />
 * @function
 * @name SelectInput
 * @param {object} props Properties for SelectInput component.
 * @param {string} props.placeholder placeholder for SelectInput."Select..." by default.
 * @param {array} props.options Array of value and label pairs. Represent select options.
 * @param {function} props.onChange Function to handle select input value change. Required.
 * @param {function} props.onFocus Function to handle select input focus event.
 * @param {function} props.onBlur Function to handle select input blur event.
 * @param {string} props.className Class name to extend select input's class name.
 * @param {boolean} props.disabled Defines whether select input will be disabled or not. Default - 'false'
 * @param {string} props.label defines select inputs's label and binds it to input itself.
 * @param {string} props.name Name property for label being bounded to select input.
 * @param {string} props.value select input's value.
 * @param {string} props.llamaStyle Represents one of predefined basic styles for SelectInput. One of 'primary', 'bordered'. Default - 'primary'.
 * @param {boolean} props.touched Optional param. Could be passed via Redux representing that select input is touched.
 * @param {boolean} props.error Optional param. Could be passed via Redux representing that select input has validation error.
 * @param {boolean} props.searchable Optional param. Set or Unset SelectInput filter functionality. Default value is true.
 * @param {boolean} props.optionRenderer Optional param. Rendering options as passed. Default - with text Highlighter.
 * @param {boolean} props.arrowRenderer Optional param. Rendering arrow for dropdown. Default - <Icon icon="close"/>.
 * @param {boolean} props.readOnly Optional param. readOnly Optional param. Could be passed via Redux representing that select is read only.
 * @param {boolean} props.required Optional param to place an asterisk that determines that this field is required.
 */

function SelectInput(props) {

  const colors = {
    DEFAULT_TEXT_COLOR: '666666'
  };

  let inputValue;

  const defaultOptionRenderer = option => (
    <OptionRenderer
      option={option}
      value={value}
      inputValue={inputValue}
    />
  );

  const defaultArrowRenderer = () => (
    <Icon
      icon="arrowDown"
      color={colors.DEFAULT_TEXT_COLOR}
      className="drop-down-arrow"
    />
  );

  const {
    name,
    placeholder,
    className,
    label,
    options = [],
    required,
    onChange,
    onFocus,
    onBlur,
    value,
    disabled,
    llamaStyle = 'primary',
    touched,
    error,
    searchable,
    arrowRenderer = defaultArrowRenderer,
    optionRenderer = defaultOptionRenderer,
    readOnly = false
  } = props;

  const finalLabel = required ? <span>{label}<strong className="required-asterisk"> *</strong></span> : label;

  const handleBlur = () => {
    onBlur && onBlur();
  };

  const handleFocus = () => {
    onFocus && onFocus();
  };

  const extendedClassName = classNames({
    [llamaStyle]: llamaStyle
  }, {disabled}, {'read-only': readOnly});
  return (
    <div className={classNames(['select-input-component', {[className]: className}])}>
      <div className={classNames(
        'select-input-wrapper',
        {disabled},
        {'has-error': touched && error})}
      >
        <label
          className={extendedClassName}
          htmlFor={name}
        >
          {finalLabel}
        </label>
        <div
          id={name ? `select-field-${name.toLowerCase()}` : 'select-field'}
          className="select-field"
        >
          <Select
            type="text"
            name={name}
            placeholder={placeholder}
            className={extendedClassName}
            value={value}
            onChange={readOnly ? () => {
            } : onChange}
            onFocus={handleFocus}
            onBlur={() => handleBlur()} // https://github.com/JedWatson/react-select/issues/1129
            onInputChange={(value) => inputValue = value}
            disabled={disabled}
            options={options}
            optionRenderer={optionRenderer}
            arrowRenderer={arrowRenderer}
            autoBlur
            clearable={false}
            multi={false}
            simpleValue
            searchable={searchable}
            readOnly={readOnly}
          />
          <span className={classNames([
            'error',
            {'has-error': touched && error}
          ])}
          >{error}</span>
        </div>
      </div>
    </div>
  );
}

SelectInput.propTypes = {
  name: string.isRequired,
  className: string,
  placeholder: string,
  label: string,
  options: array,
  onChange: func.isRequired,
  value: oneOfType([string, number]),
  disabled: bool,
  llamaStyle: oneOf(['primary', 'bordered']),
  touched: bool,
  error: string,
  onFocus: func,
  onBlur: func,
  searchable: bool,
  optionRenderer: func,
  arrowRenderer: func,
  readOnly: bool,
  required: bool
};

function OptionRenderer({option, value, inputValue}) {
  return (
    <span className="select-input-custom-option">
      {
        typeof option.label === 'string' ?
          <Highlighter
            highlightClassName="highlight"
            searchWords={[inputValue]}
            textToHighlight={option.label}
          /> :
          option.label
      }
      {
        value === option.value &&
        <Icon
          icon="check"
          className="select-option-checkmark"
          width={10}
          height={10}
        />
      }
    </span>
  );
}

OptionRenderer.propTypes = {
  option: object,
  inputValue: oneOfType([string, number]),
  value: oneOfType([string, number])
};

export default SelectInput;
