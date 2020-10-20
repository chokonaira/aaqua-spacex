import axios from "axios";
import { database } from "./runtimeMemory";

class SpaceX {
  constructor(url) {
    this.url = url;
  }
  async fetchALauchpad(launchpadId) {
    if (launchpadId) {
      return await axios
        .get(`${this.url}/${launchpadId}`)
        .then((response) => response)
        .catch((error) => error);
    }
  }

  async FetchAllStarlink() {
    return await axios
      .get(this.url)
      .then((response) => {
        database.push({ ...response });
        return response;
      })
      .catch((error) => error);
  }
}

export default SpaceX;
