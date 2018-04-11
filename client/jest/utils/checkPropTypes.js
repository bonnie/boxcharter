import React from 'react'
import checkPropTypes from 'check-prop-types';

/**
 * Check propTypes for a component and given set of props, using check-prop-types
 * @param component - react component
 * @param props {object} - props to pass to this component for this test
 */
export const checkProps = (component, props) => {
  return checkPropTypes(component.propTypes, props, 'prop', component.name)
}

export const generateRequiredError = (propName, component) => {
  return `Failed prop type: The prop \`${propName}\` is marked as required in \`${component.name}\`, but its value is \`undefined\`.`;
}

export const generateTypeError = (propName, component, correctType, incorrectType) => {
  return `Failed prop type: Invalid prop \`${propName}\` of type \`${incorrectType}\` supplied to \`${component.name}\`, expected \`${correctType}\`.`;
}