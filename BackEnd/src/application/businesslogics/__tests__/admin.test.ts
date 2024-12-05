import { expect } from 'chai';
import sinon from 'sinon';
import Provider from '../../../infrastructure/dbModels/serviceProvider';
import Admin from "../admin";


describe('findAllProviders', () => {
    afterEach(() => {
        sinon.restore(); // Restore sinon mocks/stubs
    });

    it('should return a list of providers when providers exist', async () => {
        // Mock the Provider.find method
        const mockProviders = [{ name: 'Provider1' }, { name: 'Provider2' }];
        sinon.stub(Provider, 'find').resolves(mockProviders);

        const result = await Admin.findAllProviders();
        expect(result).to.deep.equal(mockProviders);
    });

    it('should log a warning when no providers are found', async () => {
        // Mock the Provider.find method
        sinon.stub(Provider, 'find').resolves([]);
        const consoleWarnSpy = sinon.spy(console, 'warn');

        const result = await Admin.findAllProviders();
        expect(consoleWarnSpy.calledOnceWith("No providers found in the database.")).to.be.true;
        expect(result).to.deep.equal([]);
    });

    it('should throw an error if Provider.find fails', async () => {
        // Mock the Provider.find method to throw an error
        sinon.stub(Provider, 'find').rejects(new Error('Database error'));

        try {
            await Admin.findAllProviders();
        } catch (error) {
            expect(error).to.be.an('error');

        }
    });
});