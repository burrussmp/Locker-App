/**
 * @author Matthew P. Burruss
 * @date 2/1/2021
 * @desc Image library services
 */

import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

/**
 * @desc Ensures that the user has permission to select from this library and alerts the user if they have permission
 * @onsuccess
 ```
  {
    name: string;
    type: string;
    uri: string;
  }
 ```
 */
const getImageLibraryPermissions = async (): Promise<boolean> => {
  if (Platform.OS !== 'web') {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      global.alert('Sorry, we need camera roll permissions to make this work!');
    }
    return status === 'granted';
  }
  return false;
};

/**
 * @desc Allows the user to select a media from library
 * @return A promise that resolves to a media type if this works
 * @onsuccess
 ```
  {
    name: string;
    type: string;
    uri: string;
  }
 ```
 */
const pickImageFromLibrary = async (): Promise<{
  name: string;
  type: string;
  uri: string;
}> => {
  const allowed = await getImageLibraryPermissions();
  if (!allowed) {
    throw Error('User has not permitted access to image library');
  }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.cancelled) {
    return {
      name: 'profile_photo',
      type: 'image/png',
      uri: result.uri,
    };
  }
  throw Error('User cancelled the action');
};

export default {
  pickImageFromLibrary,
};
