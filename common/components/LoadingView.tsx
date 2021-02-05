/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc A view that renders the loading circle until boolean flipped.
 */

import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import Loading from 'common/components/LoadingRelative';

type IProps = {
  isLoaded: boolean;
  style?: ViewStyle;
  children: (false | JSX.Element | undefined)[] | JSX.Element | FC | JSX.Element[];
};

const LoadingView: FC<IProps> = ({ isLoaded, style, children }: IProps) => (
  <View style={style}>
    { isLoaded ? children : <Loading />}
  </View>
);

LoadingView.defaultProps = {
  style: {},
};

export default LoadingView;
