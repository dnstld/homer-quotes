import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const quotesArray = [
  "Quote 1",
  "Quote 2",
  "Quote 3",
  // Add more quotes here
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
