import axios from 'axios';
import { getProducts } from '../products';

/**
 * Products Service Unit Tests
 * 
 * This test suite verifies the functionality of the products service which handles
 * retrieving products data from either an API endpoint or a local JSON file.
 */
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('[services] - products', () => {
  const mockProductsData = {
    products: [
      { id: 1, name: 'Product 1' },
      { id: 2, name: 'Product 2' }
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products from firebase in production environment', async () => {
    // Mock the process.env.NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    mockedAxios.get.mockResolvedValueOnce({ data: mockProductsData });

    const result = await getProducts();

    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://react-shopping-cart-67954.firebaseio.com/products.json'
    );
    expect(result).toEqual(mockProductsData.products);

    // Restore original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('should fetch products from local json in non-production environment', async () => {
    // Mock the process.env.NODE_ENV
    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    // Mock require function for static json
    jest.mock('static/json/products.json', () => ({
      data: mockProductsData
    }), { virtual: true });

    const result = await getProducts();

    // Axios should not be called in development
    expect(mockedAxios.get).not.toHaveBeenCalled();
    expect(result).toEqual(mockProductsData.products);

    // Restore original NODE_ENV
    process.env.NODE_ENV = originalNodeEnv;
  });
});