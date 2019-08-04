import React from 'react';
import useTab from './useTab';
import {mount} from 'enzyme';

const Component = () => {
  const [activeTab, {isActiveTab, setActiveTab}] = useTab(['a', 'b']);

  return (
    <div>
      {activeTab}

      <button onClick={setActiveTab('b')}></button>
    </div>
  )
}

describe('useTab', () => {
  test('first tab is active', () => {
    const wrapper = mount(<Component />);

    expect(wrapper.text()).toEqual('a');
  })

  test('setTab changes active tab', () => {
    const wrapper = mount(<Component />);

    wrapper.find('button').simulate('click')
    expect(wrapper.text()).toEqual('b');
  })

  test('isActivetab works as expected', () => {
    const Component = () => {
      const [activeTab, {isActiveTab, setActiveTab}] = useTab(['a', 'b']);

      return (
        <div>
          {isActiveTab('a') && 'a'}
          {isActiveTab('b') && 'b'}
        </div>
      )
    }

    const wrapper = mount(<Component />);

    expect(wrapper.text()).toEqual('a');
  })
})