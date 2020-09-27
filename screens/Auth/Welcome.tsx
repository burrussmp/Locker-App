/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc First time logging in welcome screen
 */

import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, View, Animated, Text, Image} from 'react-native';
import {AsyncStorage} from 'react-native';
import SafeArea from 'components/Common/SafeArea';

const logoImage = require('assets/images/logo.png');

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

const FadeInView = (props: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const order = props.order;
  const incrementOrder = props.incrementOrder;
  const fadeout = props.fadeout;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      if (fadeout) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start(() => {
          if (order !== undefined && incrementOrder) {
            incrementOrder(order + 1);
          }
        });
      }
    });
  }, [order]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

const Welcome = (props: any) => {
  const [order, setOrder] = useState(0);
  const setFirstTime = props.setFirstTime;
  let content;
  if (order === 0) {
    content = <Text style={WelcomeStyles.textHeader}>W E L C O M E</Text>;
  } else if (order === 1) {
    content = <Text style={WelcomeStyles.textHeader}>T O</Text>;
  } else if (order === 2) {
    content = (
      <>
        <Text style={WelcomeStyles.textHeader}>L O C K E R</Text>
        <Image style={{marginTop: 20, tintColor: 'tan'}} source={logoImage} />
      </>
    );
  } else {
    AsyncStorage.setItem('firstTime', 'done');
    setFirstTime(false);
    return <></>;
  }
  return (
    <SafeArea
      containerStyle={{backgroundColor: '#000'}}
      children={
        <View style={WelcomeStyles.container}>
          <FadeInView
            style={WelcomeStyles.center}
            children={content}
            incrementOrder={setOrder}
            order={order}
            fadeout
          />
        </View>
      }
    />
  );
};

export default Welcome;
