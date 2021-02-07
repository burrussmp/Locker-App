/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc The lock button.
 */

import React, { FC, useRef, useState } from 'react';

import {
  Alert, Animated, View, ViewStyle,
} from 'react-native';
import { State, TapGestureHandler, TapGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { lockAnimation, unlockAnimation, lockAnimationTransform } from 'services/animations/ReactionAnimations';
import icons from 'icons/icons';
import api, { APIErrorType } from 'api/api';

export const LOCK = 'lock';
export const UNLOCK = 'unlock';
export const ANIMATE = 'animate';
export const SET_PRODUCT_ID = 'set_product_id';

export type LockButtonState = {
  isLocked: boolean;
  productId: string | undefined;
  lockerProductId: string | undefined;
  showAnimation: boolean;
};

export const lockButtonInitialState = {
  isLocked: false,
  productId: undefined,
  lockerProductId: undefined,
  showAnimation: false,
};

export type LockAction = {
  type: typeof LOCK;
  lockerProductId: string;
}

export type UnlockAction = {
  type: typeof UNLOCK;
}

export type AnimateAction = {
  type: typeof ANIMATE;
  isLocked: boolean;
}

export type SetProductIDAction = {
  type: typeof SET_PRODUCT_ID;
  productId: string;
}

export type LockButtonActions = LockAction | UnlockAction | AnimateAction | SetProductIDAction;

export const lockButtonReducer = (state: LockButtonState, action: LockButtonActions): LockButtonState => {
  switch (action.type) {
    case LOCK:
      return {
        ...state, isLocked: true, lockerProductId: action.lockerProductId,
      };
    case UNLOCK:
      return {
        ...state, isLocked: false, lockerProductId: undefined,
      };
    case ANIMATE:
      return {
        ...state, isLocked: action.isLocked, showAnimation: true,
      };
    case SET_PRODUCT_ID:
      return {
        ...state, productId: action.productId,
      };
    default:
      return state;
  }
};

export const setInitialLockerButtonState = async (productId: string, dispatch: (value: LockButtonActions) => void): Promise<void> => {
  dispatch({ type: SET_PRODUCT_ID, productId });
  return api.Locker.GetProducts().then((mLockerProducts) => {
    const foundProduct = mLockerProducts.filter((x) => x.product === productId);
    if (foundProduct.length === 1) {
      dispatch({ type: ANIMATE, isLocked: true });
      dispatch({ type: LOCK, lockerProductId: foundProduct[0]._id });
    }
  });
};

type IProps = {
  state: LockButtonState;
  dispatch: (value: LockButtonActions) => void;
  style?: ViewStyle;
};

const LockButton: FC<IProps> = ({ state, dispatch, style }: IProps) => {
  const [loading, setLoading] = useState(false);
  const rotationDegreesRef = useRef(new Animated.Value(state.isLocked ? 90 : 0)).current;

  if (state.showAnimation) {
    if (state.isLocked) {
      lockAnimation(rotationDegreesRef);
    } else {
      unlockAnimation(rotationDegreesRef);
    }
  }

  const onSingleTap = (event: TapGestureHandlerGestureEvent) => {
    if (!loading && event.nativeEvent.state === State.ACTIVE) {
      setLoading(true);
      if (state.isLocked && state.lockerProductId) {
        dispatch({ type: ANIMATE, isLocked: false });
        dispatch({ type: UNLOCK });
        api.Locker.RemoveProduct(state.lockerProductId).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      } else if (!state.isLocked && state.productId) {
        dispatch({ type: ANIMATE, isLocked: true });
        api.Locker.AddProduct(state.productId).then((lockerProduct) => {
          dispatch({ type: LOCK, lockerProductId: lockerProduct._id });
        }).catch((err: APIErrorType) => {
          Alert.alert(err.error);
        });
      }
      setLoading(false);
    }
  };

  return (
    <View style={style}>
      <TapGestureHandler onHandlerStateChange={onSingleTap}>
        <Animated.Image
          source={state.isLocked ? icons.lock.locked : icons.lock.unlocked}
          style={[lockAnimationTransform(rotationDegreesRef), { width: 35, height: 35 }]}
        />
      </TapGestureHandler>
    </View>
  );
};

LockButton.defaultProps = {
  style: {},
};

export default LockButton;
