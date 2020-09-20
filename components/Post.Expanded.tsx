import {useNavigation} from '@react-navigation/native';
import * as React from 'react';

import {View} from 'react-native';
import {connect} from 'react-redux';

import PostActions from 'store/actions/post.actions';

const PostExpanded: React.FunctionComponent = (props: any) => {
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('transitionEnd', () => {
      // Do something
    });

    return unsubscribe;
  }, [props.navigation]);
  return <View />;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    Contract: () => {
      dispatch(PostActions.ContractPost());
    },
  };
};

export default connect(null, mapDispatchToProps)(PostExpanded);
