/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * @author Paul H. Sullivan
 * @date Sep 2020
 * @desc This is where all of the icons are imported for easy imports in other files.
 */

const homeIcon = require('assets/icons/home.png');
const homeIconSelected = require('assets/icons/home_selected.png');
const searchIcon = require('assets/icons/search.png');
const searchIconSelected = require('assets/icons/search_selected.png');
const lockerIcon = require('assets/icons/locker.png');
const lockerIconSelected = require('assets/icons/locker_selected.png');
const cartIcon = require('assets/icons/cart.png');
const cartIconSelected = require('assets/icons/cart_selected.png');
const profileIcon = require('assets/icons/profile.png');
const profileIconSelected = require('assets/icons/profile_selected.png');

const icons = {
  home: {
    focused: homeIconSelected,
    unfocused: homeIcon,
  },
  search: {
    focused: searchIconSelected,
    unfocused: searchIcon,
  },
  locker: {
    focused: lockerIconSelected,
    unfocused: lockerIcon,
  },
  cart: {
    focused: cartIconSelected,
    unfocused: cartIcon,
  },
  profile: {
    focused: profileIconSelected,
    unfocused: profileIcon,
  },
};

export default icons;
