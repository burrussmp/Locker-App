/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { FC } from 'react';
import {
  Image, StyleSheet, TouchableOpacity, View,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import uuid from 'react-uuid';

type IProps = {
  images: string[];
  onPress: (index: number) => void;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
  },
  imageContainer: {
    marginRight: 5,
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
  },
});

const ImageList: FC<IProps> = ({ images, onPress }: IProps) => (
  <View style={styles.container}>
    <FlatList
      horizontal
      data={images}
      scrollEventThrottle={20}
      keyExtractor={() => uuid()}
      ListHeaderComponent={<View style={{ paddingStart: 10 }} />}
      ListFooterComponent={<View style={{ paddingEnd: 10 }} />}
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
    />
  </View>
);

export default ImageList;
