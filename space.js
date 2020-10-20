import axios from "axios";

class SpaceX {
  constructor(url, database = []) {
    this.url = url;
    this.database = database;
  }
  async fetchALauchpad(launchpadId) {
    if (launchpadId) {
      return await axios
        .get(`${this.url}/${launchpadId}`)
        .then((response) => response)
        .catch((error) => error);
    }
  }

  async fetchAllStarlink() {
    return await axios
      .get(this.url)
      .then((response) => {
        this.database.push(response);
        return response;
      })
      .catch((error) => error);
  }

  fetchYear2019Starlink(date) {
    const response = this.database.filter((object) => {
      const launchDate = object.spaceTrack.LAUNCH_DATE.split("-")[0];
      if (date == launchDate) {
        return object;
      }
    });
    return response;
  }

  fetchMay5th2019Starlink(date) {
    const response = this.database.filter((object) => {
      const launchDate = object.spaceTrack.LAUNCH_DATE;
      if (date == launchDate) {
        return object;
      }
    });
    return response;
  }
  fetchJune2020Starlink(date) {
    const response = this.database.filter((object) => {
      const launchDate = object.spaceTrack.LAUNCH_DATE.split("-")
        .slice(0, 2)
        .join("-");
      if (date == launchDate) {
        return object;
      }
    });
    return response;
  }
}

export default SpaceX;
