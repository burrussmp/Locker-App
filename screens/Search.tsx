/* eslint-disable @typescript-eslint/no-unused-vars */
// tslint:disable:2339
/**
 * @author Matthew P. Burruss
 * @date Sep 2020
 * @desc Authorization Screen
 */

import React, {useState, Fragment, useEffect} from 'react';
import {Text, SafeAreaView, View, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SearchBar, ListItem, Avatar} from 'react-native-elements';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import ProfileScreen from 'screens/Profile';

import authSelectors from 'store/selectors/auth.selectors';

import SearchStyles from 'components/Search/Search.Styles';
import BasicStyles from 'styles/styles';
import BlurHashService from 'services/BlurHashDecoder';
import api from 'api/api';
import styles from 'styles/styles';

type SearchResultsType = {
  data: {
    _id: string;
    username: string;
    profile_photo: {
      mimetype: string;
      key: string;
      blurhash: string;
    };
  };
  score: number;
} | null;

const SingleSearchResult = (props: {item: SearchResultsType}) => {
  if (!props.item) {
    throw 'Received a null object! This should not happen';
  }
  const navigation = useNavigation();
  const item = props.item.item;
  const BlurHashDecoder = BlurHashService.BlurHashDecoder(
    item.data.profile_photo.blurhash
  );
  const [avatarURI, setAvatarURI] = useState(BlurHashDecoder.getURI());
  const username = item.data.username;
  const key = item.data.profile_photo.key;
  const userId = item.data._id;
  useEffect(() => {
    (async () => {
      try {
        const profilePhotoURI = await api.S3.GetMedia(key, 'large');
        setAvatarURI(profilePhotoURI);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <ListItem
      bottomDivider
      onPress={() => {
        if (userId === authSelectors.getMyID()) {
          navigation.navigate('Profile');
        } else {
          navigation.navigate('FoundUser', {
            userId: userId,
            username: username,
          });
        }
      }}
    >
      <Avatar rounded size={'small'} source={{uri: avatarURI}} />
      <ListItem.Content>
        <ListItem.Title>{username}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

const SearchListResults = (props: {searchResults: [SearchResultsType]}) => {
  return (
    <FlatList
      data={props.searchResults}
      renderItem={(item: any) => <SingleSearchResult item={item} />}
      keyExtractor={item => (item ? item.data.username : '404')}
      ItemSeparatorComponent={() => {
        return <View style={{height: 0}} />;
      }}
      ListHeaderComponent={() => {
        return <View style={{height: 0}} />;
      }}
    />
  );
};

const SearchScreen = () => {
  const ComponentStyles = SearchStyles.SearchBar;
  const [search, updateSearch] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeText = async (text: string) => {
    updateSearch(text);
    if (!text) {
      setTimeout(() => setSearchData(null), 200); // race condition
    } else {
      setIsLoading(true);
      try {
        const data = await api.Search.GetUsers(text);
        if (search) {
          setSearchData(data);
        } else {
          setSearchData(null);
        }
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    }
  };
  return (
    <Fragment>
      <SafeAreaView style={BasicStyles.safeArea} />
      <View style={{flex: 1}}>
        <SearchBar
          placeholder="Search for a user..."
          onChangeText={handleChangeText}
          value={search}
          platform={'default'}
          lightTheme
          containerStyle={ComponentStyles.searchContainerStyle}
          inputContainerStyle={ComponentStyles.searchInputContainerStyle}
          inputStyle={ComponentStyles.searchInputStyle}
          onCancel={() => {
            setIsLoading(false);
          }}
          onClear={() => {
            setIsLoading(false);
          }}
          showCancel={true}
          showLoading={isLoading}
          round={true}
        ></SearchBar>
        <SearchListResults searchResults={searchData} />
      </View>
    </Fragment>
  );
};

const SearchNavigation = (props: any) => {
  const SearchNavigator = createStackNavigator();
  return (
    <SearchNavigator.Navigator headerMode="screen">
      <SearchNavigator.Screen
        name="SearchUsers"
        component={SearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <SearchNavigator.Screen
        name="FoundUser"
        children={props => {
          if (props.route.params && props.route.params.userId) {
            return <ProfileScreen userId={props.route.params.userId} />;
          } else {
            throw 'Error: Navigating to the FoundUser but not userID';
          }
        }}
        options={{
          headerShown: false,
        }}
      />
    </SearchNavigator.Navigator>
  );
};

export default SearchNavigation;
