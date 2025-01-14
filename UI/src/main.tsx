

import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import store, { persistor } from '../Redux/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const initialOptions = {
  "client-id": "AZvdJQvVytG9mCVbAg4sBe21TsLdm31x2lRizu1JPVzi0nVgURZn1e6rxUwbkDJHchkcfzdiWsOmRFWN",
  currency: "USD",
};
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <PayPalScriptProvider options={initialOptions}>
      <App />
      </PayPalScriptProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
