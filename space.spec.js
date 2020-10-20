import SpaceX from "./space";
import { lanchPadObject, starLinksSateliteArray} from "./mockObject";
import axios from "axios";

jest.mock("axios");

describe("SpaceX", () => {

  it("should fetch a single lauchpad object if correct ID is provided", async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(lanchPadObject));
    const spaceUrl = new SpaceX("https://api.spacexdata.com/v4/launchpads");
    expect(
      spaceUrl.fetchALauchpad("5e9e4502f5090995de566f86")
    ).resolves.toEqual(lanchPadObject);
  });

  it("should return error message if wrong ID is provided", async () => {
    const errorMessage = "Not Found";
    await axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
    const spaceUrl = new SpaceX("https://api.spacexdata.com/v4/launchpads");
    expect(spaceUrl.fetchALauchpad("wrongId")).resolves.toEqual(
      errorMessage
    );
  });

  it("should fetch all starlinks satelights giving the correct url", async () => {
    const database = []
    await axios.get.mockImplementationOnce(() => Promise.resolve(starLinksSateliteArray));
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/starlink");
    database.push({...starLinksSateliteArray})
    expect(starlinksUrl.fetchAllStarlink()).resolves.toEqual(starLinksSateliteArray);
  });

  it("should return error message if wrong url is provided", async () => {
    const errorMessage = "Not Found";
    await axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/wronglink");
    expect(starlinksUrl.fetchAllStarlink()).resolves.toEqual(errorMessage);
  });

  it("should fetch all starlink staelites for launch date of 2019", async () => {
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/starlink", starLinksSateliteArray);
    const data = starlinksUrl.fetchYear2019Starlink("2019")
    expect(data).toEqual([
      {
        id: "5eed770f096e59000698560f",
        spaceTrack: { LAUNCH_DATE: "2019-06-24" },
      },
      {
        id: "5eed770f096e590006985610",
        spaceTrack: { LAUNCH_DATE: "2019-05-05" },
      },
    ]);
  });

  it("should fetch all starlink staelites for launch date of May 5th 2019", async () => {
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/starlink", starLinksSateliteArray);
    const data = starlinksUrl.fetchMay5th2019Starlink("2019-05-05")
    expect(data).toEqual([
    {
      spaceTrack: {
        LAUNCH_DATE: "2019-05-05",
      },
      id: "5eed770f096e590006985610",
    }])
  });

  it("should fetch all starlink staelites for launch date of June 2020", async () => {
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/starlink", starLinksSateliteArray);
    const data = starlinksUrl.fetchJune2020Starlink("2020-06")
    expect(data).toEqual([
    {
      spaceTrack: {
        LAUNCH_DATE: "2020-06-24",
      },
      id: "5eed770f096e59000698560g",
    }])
  });
});
