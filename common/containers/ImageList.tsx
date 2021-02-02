/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react';
import {
  Image, View, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-uuid';

type IProps = {
  images: string[];
  onPress: (index: number) => void;
};

const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 120;

const styles = StyleSheet.create({
  root: { flexGrow: 1 },
  container: {
    flex: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    marginRight: 5,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 5,
  },
});

const ImageList: FC<IProps> = ({ images, onPress }: IProps) => (
  <FlatList
    horizontal
    style={styles.root}
    data={images}
    scrollEventThrottle={16}
    keyExtractor={() => uuid()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={styles.button}
        key={uuid()}
        activeOpacity={0.8}
        onPress={() => onPress(index)}
      >
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    )}
    getItemLayout={(data, index) => ({
      length: 550,
      offset: 550 * index,
      index,
    })}
  />
);

export default ImageList;
