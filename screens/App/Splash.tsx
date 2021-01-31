/**
 * @author Matthew P. Burruss
 * @date 1/27/2021
 * @desc A simple splash screen
*/
import React, { FC } from 'react';
import { ImageBackground, ImageSourcePropType } from 'react-native';
import backgroundImage from 'assets/images/splash.png';

const Splash: FC = () => (
  <ImageBackground source={backgroundImage as ImageSourcePropType} style={{ flex: 1 }}>
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

export default Splash;
