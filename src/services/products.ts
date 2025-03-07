/**
 * Products service file
 * This module provides functionality to fetch product data from either an API or local json file
 * depending on the environment mode.
 */

import axios from 'axios';
import { IGetProductsResponse } from 'models';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * Retrieves a list of products
 * 
 * In production mode, it fetches products from the Firebase API endpoint.
 * In development mode, it loads products from a local JSON file.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of product objects
 */
export const getProducts = async () => {
  let response: IGetProductsResponse;

  if (isProduction) {
    response = await axios.get(
      'https://react-shopping-cart-67954.firebaseio.com/products.json'
    );
  } else {
    response = require('static/json/products.json');
  }

  const { products } = response.data || [];

  return products;
};