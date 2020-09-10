/**
 * @author Matthew P. Burruss
 * @date Aug 2020
 * @desc Home screen
 */

import React, {useRef} from 'react';
import {Animated, Text, View, Button, SafeAreaView, ScrollView, NativeEventEmitter} from 'react-native';
import AuthActions from 'store/actions/auth.actions';
import Post from 'components/Post.tsx'
import api from 'api/api';
import styles from 'styles/styles';


const HomeScreen = (props: any) => {
  const postBorderRadius = useRef(new Animated.Value(25)).current;
  const postTopMarging = useRef(new Animated.Value(-25)).current;

  const postOut = () => {
    Animated.timing(postBorderRadius, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start();
  };

  const postIn = () => {
    Animated.timing(postTopMarging, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true
    }).start();
  }

  var scrollY = useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <View style={styles.droidSafeArea}>
      <Animated.ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
        onScroll={onScroll}
        scrollEventThrottle={1}
      >
        <View style={{height: 30}}/>
        <Button
          title="LogOut"
          onPress={async () =>
            api
              .Logout()
              .then(() => {
                props.Logout();
              })
              .catch(err => {
                console.log(err);
              })
          }
          
        />
        <Post
          index={0}
          scrollY={scrollY}
        />
        <Post
          index={1}
          scrollY={scrollY}
        />
        <Post
          index={2}
          scrollY={scrollY}
        />
        <View
          style={{
            width: '100%',
            height: 500,
            backgroundColor: 'powderblue'
          }}
        />
        <Animated.View
          style={[
          {
            height: 50,
            backgroundColor: '#FFF',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            shadowColor: '#000',
            shadowOpacity: .25,
            shadowRadius: 0,
            shadowOffset: {height: 1, width: 0},
            zIndex: 1
          },
          {
            borderBottomLeftRadius: postBorderRadius,
            borderBottomRightRadius: postBorderRadius
          }]}
          onLayout={(event : any) => {
            const layout = event.nativeEvent.layout;
            console.log('height:', layout.height);
            console.log('width:', layout.width);
            console.log('x:', layout.x);
            console.log('y:', layout.y);
          }}
        />
        <View
          style={{
            width: '100%',
            height: 500,
            marginTop: -25,
            backgroundColor: 'steelblue'
          }}
        />
        <View
          style={{
            height: 50,
            backgroundColor: '#FFF',
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            shadowColor: '#000',
            shadowOpacity: .25,
            shadowRadius: 0,
            shadowOffset: {height: 1, width: 0},
            zIndex: 1
          }}
        />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
        <View
          style={{width: 200, height: 200, backgroundColor: 'powderblue'}}
        />
        <View style={{width: 200, height: 200, backgroundColor: 'skyblue'}} />
        <View style={{width: 200, height: 200, backgroundColor: 'steelblue'}} />
      </Animated.ScrollView>
    </View>
  );
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = (dispatch: any) => {
  return {
    Logout: () => {
      dispatch(AuthActions.Logout());
    },
  };
};
import {connect} from 'react-redux';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import Layout from 'constants/Layout';
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
