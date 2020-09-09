/**
  * @author Paul H. Sullivan
  * @date Sep 2020
  * @desc This is where all of the icons are imported for easy imports in other files.
*/

import homeIcon from 'assets/icons/home.png'
import homeIconSelected from 'assets/icons/home_selected.png'
import searchIcon from 'assets/icons/search.png'
import searchIconSelected from 'assets/icons/search_selected.png'
import lockerIcon from 'assets/icons/locker.png'
import lockerIconSelected from 'assets/icons/locker_selected.png'
import cartIcon from 'assets/icons/cart.png'
import cartIconSelected from 'assets/icons/cart_selected.png'
import profileIcon from 'assets/icons/profile.png'
import profileIconSelected from 'assets/icons/profile_selected.png'

const icons = {
    home: {
        focused: homeIconSelected,
        unfocused: homeIcon
    },
    search: {
        focused: searchIconSelected,
        unfocused: searchIcon
    },
    locker: {
        focused: lockerIconSelected,
        unfocused: lockerIcon
    },
    cart: {
        focused: cartIconSelected,
        unfocused: cartIcon
    },
    profile: {
        focused: profileIconSelected,
        unfocused: profileIcon
    }
}

export default icons;