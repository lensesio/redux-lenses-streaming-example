import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import './assets/styles/style.scss';

import AppContainer from './app/containers/AppContainer';

ReactDOM.render(
  <StrictMode>
    <AppContainer />
  </StrictMode>,
  document.getElementById('root')
);
