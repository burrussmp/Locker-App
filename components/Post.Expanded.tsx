import * as React from 'react';

import {View} from 'react-native';
import {connect} from 'react-redux';

import PostActions from 'store/actions/post.actions';

const PostExpanded: React.FunctionComponent = (props: any) => {
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
