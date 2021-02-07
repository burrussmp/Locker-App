/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {
  useState, useEffect, useRef, FC,
} from 'react';
import {
  Animated, Text, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-uuid';

import seedRandom from 'seedrandom';

type IProps = {
  tags: string[];
  onPress?: (index: number) => void;
};

const styles = StyleSheet.create({
  tagContainer: {
    marginRight: 5,
    marginTop: 5,
    paddingRight: 7,
    paddingLeft: 7,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 12,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
});

const PASTEL_COLORS = ['#fbb4ae', '#b3cde3', '#ccebc5', '#decbe4', '#fed9a6', '#ffffcc', '#e5d8bd', '#fddaec'];

const selectRandomColor = (tag: string): string => {
  const rng = seedRandom(tag);
  return PASTEL_COLORS[Math.floor(rng() * PASTEL_COLORS.length)];
};

const TagList: FC<IProps> = ({ tags, onPress }: IProps) => (
  <FlatList
    data={tags}
    columnWrapperStyle={{ flexWrap: 'wrap' }}
    numColumns={25}
    ListHeaderComponent={<View style={{ paddingStart: 10 }} />}
    ListFooterComponent={<View style={{ paddingEnd: 10 }} />}
    scrollEventThrottle={5}
    keyExtractor={() => uuid()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={[styles.tagContainer, { backgroundColor: selectRandomColor(item) }]}
        key={uuid()}
        activeOpacity={0.8}
        onPress={() => console.log(`Pressed tag ${tags[index]}`)}
      >
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    )}
  />
);
TagList.defaultProps = {
  onPress: undefined,
};

export default TagList;
