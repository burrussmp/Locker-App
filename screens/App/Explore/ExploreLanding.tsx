/**
 * @author Matthew P. Burruss
 * @date 1/30/2021
 * @desc Main explore page
 */

import React, {
  useEffect, useState, useReducer, FC,
} from 'react';
import {
  Alert, FlatList, GestureResponderEvent, StyleSheet, View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import TagList from 'common/containers/TagList';
import ImageList from 'common/containers/ImageList';

import ExploreLandingHeader from 'screens/App/Explore/ExploreLandingHeader';

import SearchSpecificHeader from 'screens/App/Explore/components/SpecificSearchHeader';

import SearchResults from 'screens/App/Explore/Search/SearchResults';
import SafeArea from 'common/components/SafeArea';

import { searchInitialState, SearchReducer } from 'common/components/input/SearchBar';

import BlurHashService from 'services/Images/BlurHashDecoder';

import api, { APIErrorType } from 'api/api';
import { OrganizationListType } from 'api/organization';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchTagContainer: {
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  searchTagTextContainer: {
    borderColor: '#bbb',
    borderWidth: 0.25,
  },
  searchTagText: {
    fontSize: 16,
  },
  searchBarDivider: {
    backgroundColor: '#ccc',
    height: 1,
    marginHorizontal: 50,
    marginTop: 20,
  },
});

const SearchUsers: FC = () => {
  const navigation = useNavigation();
  const [searchState, searchDispatch] = useReducer(SearchReducer, searchInitialState);

  const [organizations, setOrganizations] = useState<{_id: string; uri: string;}[]>([]);

  useEffect(() => {
    let complete = false;
    if (!complete) {
      api.Organization.GetAll().then(async (organizationList) => {
        let newOrganizationList = organizationList.map((organization) => ({
          _id: organization._id,
          uri: BlurHashService.BlurHashDecoder(organization.logo.blurhash || '').getURI(),
        }));
        setOrganizations(newOrganizationList);
        newOrganizationList = await Promise.all(organizationList.map(async (organization) => ({
          _id: organization._id,
          uri: await api.S3.getMedia(organization.logo.key, 'large'),
        })));
        setOrganizations(newOrganizationList);
      }).catch((err: APIErrorType) => {
        Alert.alert(err.error);
      });
    }
    return () => {
      complete = true;
    };
  }, []);

  const tags = {
    Shops: organizations,
  };

  const onTagPress = (index: number, event: GestureResponderEvent) => {
    navigation.navigate('SearchSpecific', { type: Object.keys(tags)[index] });
  };

  const header = <ExploreLandingHeader searchState={searchState} searchDispatch={searchDispatch} />;

  const searching = <SearchResults searchData={searchState.data} />;
  const standing = (
    <View style={{ flex: 1 }}>
      <FlatList
        data={Object.keys(tags)}
        renderItem={({ item, index }) => (
          <View>
            <SearchSpecificHeader
              containerStyle={{ marginTop: 5 }}
              text={item}
              onButtonPress={() => navigation.navigate('SearchSpecific', { type: item })}
            />
            <View style={{ height: 250 }}>
              <ImageList
                images={organizations.map((x) => x.uri)}
                onPress={(index: number) => {
                  console.log('Pressed image');
                }}
              />
            </View>
          </View>
        )}
        keyExtractor={(item: string[0]) => item}
        ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
        ListHeaderComponent={(
          <View>
            <View style={styles.searchTagContainer}>
              <TagList
                horizontal
                tags={Object.keys(tags)}
                tagContainerStyle={styles.searchTagTextContainer}
                textStyle={styles.searchTagText}
                onPress={onTagPress}
              />
              <Divider style={styles.searchBarDivider} />
            </View>
          </View>
        )}
        ListFooterComponent={() => <View style={{ marginBottom: 50 }} />}
      />
    </View>
  );

  return (
    <SafeArea>
      <View style={styles.container}>
        {header}
        {searchState.text ? searching : standing}
      </View>
    </SafeArea>
  );
};

export default SearchUsers;
