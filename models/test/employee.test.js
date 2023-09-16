const Employee = require('../employee.model');
const expect = require('chai').expect;

describe('Employee', () => {
  it('should throw an error if no "firstName" arg', async () => {
    const emp = new Employee({});
    try {
      await emp.validate();
      expect.fail('Validation should have failed');
    } catch (err) {
      expect(err.errors.firstName).to.exist;
    }
  });

  it('should throw an error if no "lastName" arg', async () => {
    const emp = new Employee({});
    try {
      await emp.validate();
      expect.fail('Validation should have failed');
    } catch (err) {
      expect(err.errors.lastName).to.exist;
    }
  });

  it('should throw an error if no "department" arg', async () => {
    const emp = new Employee({});
    try {
      await emp.validate();
      expect.fail('Validation should have failed');
    } catch (err) {
      expect(err.errors.department).to.exist;
    }
  });

  it('should throw an error if "firstName" is not a string', async () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const emp = new Employee({ firstName });
      try {
        await emp.validate();
        expect.fail('Validation should have failed');
      } catch (err) {
        expect(err.errors.firstName).to.exist;
      }
    }
  });

  it('should throw an error if "lastName" is not a string', async () => {
    const cases = [{}, []];
    for (let lastName of cases) {
      const emp = new Employee({ lastName });
      try {
        await emp.validate();
        expect.fail('Validation should have failed');
      } catch (err) {
        expect(err.errors.lastName).to.exist;
      }
    }
  });

  it('should throw an error if "department" is not a string', async () => {
    const cases = [{}, []];
    for (let department of cases) {
      const emp = new Employee({ department });
      try {
        await emp.validate();
        expect.fail('Validation should have failed');
      } catch (err) {
        expect(err.errors.department).to.exist;
      }
    }
  });

  it('should not throw an error if "firstName", "lastName" and "department" is okay', async () => {
    const cases = [
      { firstName: 'Jan', lastName: 'Nowak', department: 'Tester' },
      { firstName: 'Anna', lastName: 'Kowalska', department: 'Marketing' }
    ];
    for (let name of cases) {
      const emp = new Employee(name);
      try {
        await emp.validate();
      } catch (err) {
        expect.fail('Validation should not have failed');
      }
    }
  });
});
