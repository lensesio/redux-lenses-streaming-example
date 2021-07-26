import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '../config/store';
import { MainContainer}  from './MainContainer';

const store = configureStore();

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainContainer commit={() => {}} />
      </Provider>
    );
  }
}

ReactDOM.render(<AppContainer />, document.getElementById('main'));

export default AppContainer;
