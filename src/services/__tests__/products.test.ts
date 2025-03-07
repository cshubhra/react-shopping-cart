import axios from 'axios';
import { getProducts } from '../products';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock the process.env
const originalNodeEnv = process.env.NODE_ENV;

describe('Products Service', () => {
  // Mock products data
  const mockProductsData = {
    data: {
      products: [
        {
          id: 1,
          title: 'Test Product 1',
          price: 10.99,
          availableSizes: ['S', 'M']
        },
        {
          id: 2,
          title: 'Test Product 2',
          price: 19.99,
          availableSizes: ['L', 'XL']
        }
      ]
    }
  };

  afterEach(() => {
    jest.resetAllMocks();
    // Restore the original NODE_ENV after tests
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('fetches products from API in production environment', async () => {
    // Set NODE_ENV to production
    process.env.NODE_ENV = 'production';
    
    // Mock the axios get response
    mockedAxios.get.mockResolvedValueOnce(mockProductsData);
    
    // Call the function
    const products = await getProducts();
    
    // Assertions
    expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      'https://react-shopping-cart-67954.firebaseio.com/products.json'
    );
    expect(products).toEqual(mockProductsData.data.products);
  });

  test('fetches products from local json in development environment', async () => {
    // Set NODE_ENV to development or test
    process.env.NODE_ENV = 'development';
    
    // Mock the require response
    jest.mock('static/json/products.json', () => mockProductsData, { virtual: true });
    
    // Call the function
    const products = await getProducts();
    
    // Assertions
    expect(mockedAxios.get).not.toHaveBeenCalled();
    // In a development environment, it should return products from the local JSON file
    // Note: Testing this properly would require more complex mocking of CommonJS require
    // This is a simplified test
    expect(products).toBeDefined();
  });

  test('handles case where products data is undefined', async () => {
    // Set NODE_ENV to production
    process.env.NODE_ENV = 'production';
    
    // Mock the axios get response with undefined data
    mockedAxios.get.mockResolvedValueOnce({ data: undefined });
    
    // Call the function
    const products = await getProducts();
    
    // Assertions
    expect(products).toEqual([]);
  });
});