import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquery } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getProduct(input: ProductInquery): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;

      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url);
      console.log(result);

      return result.data;
    } catch (error) {
      console.log("Error: getProduct", error);
      throw error;
    }
  }

  public async detailProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });

      return result.data;
    } catch (error) {
      console.log("Error: getProduct", error);
      throw error;
    }
  }
}
export default ProductService;
