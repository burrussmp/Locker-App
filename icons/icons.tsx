/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is where all of the icons are imported for easy imports in other files.
 */
import { ImageSourcePropType } from 'react-native';

import homeIcon from 'assets/icons/home.png';
import homeIconSelected from 'assets/icons/home_selected.png';
import searchIcon from 'assets/icons/search.png';
import searchIconSelected from 'assets/icons/search_selected.png';
import lockerIcon from 'assets/icons/locker.png';
import lockerIconSelected from 'assets/icons/locker_selected.png';
import cartIcon from 'assets/icons/cart.png';
import cartIconSelected from 'assets/icons/cart_selected.png';
import profileIcon from 'assets/icons/profile.png';
import profileIconSelected from 'assets/icons/profile_selected.png';
import likeIcon from 'assets/icons/like.png';
import likeIconSelected from 'assets/icons/liked.png';
import likeIconSmall from 'assets/icons/like_small.png';
import likeIconSmallSelected from 'assets/icons/liked_small.png';
import lockIcon from 'assets/icons/lock.png';
import lockIconSelected from 'assets/icons/locked.png';
import moreIcon from 'assets/icons/more.png';

const icons = {
  home: {
    focused: homeIconSelected as ImageSourcePropType,
    unfocused: homeIcon as ImageSourcePropType,
  },
  search: {
    focused: searchIconSelected as ImageSourcePropType,
    unfocused: searchIcon as ImageSourcePropType,
  },
  locker: {
    focused: lockerIconSelected as ImageSourcePropType,
    unfocused: lockerIcon as ImageSourcePropType,
  },
  cart: {
    focused: cartIconSelected as ImageSourcePropType,
    unfocused: cartIcon as ImageSourcePropType,
  },
  profile: {
    focused: profileIconSelected as ImageSourcePropType,
    unfocused: profileIcon as ImageSourcePropType,
  },
  like: {
    liked: likeIconSelected as ImageSourcePropType,
    unliked: likeIcon as ImageSourcePropType,
    liked_small: likeIconSmallSelected as ImageSourcePropType,
    unliked_small: likeIconSmall as ImageSourcePropType,
  },
  lock: {
    locked: lockIconSelected as ImageSourcePropType,
    unlocked: lockIcon as ImageSourcePropType,
  },
  more: {
    more: moreIcon as ImageSourcePropType,
  },
};

export default icons;
