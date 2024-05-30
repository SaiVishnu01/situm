/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SitumPlugin from '@situm/react-native';
import {SITUM_API_KEY, SITUM_DASHBOARD_URL} from './situm';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import SitumNavigation from './src/SitumNavigation/SitumNavigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    try {
      SitumPlugin.init();
      SitumPlugin.setDashboardURL(SITUM_DASHBOARD_URL);
      SitumPlugin.setApiKey(SITUM_API_KEY);
    } catch (e) {
      console.error(`Situm > example > Could not initialize SDK ${e}`);
    }
    checkIOSPermissions();
  }, []);

  const checkIOSPermissions = async () => {
    const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    // Check if already denied
    if (granted !== RESULTS.GRANTED) {
      throw 'Situm > permissions > ACCESS_FINE_LOCATION denied...';
    }

    console.debug(
      'Situm > permissions > LOCATION_WHEN_IN_USE permission granted...',
    );

    return true;
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <SitumNavigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
