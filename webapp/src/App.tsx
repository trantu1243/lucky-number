import 'reset-css';
import 'swiper/css';
import './scss/index.scss';
import {Provider} from 'react-redux';
import {persistor, store} from './store/index';
import {PersistGate} from 'redux-persist/integration/react';

import {StackNavigator} from './navigation/StackNavigator';

function App() {
  return (
    <div id='app'>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}
        >
          <StackNavigator />
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
