/**
 * @author Matthew P. Burruss
 * @date 2/6/2021
 * @desc Share button
 */

import React, { FC } from 'react';
import {
  Alert, Platform, TouchableOpacity, Share, ViewStyle,
} from 'react-native';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

// const ShareButtonStyles = StyleSheet.create({

// });

type IProps = {
  shareMessage: string;
  containerStyle?: ViewStyle;
  color?: string;
  size?: number;
}

const ShareButton: FC<IProps> = ({
  shareMessage, containerStyle, color, size,
}: IProps) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: shareMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleShare} style={containerStyle}>
      <Icons
        name={Platform.OS === 'ios' ? 'export-variant' : 'share-variant'}
        size={size}
        color={color}
      />
    </TouchableOpacity>
  );
};

ShareButton.defaultProps = {
  containerStyle: {},
  color: '#000',
  size: 25,
};

export default ShareButton;
