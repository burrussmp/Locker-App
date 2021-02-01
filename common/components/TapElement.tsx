/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc A componet to detect touches
 */

import React, { useRef, FC } from 'react';
import { TapGestureHandler, TapGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';

type IProps = {
  children: FC | JSX.Element,
  onSingleTap: (event: TapGestureHandlerStateChangeEvent) => void;
  onDoubleTap?: (event: TapGestureHandlerStateChangeEvent) => void;
};

/**
 * @desc Allows you to add tap-ability to an element.
 */
const TapElement: FC<IProps> = ({ children, onSingleTap, onDoubleTap }: IProps) => {
  const tapReference = useRef(null);

  return (
    <TapGestureHandler
      waitFor={tapReference}
      onHandlerStateChange={onSingleTap}
    >
      { onDoubleTap
        ? (
          <TapGestureHandler
            ref={tapReference}
            onHandlerStateChange={onDoubleTap}
            numberOfTaps={2}
          >
            {children}
          </TapGestureHandler>
        ) : children}
    </TapGestureHandler>
  );
};

TapElement.defaultProps = {
  onDoubleTap: undefined,
};

export default TapElement;
