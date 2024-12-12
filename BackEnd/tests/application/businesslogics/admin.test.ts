import { expect } from "chai";
import sinon from "sinon";
import Provider, { IProvider } from "../../../src/infrastructure/dbModels/serviceProvider";
import Admin from "../../../src/application/businesslogics/admin";

describe("Admin.findAllProviders", () => {
    //This prevents one test from interfering with another.
  afterEach(() => {
    sinon.restore();
  });

  const mockProviders: Partial<IProvider>[] = [
    {
      _id: "1234567890abcdef12345678",
      fullName: "John Doe",
      email: "john.doe@example.com",
      address: {
        city: "New York",
        district: "Brooklyn",
        pin: "11201",
      },
      phone: "1234567890",
      password: "hashedpassword",
      isAdmin: false,
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];


  it("should return a list of providers when providers exist", async () => {
      sinon.stub(Provider, "find").resolves(mockProviders as IProvider[]);
    const result = await Admin.findAllProviders();
    // Verifies that the result returned by findAllProviders matches the mockProviders
    expect(result).to.deep.equal(mockProviders);
    //Checks that the stubbed Provider.find method was called exactly once during the test
    sinon.assert.calledOnce(Provider.find as sinon.SinonStub);
  });

  it("should log a warning when no providers are found", async () => {
    // Arrange
    sinon.stub(Provider, "find").resolves([]);
    const consoleWarnSpy = sinon.spy(console, "warn");

    const result = await Admin.findAllProviders();

    expect(consoleWarnSpy.calledOnceWith("No providers found in the database.")).to.be.true;
    expect(result).to.deep.equal([]);
    sinon.assert.calledOnce(Provider.find as sinon.SinonStub);
  });



  
});
