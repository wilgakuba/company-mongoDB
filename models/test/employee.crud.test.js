const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  before(async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/companyDBtest', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe('Reading data', () => {
    before(async () => {
      const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
      await testEmpTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(2);
    });

    it('should return proper document by various params with findOne method', async () => {
      const cases = { firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' };
      const employee = await Employee.findOne(cases);

      expect(employee).to.exist;
      expect(employee.firstName).to.be.equal(cases.firstName);
      expect(employee.lastName).to.be.equal(cases.lastName);
      expect(employee.department).to.be.equal(cases.department);
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await testEmpOne.save();

      const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
      await testEmpTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' }, { $set: { firstName: '=firstName #1=', lastName: '=lastName #1=', department: '=department #1=' } });

      const updatedEmployee = await Employee.findOne({ firstName: '=firstName #1=', lastName: '=lastName #1=', department: '=department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      employee.firstName = '=firstName #1=';
      employee.lastName = '=lastName #1=';
      employee.department = '=department #1=';

      await employee.save();

      const updatedEmployee = await Employee.findOne({ firstName: '=firstName #1=', lastName: '=lastName #1=', department: '=department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'Updated!', lastName: 'Updated!', department: 'Updated!' } });
      const employees = await Employee.find({ firstName: 'Updated!', lastName: 'Updated!', department: 'Updated!' });
      expect(employees.length).to.be.equal(2);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {
    beforeEach(async () => {
      const testEmpOne = new Employee({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      await testEmpOne.save();
  
      const testEmpTwo = new Employee({ firstName: 'firstName #2', lastName: 'lastName #2', department: 'department #2' });
      await testEmpTwo.save();
    });
  
    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
  
      const deletedEmployee = await Employee.findOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      expect(deletedEmployee).to.be.null;
    });
  
    it('should properly remove one document with "deleteMany" method', async () => {
      await Employee.deleteMany({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
  
      const deletedEmployee = await Employee.findOne({ firstName: 'firstName #1', lastName: 'lastName #1', department: 'department #1' });
      expect(deletedEmployee).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(0);
    });
  
    afterEach(async () => {
      await Employee.deleteMany();
    });
  });  
});