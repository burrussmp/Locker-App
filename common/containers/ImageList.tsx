/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react';
import {
  Image, ScrollView, StyleSheet, TouchableOpacity,
} from 'react-native';
import uuid from 'react-uuid';

type IProps = {
  images: string[];
  onPress: (index: number) => void;
  shift?: number;
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
    marginRight: 10,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 10,
  },
});

const ImageList: FC<IProps> = ({ images, shift = 0, onPress }: IProps) => (
  <ScrollView
    horizontal
    style={styles.root}
    contentOffset={{ x: shift * IMAGE_WIDTH, y: 0 }}
    contentContainerStyle={styles.container}
    nestedScrollEnabled
    showsHorizontalScrollIndicator
    scrollEventThrottle={200}
    decelerationRate="fast"
    pagingEnabled
  >
    {images.map((imageUrl, index) => (
      <TouchableOpacity
        style={styles.button}
        key={uuid()}
        activeOpacity={0.8}
        onPress={() => onPress(index)}
      >
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </TouchableOpacity>
    ))}
  </ScrollView>
);

ImageList.defaultProps = {
  shift: 0,
};

export default ImageList;
