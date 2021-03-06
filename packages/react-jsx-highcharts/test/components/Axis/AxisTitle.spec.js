import React from 'react';
import { createMockProvidedAxis } from '../../test-utils'
import AxisTitle from '../../../src/components/Axis/AxisTitle';

describe('<Axis.Title />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};

    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });
    testContext.axisStubs = axisStubs;

    testContext.propsFromProviders = {
      getAxis
    };
  });

  describe('when mounted', () => {
    it('sets the correct axis title', () => {
      mount(<AxisTitle {...testContext.propsFromProviders}>My Axis Title</AxisTitle>);
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(expect.objectContaining({
         text: 'My Axis Title'
      }), expect.any(Boolean));
    });

    it('should pass additional props too', () => {
      mount(<AxisTitle {...testContext.propsFromProviders} align="high">My Axis Title</AxisTitle>);
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(expect.objectContaining({
         text: 'My Axis Title', align: 'high'
      }), expect.any(Boolean));
    });
  });

  describe('update', () => {
    it('should setTitle the correct axis title if the component props change', () => {
      const wrapper = mount(<AxisTitle {...testContext.propsFromProviders}>My Axis Title</AxisTitle>);
      wrapper.setProps({ axisId: 'myAxis', dimension: 'x', children: 'New Title' });
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(expect.objectContaining({
         text: 'New Title'
      }), expect.any(Boolean));
    });
  });

  describe('when unmounted', () => {
    it('removes the correct axis title (if the axis still exists)', () => {
      const wrapper = mount(<AxisTitle {...testContext.propsFromProviders}>My Axis Title</AxisTitle>);
      wrapper.unmount();
      expect(testContext.axisStubs.setTitle).toHaveBeenCalledWith(expect.objectContaining({
         text: null
      }), expect.any(Boolean));
    });
  });
});
