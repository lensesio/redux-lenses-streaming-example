import React from 'react';
import { Provider } from 'react-redux';

import { configureStore } from '../config/store';
import { MainContainer}  from './MainContainer';

const store = configureStore();

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
        <MainContainer commit={() => {}} />
      </Provider>
    );
  }
}

export default AppContainer;
