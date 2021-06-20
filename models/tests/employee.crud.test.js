const Employee = require('../employee.model');
const expect = require('chai').expect;
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
const mongoose = require('mongoose');

describe('Employee', () => {

  before(async () => {

    try {
        const fakeDB = new MongoMemoryServer();
        const uri = await fakeDB.getConnectionString();
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
        console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testEmpOne = new Employee({
          firstName: "Albert",
          lastName: "Einstein",
          department: "IT"
      });
      await testEmpOne.save();

      const testEmpTwo = new Employee({
          firstName: "Woody",
          lastName: "Allen",
          department: "Testing"
      });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      const expectedLength = 2;
      expect(employees.length).to.be.equal(expectedLength);
    });

    it('should return proper document by various params with "findOne" method.', async () => {
      const employee = await Employee.findOne({firstName: "Albert"});
      expect(employee.firstName).to.be.equal("Albert");
    });

    it('should return proper document by various params with "findOne" method.', async () => {
      const employee = await Employee.findOne({lastName: "Allen"});
      expect(employee.lastName).to.be.equal("Allen");
    });

    it('should return proper document by various params with "findOne" method.', async () => {
      const employee = await Employee.findOne({department: "Testing"});
      expect(employee.department).to.be.equal("Testing");
    });

    after(async () => {
      await Employee.deleteMany();
    });


  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const testEmpOne = new Employee({
        firstName: "Albert",
        lastName: "Einstein",
        department: "IT"
      });
      await testEmpOne.save();
      expect(testEmpOne.isNew).to.be.false;
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
        const testEmpOne = new Employee({
            firstName: "Albert",
            lastName: "Einstein",
            department: "IT",
        });
        await testEmpOne.save();
    
        const testEmpTwo = new Employee({
            firstName: "Woody",
            lastName: "Allen",
            department: "Testing",
        });
        await testEmpTwo.save();
    });
    
    it('should properly update one document with "updateOne" method', async () => {
        await Employee.updateOne({ firstName: 'Albert'}, {$set: {firstName: 'Robert' }});
        const updated = await Employee.findOne({ firstName: 'Robert' });
        expect(updated).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Albert' });
        employee.firstName = 'Robert';
        await employee.save();

        const updated = await Employee.findOne({ firstName: 'Robert' });
        expect(updated).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
        await Employee.updateMany({}, { $set: {firstName: 'Robert' }});
        const employees = await Employee.find();
        expect(employees[0].firstName).to.be.equal('Robert');
        expect(employees[1].firstName).to.be.equal('Robert');
    });
    
    afterEach(async () => {
        await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({
        firstName: "Albert",
        lastName: "Einstein",
        department: "IT",
        });
        await testEmpOne.save();
    
        const testEmpTwo = new Employee({
            firstName: "Woody",
            lastName: "Allen",
            department: "Testing",
        });
        await testEmpTwo.save();
    });
    
    it('should properly remove one document with "deleteOne" method', async () => {
        await Employee.deleteOne({ firstName: 'Woody' });
        const removedEmployee = await Employee.findOne({ firstName: 'Woody' });
        expect(removedEmployee).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
        const employee = await Employee.findOne({ firstName: 'Woody' });
        await employee.remove();
        const removedEmployee = await Employee.findOne({ firstName: 'Woody' });
        expect(removedEmployee).to.be.null;
    });
    
    it('should properly remove multiple documents with "deleteMany" method', async () =>{
        await Employee.deleteMany();
        const employees = await Employee.find();
        expect(employees.length).to.be.equal(0);
    });

    afterEach(async () => {
        await Employee.deleteMany();
    });
  });

});