/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */
import {StyleSheet} from 'react-native';

const borderColor = '#888';

const HeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 15,
    backgroundColor: '#f1f0f0',
  },
  topContainer: {
    height: 'auto',
    paddingTop: 25,
    marginLeft: 35,
    marginRight: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomContainer: {
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    justifyContent: 'space-around',
  },
  infoContainer: {
    flex: 0.9,
    alignSelf: 'center',
  },
  nameText: {
    fontSize: 26,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  followersText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 8,
  },
  handleText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#333',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  avatarContainer: {
    alignSelf: 'flex-start',
  },
  avatarImageContainer: {
    borderWidth: 1,
    borderRightColor: borderColor,
    borderTopColor: borderColor,
    borderBottomColor: borderColor,
    borderLeftColor: borderColor,
    height: 120,
    width: 120,
    borderRadius: 60,
  },
});

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SearchStyles = {
  Header: HeaderStyles,
  Loading: LoadingStyles,
};

export default SearchStyles;
