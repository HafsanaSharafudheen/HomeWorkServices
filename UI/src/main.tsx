

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from '../Redux/store';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <ErrorBoundary>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  </ErrorBoundary>,
  document.getElementById('root')
);
