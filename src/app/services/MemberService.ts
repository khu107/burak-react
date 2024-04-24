import axios from "axios";
import { serverApi } from "../../lib/config";

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<[]> {
    try {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers", result);

      return result.data;
    } catch (error) {
      console.log("Error: getTopUsers", error);
      throw error;
    }
  }
}
export default MemberService;
