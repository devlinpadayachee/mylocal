'use strict';
import {AsyncStorage} from 'react-native';

const getCart = async () => {
  try {
    console.log("Getting Cart From Global Class");
    let current_cart = JSON.parse(await AsyncStorage.getItem('cart'));
    if (current_cart != null){
      return current_cart;
    } else {
      await AsyncStorage.setItem('cart', "[]");
      return [];
    }
  } catch (error) {
    console.log(error);
    await AsyncStorage.setItem('cart', "[]");
    return [];
  }
}

const getCartCount = async () => {
  console.log("Getting Cart Item Count");
  try {
    console.log("Getting Cart From Global Class");
    let current_cart = JSON.parse(await AsyncStorage.getItem('cart'));
    if (current_cart != null){
      return current_cart.length;
    } else {
      await AsyncStorage.setItem('cart', "[]");
      return 0;
    }
  } catch (error) {
    console.log(error);
    await AsyncStorage.setItem('cart', "[]");
    return 0;
  }
}

const setCart = async (cart) => {

    console.log("Setting Cart From Global Class");
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      return true
    } catch (error) {
      return false
    }
}

export {getCart,getCartCount,setCart}
