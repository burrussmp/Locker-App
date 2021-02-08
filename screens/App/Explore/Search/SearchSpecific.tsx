/**
 * @author Matthew P. Burruss
 * @date 2/7/2021
 * @desc Specific navigation page.
 */

import React, { FC } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import SafeArea from 'common/components/SafeArea';

import { SearchSpecificProp } from 'types/navigation/explore.navigation.types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type IProps = SearchSpecificProp;

const SearchSpecific: FC<IProps> = ({ navigation, route }: IProps) => {
  const searchSpecificText = `Search Specific: ${route.params.type}`;
  return (
    <SafeArea>
      <View style={styles.container}>
        <Text>{searchSpecificText}</Text>
      </View>
    </SafeArea>
  );
};

export default SearchSpecific;
