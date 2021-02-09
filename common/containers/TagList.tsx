/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, {
  useState, useEffect, useRef, FC,
} from 'react';
import {
  Animated, Text, StyleSheet, TouchableOpacity, View, ViewStyle, TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-uuid';

import seedRandom from 'seedrandom';

const styles = StyleSheet.create({
  tagContainerDefault: {
    marginRight: 5,
    marginTop: 5,
    paddingRight: 7,
    paddingLeft: 7,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 12,
  },
  textDefault: {
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

type IProps = {
  tags: string[];
  tagContainerStyle?: ViewStyle;
  textStyle?: TextStyle;
  horizontal?: boolean;
  numColumns?: number;
  onPress?: (index: number, event: GestureResponderEvent) => void;
};

const TagList: FC<IProps> = ({
  tags, tagContainerStyle, textStyle, onPress, horizontal,
  numColumns,
}: IProps) => (
  <FlatList
    showsHorizontalScrollIndicator={false}
    data={tags}
    columnWrapperStyle={!horizontal ? { flexWrap: 'wrap' } : undefined}
    numColumns={!horizontal ? numColumns : undefined}
    ListHeaderComponent={<View style={{ paddingStart: 10 }} />}
    ListFooterComponent={<View style={{ paddingEnd: 10 }} />}
    scrollEventThrottle={5}
    horizontal={horizontal}
    keyExtractor={() => uuid()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={[styles.tagContainerDefault, { backgroundColor: selectRandomColor(item) }, tagContainerStyle]}
        key={uuid()}
        activeOpacity={0.5}
        onPress={(event: GestureResponderEvent) => {
          if (onPress) onPress(index, event);
        }}
      >
        <Text style={[styles.textDefault, textStyle]}>{item}</Text>
      </TouchableOpacity>
    )}
  />
);
TagList.defaultProps = {
  tagContainerStyle: {},
  textStyle: {},
  onPress: () => undefined,
  horizontal: false,
  numColumns: 25,
};

export default TagList;
