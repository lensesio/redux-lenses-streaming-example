import React from 'react';

const useTab = (tabs=[]) => {
  if (tabs.length === 0) {
    throw new Error('Tabs list cannot be empty');
  }

  const firstTab = tabs[0];

  const [activeTab, setState] = React.useState(firstTab);

  const setActiveTab = tab => () => {
    if (tabs.includes(tab)) {
        setState(tab);
    }
  };

  const isActiveTab = tab => tab === activeTab;

  return [activeTab, {isActiveTab, setActiveTab}];
};

export default useTab;