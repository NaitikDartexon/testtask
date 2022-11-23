import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/components/LoginScreen';
import SplashScreen from './src/components/splashScreen';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import {allReducer} from './src/stateManage/reducers';
import RootSaga from './src/stateManage/sagas/rootSaga';
import LoadProduct from './src/components/LoadProduct';
import OrderProduct from './src/components/OrderProduct';
import AddProduct from './src/components/AddProduct';
import MyProduct from './src/components/MyProduct';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PersistGate} from 'redux-persist/integration/react';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, allReducer);

const Stack = createNativeStackNavigator();

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
  let persistor = persistStore(store);

  sagaMiddleware.run(RootSaga);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="splashScreen"
              component={SplashScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="loginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="loadProduct"
              component={LoadProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="orderProduct"
              component={OrderProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="addProduct"
              component={AddProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="myProduct"
              component={MyProduct}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
