/**
 * @desc Validators
 * @author Matthew P. Burruss
 * @date 1/3/2021
 */

 import { FC } from 'react';
import { Alert, Linking } from 'react-native';

type OpenURLButtonParams = {
  url: string;
  children: FC | JSX.Element | JSX.Element[];
}
const Link = ({ url, children }: OpenURLButtonParams) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);