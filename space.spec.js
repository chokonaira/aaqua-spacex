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
    expect(starlinksUrl.FetchAllStarlink()).resolves.toEqual(starLinksSateliteArray);
  });

  it("should return error message if wrong url is provided", async () => {
    const errorMessage = "Not Found";
    await axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
    const starlinksUrl = new SpaceX("https://api.spacexdata.com/v4/wronglink");
    expect(starlinksUrl.FetchAllStarlink()).resolves.toEqual(errorMessage);
  });

  
});
