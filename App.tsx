import RootNavigator from '@/navigation/RootNavigator';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setupInterceptors } from '@/services/api/interceptors';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store';
import GlobalLoading from '@/screens/loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

setupInterceptors();
function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider>
              <KeyboardProvider navigationBarTranslucent>
                <>
                  <RootNavigator />
                  <GlobalLoading />
                  <Toast position="top" topOffset={65} visibilityTime={2000} />
                </>
              </KeyboardProvider >
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
