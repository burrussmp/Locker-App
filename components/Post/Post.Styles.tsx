'use strict';
import {StyleSheet} from 'react-native';

const borderColor = '#888';

const ContentStyles = (props: any) =>
  StyleSheet.create({
    container: {
      zIndex: -props.index,
      marginTop: -50,
    },
  });

const ContentFrontStyles = StyleSheet.create({
  imageContainer: {
    height: 500,
    backfaceVisibility: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
  },
});

const ContentBackStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: 500,
    backgroundColor: '#FFFFFF',
    backfaceVisibility: 'hidden',
  },
  headerContainer: {
    height: 150,
    width: '100%',
    paddingTop: 25,
    paddingLeft: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  captionContainer: {
    flex: 2,
  },
  captionText: {
    fontSize: 24,
    fontWeight: '700',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '200',
    marginTop: 5,
  },
  avatarContainer: {
    height: 100,
    width: 100,
    marginRight: 25,
  },
  bottomContainer: {
    flex: 7,
  },
  divider: {
    backgroundColor: 'black',
    marginHorizontal: 75,
  },
});

const BottomTabStyles = (props: any) =>
  StyleSheet.create({
    container: {
      height: 50,
      backgroundColor: '#FFFFFF',
    },
    containerShadow: {
      position: 'absolute',
      top: 1,
      width: '100%',
      height: '100%',
      opacity: 0.25,
      backgroundColor: '#000000',
      zIndex: props.index - 1000,
    },
    flippedContainer: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#FFFFFF',
      backfaceVisibility: 'hidden',
      zIndex: props.index - 1000,
    },
    alignmentView: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      alignContent: 'center',
    },
    userContainer: {
      flex: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 12.5,
      paddingLeft: 17.5,
    },
    avatarContainer: {
      height: 25,
      width: 25,
      borderRadius: 15,
    },
    userText: {
      marginLeft: 10,
      fontSize: 12,
    },
    moreContainer: {
      flex: 2,
      alignItems: 'center',
      paddingTop: 21,
    },
    moreButton: {
      opacity: 0.25,
    },
    reactionContainer: {
      flex: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 15,
      paddingTop: 10,
    },
    reactionPadding: {
      width: 5,
    },
  });

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 1,
    height: 500,
    marginTop: -50,
    justifyContent: 'center',
  },
  indicator: {
    opacity: 0.25,
  },
});

const PostStyles = {
  Content: ContentStyles,
  ContentFront: ContentFrontStyles,
  ContentBack: ContentBackStyles,
  BottomTab: BottomTabStyles,
  Loading: LoadingStyles,
};

export default PostStyles;
