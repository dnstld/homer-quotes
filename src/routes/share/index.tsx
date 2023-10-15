import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import ViewShot from 'react-native-view-shot';

import { Quote } from '../../components/quote';
import { ScreenProps as ShareScreenProps } from '../__layout/type';

const Share = ({ route }: ShareScreenProps<'Share'>) => {
  const { quote } = route.params;

  const full = useRef();

  const onImageLoad = useCallback(() => {
    // onCapture();
  }, []);

  const onCapture = useCallback(() => {
    // @ts-ignore
    full.current.capture().then(uri => console.log('Saved to: ', uri));
  }, []);

  const onShare = () => {
    onCapture();
  };

  return (
    <View style={styles.container}>
      <ViewShot
        // @ts-ignore
        ref={full}
        options={{ fileName: 'HomerQuotes', format: 'jpg', quality: 0.9 }}>
        <View style={styles.frame}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.avatar}
              source={require('../../assets/images/HomerAvatar.png')}
              resizeMode="contain"
              onLoad={onImageLoad}
            />
            <View style={styles.profile}>
              <Text style={styles.name}>Homer J. Simpson</Text>
              <Text style={styles.social}>@homerquotesapp</Text>
            </View>
          </View>
          <View style={styles.quoteContainer}>
            <Quote quote={quote} />
          </View>
        </View>
      </ViewShot>
      <TouchableOpacity onPress={onCapture}>
        <Text>Share now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    alignItems: 'center',
  },
  frame: {
    width: 300,
    height: 300,
    backgroundColor: '#00AAFF',
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  quoteContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  avatar: {
    width: 32,
  },
  profile: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 8,
  },
  name: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  social: {
    color: '#fff',
    fontSize: 8,
    marginTop: 2,
  },
});

export default Share;
