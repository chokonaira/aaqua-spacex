import axios from "axios";

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
}

export default SpaceX;
