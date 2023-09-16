const Department = require('../department.model.js');
const expect = require('chai').expect;

describe('Department', () => {

    it('should throw an error if no "name" arg', async () => {
        const dep = new Department({}); // create new Department, but don't set `name` attr value
    
      dep.validateSync(err => {
        expect(err.errors.name).to.exist;
      });
    
    });

    it('should throw an error if "name" is not a string', () => {

        const cases = [{}, []];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
    });

    it('should throw an error if "name" is too short or too long', () => {

        const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip']; // we test various cases, some of them are too short, some of them are too long
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err.errors.name).to.exist;
          });
      
        }
      
    });

    it('should not throw an error if "name" is okay', () => {

        const cases = ['Management', 'Human Resources'];
        for(let name of cases) {
          const dep = new Department({ name });
      
          dep.validateSync(err => {
            expect(err).to.not.exist;
          });
      
        }
      
    });
  
});