/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import * as Caml from 'orn_sample-camlbundle';

import {
  Button,
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
import {caml_greeting} from 'orn_sample-camlbundle';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  console.log(Caml);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [, updateRefreshCounter] = useState<number>(0);
  const stepRefreshCounter = () => {
    updateRefreshCounter(x => x + 1);
  };

  const [replResult, setReplResult] = useState<any | null>(null);
  const [replInput, setReplInput] = useState<string>('(no-input-yet)');
  const replEval = async (input: string) => {
    setReplInput(input);
    setReplResult(await Caml.caml_repl_eval(input));
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>





          <Section title="われわれのGreeting領域">
            <Text>{`Caml Greeting: ${Caml.caml_greeting()}`}</Text>
            <Button title={'Greet me again!'} onPress={stepRefreshCounter} />
          </Section>
          <Section title="われわれのREPL領域">
            <View style={{flex: 1, flexDirection: 'row', columnGap: 2}}>
              <Button title={'Test'} onPress={() => replEval('test')} />
              <Button title={'X Value'} onPress={() => replEval('var_x')} />
              <Button title={'bump'} onPress={() => replEval('bump')} />
              <Button title={'100'} onPress={() => replEval('100')} />
              <Button title={'reset'} onPress={() => replEval('reset')} />
            </View>
            <Text>{'\n'}</Text>
            <Text>{`eval input: ${replInput}`}</Text>
            <Text>{'\n'}</Text>
            {replResult === null ? (
              <Text>no result yet</Text>
            ) : (
              <Text>{`eval result: ${JSON.stringify(
                replResult,
                null,
                2,
              )}`}</Text>
            )}
          </Section>





          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
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
