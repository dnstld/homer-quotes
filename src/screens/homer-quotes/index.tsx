import { RockSalt_400Regular, useFonts } from '@expo-google-fonts/rock-salt';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

const quotesArray = [
  'Nobody -- that’s my name. Nobody -- so my mother and father call me, all my friends.',
  'Her gifts were mixed with good and evil both.',
  'Man is the vainest of all creatures that have their being upon earth.',
  'There is a time for making speeches, and a time for going to bed.',
  'For there is nothing better in this world than that man and wife should be of one mind in a house.',
  'Be strong, saith my heart; I am a soldier; I have seen worse sights than this.',
  'The proud heart feels not terror nor turns to run and it is his own courage that kills him.',
  'I say no wealth is worth my life!',
  'My life is more to me than all the wealth of Ilius',
  'If only the gods are willing. They rule the vaulting skies. They’re stronger than I to plan and drive things home.',
];

const RandomQuoteApp = () => {
  const [quote, setQuote] = useState('');
  const [availableQuotes, setAvailableQuotes] = useState([...quotesArray]);

  const [fontsLoaded, fontError] = useFonts({
    RockSalt_400Regular,
  });

  useEffect(() => {
    pickRandomQuote();
  });

  const pickRandomQuote = () => {
    if (availableQuotes.length === 0) {
      // If all quotes have been picked, reset the array
      setAvailableQuotes([...quotesArray]);
    }

    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];

    // Remove the selected quote from the availableQuotes array
    const updatedQuotes = availableQuotes.filter(
      (_, index) => index !== randomIndex,
    );

    setQuote(selectedQuote);
    setAvailableQuotes(updatedQuotes);

    if (updatedQuotes.length === 0) {
      // If all quotes have been picked in this round, reset the array
      setAvailableQuotes([...quotesArray]);
    }
  };

  const share = () => {
    // TBD
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#00AAFF' }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.quoteContainer}>
            <AutoSizeText
              mode={ResizeTextMode.group}
              adjustsFontSizeToFit
              style={styles.quote}>
              {`"${quote}"`}
            </AutoSizeText>
          </View>
          <Image
            style={styles.homer}
            source={require('./images/HomerSimpson.png')}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={pickRandomQuote}>
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                Homer J. Simpson
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonSecondary]}
              onPress={share}>
              <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AAFF',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  quote: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'RockSalt_400Regular',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  button: {
    padding: 16,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#F8659F',
    borderColor: '#fff',
    borderWidth: 1,
    flex: 1,
  },
  buttonSecondary: {
    borderColor: '#F8659F',
    borderWidth: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonTextPrimary: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#F8659F',
  },
  homer: {
    left: 16,
  },
});

export default RandomQuoteApp;
