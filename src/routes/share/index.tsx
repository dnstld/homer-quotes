import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenProps as ShareScreenProps } from '../__layout/type';

const Share = ({ navigation }: ShareScreenProps<'Share'>) => {
  return (
    <View style={styles.quoteContainer}>
      <Text>Share now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    padding: 32,
  },
});

export default Share;
