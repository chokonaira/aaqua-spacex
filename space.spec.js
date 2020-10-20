import SpaceX from "./space";
import axios from 'axios'
jest.mock('axios');


describe("SpaceX", () => {
  test("should return empty object if no url or ID is provided", () => {
    const spaceUrl = new SpaceX('');
    const expected = spaceUrl.fetchALauchpad('');
    expect(expected).toEqual({}); 
  });

  test("should return lauchpad object if url and ID is provided", () => {

    const lanchPadObject = {
      "name": "Kwajalein Atoll",
      "full_name": "Kwajalein Atoll Omelek Island",
      "locality": "Omelek Island",
      "region": "Marshall Islands",
      "timezone": "Pacific/Kwajalein",
      "latitude": 9.0477206,
      "longitude": 167.7431292,
      "launch_attempts": 5,
      "launch_successes": 2,
      "rockets": [
          "5e9d0d95eda69955f709d1eb"
      ],
      "launches": [
          "5eb87cd9ffd86e000604b32a",
          "5eb87cdaffd86e000604b32b",
          "5eb87cdbffd86e000604b32c",
          "5eb87cdbffd86e000604b32d",
          "5eb87cdcffd86e000604b32e"
      ],
      "details": "SpaceX's original pad, where all of the Falcon 1 flights occurred (from 2006 to 2009). It would have also been the launch site of the Falcon 1e and the Falcon 9, but it was abandoned as SpaceX ended the Falcon 1 program and decided against upgrading it to support Falcon 9, likely due to its remote location and ensuing logistics complexities.",
      "status": "retired",
      "id": "5e9e4502f5090995de566f86"
  }
    axios.get.mockImplementationOnce(() => Promise.resolve(lanchPadObject));
    const spaceUrl = new SpaceX('https://api.spacexdata.com/v4/launchpads');
    expect(spaceUrl.fetchALauchpad('5e9e4502f5090995de566f86')).resolves.toEqual(lanchPadObject);
  });

  test("should return error message if wrong ID is provided", async () => {

    const errorMessage = 'Not Found'
    axios.get.mockImplementationOnce(() => Promise.reject(errorMessage))
    const spaceUrl = new SpaceX('https://api.spacexdata.com/v4/launchpads');
    expect(spaceUrl.fetchALauchpad('hhhheggege')).resolves.toEqual(errorMessage);
  });
});
