/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc First time logging in welcome screen
 */
import React, {
  useRef, useEffect, useState, FC,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet, View, Animated, Text, Image, ImageSourcePropType,
} from 'react-native';

import SafeArea from 'components/Common/SafeArea';

import logoImage from 'assets/images/logo.png';

const WelcomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textHeader: {
    color: 'tan',
    fontSize: 40,
    fontFamily: 'CircularBlack',
  },
});

interface IPropsFadeIn {
  setFirstTime: (firstTime: boolean) => void;
}

const Welcome: FC<IPropsFadeIn> = ({ setFirstTime }: IPropsFadeIn) => {
  const [order, setOrder] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  let content;
  if (order === 0) {
    content = <Text style={WelcomeStyles.textHeader}>W E L C O M E</Text>;
  } else if (order === 1) {
    content = <Text style={WelcomeStyles.textHeader}>T O</Text>;
  } else if (order === 2) {
    content = (
      <>
        <Text style={WelcomeStyles.textHeader}>L O C K E R</Text>
        <Image style={{ marginTop: 20, tintColor: 'tan' }} source={logoImage as ImageSourcePropType} />
      </>
    );
  } else {
    AsyncStorage.setItem('firstTime', 'done').then(() => {
      setFirstTime(false);
    }).catch(() => {
      setFirstTime(true);
    });
  }
  useEffect(() => {
    let complete = false;
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        if (!complete) {
          setOrder(order + 1);
        }
      });
    });
    return function cleanup() {
      complete = true;
    };
  }, [order]);

  return (
    <SafeArea
      containerStyle={{ backgroundColor: '#000' }}
    >
      <View style={WelcomeStyles.container}>
        <Animated.View
          style={{
            ...WelcomeStyles.center,
            opacity: fadeAnim,
          }}
        >
          {content}
        </Animated.View>
      </View>
    </SafeArea>
  );
};

export default Welcome;
