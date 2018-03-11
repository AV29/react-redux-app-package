import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icons from './Icons.js';
import * as colors from '../../../constants/colors';
import * as dimensions from '../../../constants/dimensions';

/**
 * @description Icon component.
 * Represents separate svg Icon rendered as a React component
 * @example <Icon icon='logo' width={20} height={20} color='tomato'/>
 * @function
 * @name Icon
 * @param {string} props.icon A string representing svg icon. Icons taken from './icons'. Default - 'logo'. If invalid icon name passed '*' will be rendered.
 * @param {number} props.width Represents width for icon. Default - 20.
 * @param {number} props.height Represents height for icon. Default - 20.
 * @param {string} props.color Represents color for svg icon. Could be passed either like #fff or fff or any valid native browser color name (e.g. 'tomato', 'bluesky' etc.). Default - 'ffffff'.
 * @param {string} props.className Custom class name for icon wrapper
 * @param {string} props.title Title for the Icon wrapper
 * @param {function} props.onClick click handler for Icon
 */
function Icon(props) {

  const {
    icon = 'logo',
    width = dimensions.DEFAULT_ICON_SIZE,
    height = dimensions.DEFAULT_ICON_SIZE,
    color = colors.DEFAULT_SVG_ICON_COLOR,
    className,
    onClick,
    title
  } = props;

  const isHexColorName = (color) => {
    const length = color.length;
    if (length === 3 || length === 6) {
      for (let i = 0; i < length; i += length / 3) {
        if (!parseInt(color.slice(i, i + (length / 3)), 16)) {
          return false;
        }
      }
    }
    return true;
  };

  const getColor = (color) => {
    if (color[0] !== '#' && isHexColorName(color)) {
      return `#${color}`;
    } else {
      return color;
    }
  };

  const onClickHandler = (event) => {
    onClick && onClick(event);
  };

  const IconComponent = Icons[icon];

  const topLevelClassName = classNames([
    'icon',
    {[className]: className}
  ]);

  return (
    <div
      className={topLevelClassName}
      onClick={onClickHandler}
      title={title}
    >
      {
        IconComponent ?
          <IconComponent
            width={width}
            height={height}
            fill={getColor(color)}
          /> :
          '*'
      }
    </div>
  );
}

export default Icon;

Icon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
};
