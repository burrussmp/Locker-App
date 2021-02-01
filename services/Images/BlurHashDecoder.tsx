/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-bitwise */
/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc A blur hash module
 */
import pako from 'pako';
import base64js from 'base64-js';
import { decode, isBlurhashValid } from 'blurhash';
import * as ImageManipulator from 'expo-image-manipulator';

import RnPng from 'react-native-png';

const asyncImageResize = async (
  uri: string,
  width?: number,
  height?: number,
): Promise<string> => {
  const newSize = {
    width: width || undefined,
    height: height || undefined,
  };
  const manipulateResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ resize: newSize }],
    { compress: 1, format: ImageManipulator.SaveFormat.PNG },
  );
  return manipulateResult.uri;
};

/**
 * @desc Returns the decoded blur hash
 * @param {string} blur_hash : The blur hash
 * @param {number} width : The width of the output blur image
 * @param {number} height : The height of the output blur image
 * @return A data buffer
 */
const decodeBlurHash = (
  blurHash: string,
  width: number,
  height: number,
): Uint8ClampedArray => {
  if (isBlurhashValid(blurHash).result) {
    return decode(blurHash, width, height);
  }
  throw isBlurhashValid(blurHash).errorReason;
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
const getAveragePixels = (
  data: Uint8ClampedArray,
  x: number,
  y: number,
  width: number,
  height: number,
  channels: number,
): Array<number> => {
  if (x < 0 || x > width || y < 0 || y > height) {
    throw Error('Error: x and/or y cannot be out of bounds of the image');
  }
  if (width < 0 || height < 0) {
    throw Error('Error: Width and/or height are zero');
  }
  if (!data || data.length === 0) {
    throw Error('Error: The byte array is undefined or empty');
  }
  if (channels !== 3 && channels !== 4) {
    throw Error('Channels must be either 3 or 4');
  }
  const rgb = [0, 0, 0];
  let startIter = channels * (y * width + x);
  let total = 0;
  while (startIter < data.length) {
    rgb[0] += data[startIter];
    rgb[1] += data[startIter + 1];
    rgb[2] += data[startIter + 2];
    startIter += channels;
    total += 1;
  }
  return [~~(rgb[0] / total), ~~(rgb[1] / total), ~~(rgb[2] / total)];
};

/**
 * @desc Converts a pixel array to a URI
 * @param {Array} pixel_array : An array of pixels
 * @param {Number} width : The width of the image (must be positive)
 * @param {Number} height : The height of the image (must be positive)
 * @return {string} :  The data URI
 */
const pixelArrayToURI = (
  pixelArray: Uint8ClampedArray,
  width: number,
  height: number,
): string => {
  const png = new RnPng({ width, height, zlibLib: pako });
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = 4 * (x + width * y);
      const r = pixelArray[index];
      const g = pixelArray[index + 1];
      const b = pixelArray[index + 2];
      png.setPixelAt([x, y], [r, g, b]);
    }
  }
  const base64ImageData = base64js.fromByteArray(png.getBuffer());
  return `data:image/png;base64,${base64ImageData}`;
};

type BlurHashDecoderType = {
  getTabColor: (percentageFromBottom?: number) => Array<number>;
  getURI: () => string;
}

/**
 * @desc Blur has module
 * @param {string} blurHash : The blur hash string
 */
const BlurHashDecoder = (blurHash: string): BlurHashDecoderType => {
  const height = 16;
  const width = 16;
  const pixelArray = decodeBlurHash(blurHash, width, height);
  return {
    getTabColor: (percentageFromBottom?: number): Array<number> => {
      const mPercentageFromBottom = percentageFromBottom || 10;
      const startHeight = ~~(height - height * (mPercentageFromBottom / 100.0));
      return getAveragePixels(pixelArray, 0, startHeight, width, height, 4);
    },
    getURI: (): string => pixelArrayToURI(pixelArray, width, height),
  };
};
export default {
  BlurHashDecoder,
  asyncImageResize,
};
