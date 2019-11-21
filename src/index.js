import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {Store} from './chat'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
<Provider store={Store}>
  <App />
</Provider>, 
  document.getElementById('root')); 


serviceWorker.unregister();
