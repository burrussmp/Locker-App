/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react';
import {
  Image, StyleSheet, TouchableOpacity,
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
  container: {
    flex: 1,
    marginTop: 5,
    marginLeft: 3,
    marginBottom: 5,
  },
  imageContainer: {
    marginRight: 5,
  },
  image: {
    height: '100%',
    width: 300,
    borderRadius: 5,
  },
});

const ImageList: FC<IProps> = ({ images, onPress }: IProps) => (
  <FlatList
    horizontal
    style={styles.container}
    data={images}
    scrollEventThrottle={16}
    keyExtractor={() => uuid()}
    renderItem={({ item, index }) => (
      <TouchableOpacity
        style={styles.imageContainer}
        key={uuid()}
        activeOpacity={0.8}
        onPress={() => onPress(index)}
      >
        <Image source={{ uri: item }} style={styles.image} />
      </TouchableOpacity>
    )}
    getItemLayout={(data, index) => (
      { length: IMAGE_WIDTH, offset: IMAGE_WIDTH * index, index }
    )}
  />
);

export default ImageList;
