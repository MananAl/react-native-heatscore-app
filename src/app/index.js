import React, { useEffect } from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { messaging, notifications } from 'react-native-firebase';
import PushNotification from 'react-native-push-notification';

import AppLoading from './app-loading.component';
import { appMappings, appThemes } from './app-theming';
import { SplashImage } from '../components/splash-image.component';
import { AppNavigator } from '../navigation/app.navigator';
import { Theming } from '../services/theme.service';
import { VectorIconsPack } from './vector-icons-pack';
import { store, persistor } from '../redux/store';
import { ApiService } from '../services/api.service';
import { CheckPermissionAndReturnFcmToken } from '../libs/fcm_utils';


const defaultConfig = {
    userToken: null,
    mapping: 'eva',
    theme: 'dark',
};

const App = ({ userToken }) => {
    const [mappingContext, currentMapping] = Theming.useMapping(appMappings, defaultConfig.mapping);
    const [themeContext, currentTheme] = Theming.useTheming(appThemes, defaultConfig.mapping, defaultConfig.theme);

    const sendFcmToken = async () => {
        try {
            const fcmToken = await CheckPermissionAndReturnFcmToken();
            if (fcmToken) {
                await ApiService.post('/notifications/register', { token: fcmToken });
            }
        }
        catch (error) {
            console.warn('Error', error);
        };
    }

    const foregroundNotificationsListener = () => {
        // to process message broadcasted from onMessageReceived method
        // const messageListener = messaging().onMessage((message) => {
        //     console.log("onMessage", message);
        //     PushNotification.localNotification({
        //         message: remoteMessage.notification.body,
        //         title: remoteMessage.notification.title,
        //         bigPictureUrl: remoteMessage.notification.android.imageUrl,
        //         smallIcon: remoteMessage.notification.android.imageUrl,
        //     });
        // })

        notifications().onNotification((notification) => {
            console.log(notification)
            // notification.android.setChannelId(notification.data.channelId);
            // notifications().displayNotification(notification);
        });

        // get notification data when notification is clicked when app is in foreground
        const notificationOpenedListener = notifications().onNotificationOpened((notificationData) => {
            console.log("onNotificationOpened", notificationData);
        });

        // get notification data when notification is clicked to open app when app is in background
        notifications().getInitialNotification()
            .then((notificationData) => {
                console.log("getInitialNotification", notificationData);
            });

        return () => {
            messageListener();
            notificationOpenedListener();
        }
    }

    useEffect(() => {
        sendFcmToken();
        return foregroundNotificationsListener();
    }, []);

    return (
        <React.Fragment>
            <IconRegistry icons={[EvaIconsPack, VectorIconsPack]} />
            <AppearanceProvider>
                <ApplicationProvider {...currentMapping} theme={currentTheme}>
                    <Theming.MappingContext.Provider value={mappingContext}>
                        <Theming.ThemeContext.Provider value={themeContext}>
                            <SafeAreaProvider>
                                <AppNavigator />
                            </SafeAreaProvider>
                        </Theming.ThemeContext.Provider>
                    </Theming.MappingContext.Provider>
                </ApplicationProvider>
            </AppearanceProvider>
        </React.Fragment>
    );
};

const Splash = ({ loading }) => (
    <SplashImage
        loading={loading}
        source={require('../assets/images/image-splash.png')}
    />
);

export default () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AppLoading
                initialConfig={defaultConfig}
                placeholder={Splash}>
                {props => <App {...props} />}
            </AppLoading>
        </PersistGate>
    </Provider>
);
