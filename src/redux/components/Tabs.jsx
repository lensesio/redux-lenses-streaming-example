import React from 'react';

export const useTab = (tabs=[]) => {
  if (tabs.length === 0) {
    throw new Error('Tabs list cannot be empty');
  }

  const [activeTab, setState] = React.useState('list');

  const setActiveTab = tab => () => {
    if (tabs.includes(tab)) {
        setState(tab);
    }
  };

  const isActiveTab = tab => tab === activeTab;

  return [activeTab, {isActiveTab, setActiveTab}];
};
