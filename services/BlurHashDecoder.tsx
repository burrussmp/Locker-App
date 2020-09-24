'use strict';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import RnPng from 'react-native-png';
import pako from 'pako';
import base64js from 'base64-js';
import {decode, isBlurhashValid} from 'blurhash';
import * as ImageManipulator from 'expo-image-manipulator';

const asyncImageResize = async (
  uri: string,
  width?: number,
  height?: number
): Promise<string> => {
  const new_size = {
    width: width ? width : undefined,
    height: height ? height : undefined,
  };
  const manipResult = await ImageManipulator.manipulateAsync(
    uri,
    [{resize: new_size}],
    {compress: 1, format: ImageManipulator.SaveFormat.PNG}
  );
  return manipResult.uri;
};
/**
 * @desc Returns the decoded blur hash
 * @param {string} blur_hash : The blur hash
 * @param {number} width : The width of the output blur image
 * @param {number} height : The height of the output blur image
 * @return A data buffer
 */
const decode_blur_hash = (
  blur_hash: string,
  width: number,
  height: number
): Uint8ClampedArray => {
  if (isBlurhashValid(blur_hash).result) {
    const clamped_array = decode(blur_hash, width, height);
    return clamped_array;
  } else {
    throw isBlurhashValid(blur_hash).errorReason;
  }
};

/**
 * @desc calculates the average pixel from from offset x and y to the rest of the image
 * @param {Array} data : A byte array
 * @param {Number} x : An x index (column) to start average at (0 <= x <= width)
 * @param {Number} y : A y index (row) to start average at (0 <= x <= height)
 * @param {Number} width : The width of the image (must be positive)
 * @param {Number} height : The height of the image (must be positive)
 * @param {Number} channels : the number of channels (either 3 or 4)
 * @return a list of average rgb values e.g. [127, 212, 12]
 */
const get_average_pixels = (
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  channels: number
): Array<number> => {
  if (x < 0 || x > width || y < 0 || y > height) {
    throw 'Error: x and/or y cannot be out of bounds of the image';
  }
  if (width < 0 || height < 0) {
    throw 'Error: Width and/or height are zero';
  }
  if (!data || data.length === 0) {
    throw 'Error: The byte array is undefined or empty';
  }
  if (channels !== 3 && channels !== 4) {
    throw 'Channels must be either 3 or 4';
  }
  const rgb = [0, 0, 0];
  let start_iter = channels * (y * width + x);
  while (start_iter < data.length) {
    rgb[0] += data[start_iter];
    rgb[1] += data[start_iter + 1];
    rgb[2] += data[start_iter + 2];
    start_iter += channels;
  }
  const total = width - x + width * (height - y);
  return [~~(rgb[0] / total), ~~(rgb[1] / total), ~~(rgb[2] / total)];
};

/**
 * @desc Converts a pixel array to a URI
 * @param {Array} pixel_array : An array of pixels
 * @param {Number} width : The width of the image (must be positive)
 * @param {Number} height : The height of the image (must be positive)
 * @return {string} :  The data URI
 */
const pixel_array_to_uri = (
  pixel_array: Uint8ClampedArray,
  width: number,
  height: number
): string => {
  const png = new RnPng({
    width: width,
    height: height,
    zlibLib: pako,
  });
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      const index = 4 * (x + width * y);
      const r = pixel_array[index];
      const g = pixel_array[index + 1];
      const b = pixel_array[index + 2];
      png.setPixelAt([x, y], [r, g, b]);
    }
  }
  const base64ImageData = base64js.fromByteArray(png.getBuffer());
  return `data:image/png;base64,${base64ImageData}`;
};

/**
 * @desc Blur has module
 * @param {string} blur_hash : The blur hash string
 * @return {function} getTabColor
 * @return {function} getURI
 */
const BlurHashDecoder = (blur_hash: string) => {
  const height = 16;
  const width = 16;
  const pixel_array = decode_blur_hash(blur_hash, width, height);
  return {
    /**
     * @desc Gets the tab color from a percentage of the bottom of the blurred image
     * @param {number} percentage_from_bottom : Percentage from bottom of image to average
     * @return {Array<number>} An array of rgb values representing the average color from the section of the
     * blurred image
     */
    getTabColor: (percentage_from_bottom?: number): Array<number> => {
      if (!percentage_from_bottom) {
        percentage_from_bottom = 10;
      }
      const start_height = ~~(
        height -
        height * (percentage_from_bottom / 100.0)
      );
      return get_average_pixels(pixel_array, 0, start_height, width, height, 4);
    },
    /**
     * @desc Converts the pixel array to a URI
     * @return {string} The data URI of the blurred hash image
     */
    getURI: (): string => {
      return pixel_array_to_uri(pixel_array, width, height);
    },
  };
};
export default {
  BlurHashDecoder,
  asyncImageResize,
};
