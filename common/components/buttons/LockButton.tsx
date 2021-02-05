/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The lock button.
 */

import React, {
  FC, useRef, useState, useEffect,
} from 'react';

import {
  Alert, Animated, View, ViewStyle,
} from 'react-native';
import { State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { lockAnimation, unlockAnimation, lockAnimationTransform } from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';
import api, { APIErrorType } from 'api/api';

type IProps = {
  style?: ViewStyle;
  initiallyIsLocked: boolean;
  productId: string;
};

const LockButton: FC<IProps> = ({ style, initiallyIsLocked, productId }: IProps) => {
  const [lockerProductId, setLockerProductId] = useState<string | undefined>(undefined);
  const [isLocked, setIsLocked] = useState(initiallyIsLocked);
  const rotationDegreesRef = useRef(new Animated.Value(initiallyIsLocked ? 90 : 0)).current;
  const [loading, setLoading] = useState(false);

  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (!loading && event.nativeEvent.state === State.ACTIVE) {
      if (isLocked && lockerProductId) {
        unlockAnimation(rotationDegreesRef);
        setIsLocked(false);
        api.Locker.RemoveProduct(lockerProductId).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
        setLockerProductId(undefined);
      } else if (!isLocked) {
        lockAnimation(rotationDegreesRef);
        setIsLocked(true);
        api.Locker.AddProduct(productId).then((lockerProduct) => {
          setLockerProductId(lockerProduct._id);
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
    }
  };

  useEffect(() => {
    api.Locker.GetProducts()
      .then((mLockerProducts) => {
        const foundProduct = mLockerProducts.filter((x) => x.product === productId);
        if (foundProduct.length === 1) {
          lockAnimation(rotationDegreesRef);
          setIsLocked(true);
          setLockerProductId(foundProduct[0]._id);
        }
        setLoading(false);
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
  }, []);

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={isLocked ? icons.lock.locked : icons.lock.unlocked}
          style={lockAnimationTransform(rotationDegreesRef)}
        />
      </TapGestureHandler>
    </View>
  );
};

LockButton.defaultProps = {
  style: {},
};

export default LockButton;
