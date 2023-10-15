/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

import { Button } from '../../components/button';
import { Quote } from '../../components/quote';
import { ScreenProps as QuotesScreenProps } from '../__layout/type';

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

const Quotes = ({ navigation }: QuotesScreenProps<'Quotes'>) => {
  const [quote, setQuote] = useState('');
  const [availableQuotes, setAvailableQuotes] = useState([...quotesArray]);

  useEffect(() => {
    pickRandomQuote();
  }, []);

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

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: '#00AAFF' }} />
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.quoteContainer}>
            <Quote quote={quote} />
          </View>

          <Image
            style={styles.homer}
            source={require('../../assets/images/HomerSimpson.png')}
          />

          <View style={styles.buttonsContainer}>
            <Button title="Homer J. Simpson" onPress={pickRandomQuote} />
            <Button
              title="Share"
              onPress={() => navigation.navigate('Share', { quote })}
              secondary
            />
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
    padding: 32,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  homer: {
    left: 16,
  },
});

export default Quotes;
