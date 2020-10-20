import axios from "axios";

class SpaceX {
  constructor(url) {
    this.url = url;
  }

fetchALauchpad(launchpadId) {
    if (launchpadId) {
      return axios
        .get(`${this.url}/${launchpadId}`)
        .then((response) => response)
        .catch((error) => error);
    } else {
      return {};
    }
  }
}

export default SpaceX;
