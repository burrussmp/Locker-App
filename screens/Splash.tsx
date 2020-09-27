/* eslint-disable @typescript-eslint/no-var-requires */

'use strict';

import React from 'react';
import {ImageBackground, View, Image} from 'react-native';
// import Loading from 'components/Common/LoadingAll';
const backgroundImage = require('assets/images/splash.png');
// const logoImage = require('assets/images/logo.png');
const Splash = () => {
  return (
    <ImageBackground source={backgroundImage} style={{flex: 1}}>
      {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image source={logoImage} />
      </View> */}
      {/* <Loading /> */}
    </ImageBackground>
  );
};

export default Splash;
