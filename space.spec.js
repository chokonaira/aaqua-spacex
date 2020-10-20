import SpaceX from "./space";
import { lanchPadById } from "./mockObject";
import axios from "axios";

jest.mock("axios");

describe("SpaceX", () => {
  it("should return a single lauchpad object if correct ID is provided", async () => {
    await axios.get.mockImplementationOnce(() => Promise.resolve(lanchPadById));
    const spaceUrl = new SpaceX("https://api.spacexdata.com/v4/launchpads");
    expect(
      spaceUrl.fetchALauchpad("5e9e4502f5090995de566f86")
    ).resolves.toEqual(lanchPadById);
  });

  it("should return error message if wrong ID is provided", async () => {
    const errorMessage = "Not Found";
    await axios.get.mockImplementationOnce(() => Promise.reject(errorMessage));
    const spaceUrl = new SpaceX("https://api.spacexdata.com/v4/launchpads");
    expect(spaceUrl.fetchALauchpad("wrongid")).resolves.toEqual(
      errorMessage
    );
  });
});
