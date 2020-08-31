"use strict";

const isLoggedIn = (state : any) : Boolean => {
    if (state.auth.token != ""){
      return true;
    } else {
      return false;
    }
}

export default {
    isLoggedIn
}