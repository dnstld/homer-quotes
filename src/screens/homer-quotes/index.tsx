import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const quotesArray = [
  "Nobody -- that’s my name. Nobody -- so my mother and father call me, all my friends.",
  "Her gifts were mixed with good and evil both.",
  "Man is the vainest of all creatures that have their being upon earth.",
  "There is a time for making speeches, and a time for going to bed.",
  "For there is nothing better in this world than that man and wife should be of one mind in a house.",
  "Be strong, saith my heart; I am a soldier; I have seen worse sights than this.",
  "The proud heart feels not terror nor turns to run and it is his own courage that kills him.",
  "I say no wealth is worth my life!",
  "My life is more to me than all the wealth of Ilius",
  "If only the gods are willing. They rule the vaulting skies. They’re stronger than I to plan and drive things home.",
];

const RandomQuoteApp = () => {
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
    const updatedQuotes = availableQuotes.filter((quote, index) => index !== randomIndex);

    setQuote(selectedQuote);
    setAvailableQuotes(updatedQuotes);

    if (updatedQuotes.length === 0) {
      // If all quotes have been picked in this round, reset the array
      setAvailableQuotes([...quotesArray]);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{quote}</Text>
      <Button title="Get Random Quote" onPress={pickRandomQuote} />
    </View>
  );
};

export default RandomQuoteApp;
