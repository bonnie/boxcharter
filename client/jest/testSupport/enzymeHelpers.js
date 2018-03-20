// from https://github.com/jacek-rzrz/react-integration-tests-enzyme/blob/master/src/test_support/enzymeHelpers.js

export const click = enzymeNode => enzymeNode.simulate('click', {button: 0});

export const setValue = (enzymeNode, value) => {
    enzymeNode.simulate('change', {target: {value}});
    enzymeNode.simulate('blur');
};

export const submit = enzymeNode => enzymeNode.simulate('submit');
