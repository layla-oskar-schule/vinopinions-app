import React, { useCallback, useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { AppNavigator } from './navigation/bottom-tab-navigator';
import * as eva from '@eva-design/eva';
import { Appearance, ColorSchemeName } from 'react-native';
import { NativeModules } from 'react-native';
import { FontAwesome5IconsPack } from './utils/icon-adapter';

const App = () => {
    const colorScheme = Appearance.getColorScheme();
    const [theme, setTheme] = useState<ColorSchemeName>();

    const themeChangeListener = useCallback(() => {
        setTheme(Appearance.getColorScheme());
    }, []);

    useEffect(() => {
        Appearance.addChangeListener(themeChangeListener);
    }, [themeChangeListener]);

    return (
        <>
            <IconRegistry icons={FontAwesome5IconsPack} />
            <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark : eva.light}>
                <AppNavigator />
            </ApplicationProvider>
        </>
    );
};

NativeModules.DevSettings.setIsDebuggingRemotely(false);
registerRootComponent(App);

export default App;
