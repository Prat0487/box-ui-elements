import React from 'react';
import { shallow } from 'enzyme';
import ErrorMask from 'box-react-ui/lib/components/error-mask/ErrorMask';
import InlineError from 'box-react-ui/lib/components/inline-error/InlineError';
import withErrorHandling from '../withErrorHandling';
import {
    SKILLS_UNAUTHORIZED_REQUEST_ERROR,
    SKILLS_FORBIDDEN_REQUEST_ERROR,
    SKILLS_INVALID_REQUEST_ERROR,
    SKILLS_NOT_FOUND_ERROR,
    SKILLS_INTERNAL_SERVER_ERROR,
    SKILLS_UNKNOWN_ERROR
} from '../../../constants';

describe('components/withErrorHandling', () => {
    const WrappedComponent = () => <div />;
    const WithErrorHandlingComponent = withErrorHandling(WrappedComponent);

    const getWrapper = (props) => shallow(<WithErrorHandlingComponent {...props} />);
    const fakeMessage = {
        id: 'foo',
        description: 'bar',
        defaultMessage: 'baz'
    };

    test('should render a ErrorMask', () => {
        const props = {
            maskError: {
                errorHeader: fakeMessage
            }
        };
        const wrapper = getWrapper(props);

        expect(wrapper.find(ErrorMask)).toHaveLength(1);
        expect(wrapper.find(WrappedComponent).exists()).toBe(false);

        expect(wrapper).toMatchSnapshot();
    });

    test('should render a ErrorMask with sub header', () => {
        const props = {
            maskError: {
                errorHeader: fakeMessage,
                errorSubHeader: fakeMessage
            }
        };
        const wrapper = getWrapper(props);

        expect(wrapper.find(ErrorMask)).toHaveLength(1);
        expect(wrapper.find(WrappedComponent).exists()).toBe(false);

        expect(wrapper).toMatchSnapshot();
    });

    test('should render an ErrorMask if both maskError and inlineError props passed', () => {
        const props = {
            maskError: {
                errorHeader: fakeMessage
            },
            inlineError: {
                title: fakeMessage,
                content: fakeMessage
            }
        };
        const wrapper = getWrapper(props);

        expect(wrapper.find(ErrorMask)).toHaveLength(1);
        expect(wrapper.find(InlineError).exists()).toBe(false);
        expect(wrapper.find(WrappedComponent).exists()).toBe(false);
    });

    test('should render an ErrorMask if an error code is passed', () => {
        const errorCodes = [
            SKILLS_UNAUTHORIZED_REQUEST_ERROR,
            SKILLS_FORBIDDEN_REQUEST_ERROR,
            SKILLS_INVALID_REQUEST_ERROR,
            SKILLS_NOT_FOUND_ERROR,
            SKILLS_INTERNAL_SERVER_ERROR,
            SKILLS_UNKNOWN_ERROR
        ];

        errorCodes.forEach((errorCode) => {
            const props = {
                errorCode
            };
            const wrapper = getWrapper(props);
            expect(wrapper.find(ErrorMask)).toHaveLength(1);
            expect(wrapper.find(InlineError).exists()).toBe(false);
            expect(wrapper.find(WrappedComponent).exists()).toBe(false);
            expect(wrapper).toMatchSnapshot();
        });
    });

    test('should render an InlineError, along with the wrapped component', () => {
        const props = {
            inlineError: {
                title: fakeMessage,
                content: fakeMessage
            }
        };
        const wrapper = getWrapper(props);

        expect(wrapper.find(ErrorMask).exists()).toBe(false);
        expect(wrapper.find(InlineError)).toHaveLength(1);
        expect(wrapper.find(WrappedComponent)).toHaveLength(1);

        expect(wrapper).toMatchSnapshot();
    });

    test('should render the wrapped component', () => {
        const props = {};
        const wrapper = getWrapper(props);

        expect(wrapper.find(ErrorMask).exists()).toBe(false);
        expect(wrapper.find(InlineError).exists()).toBe(false);
        expect(wrapper.find(WrappedComponent)).toHaveLength(1);
        expect(wrapper).toMatchSnapshot();
    });
});
