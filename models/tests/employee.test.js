const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

//const args = [firstName, lastName, department];

describe('Employee', () => {

    it('should throw an error if no args passed', () => {
        const emp = new Employee({});
        emp.validate(err => {
            expect(err).to.exist;
        });
    });

    it('should throw an error if "firstName" is not a string', () => {

      const cases = [{}, []];
      for(let firstName of cases) {
        const emp = new Employee({ firstName });
    
        emp.validate(err => {
          expect(err.errors.firstName).to.exist;
        });    
      }    
    });

    it('should throw an error if "lastName" is not a string', () => {

      const cases = [{}, []];
      for(let lastName of cases) {
        const emp = new Employee({ lastName });
    
        emp.validate(err => {
          expect(err.errors.lastName).to.exist;
        });    
      }    
    });

    it('should throw an error if "department" is not a string', () => {

      const cases = [{}, []];
      for(let department of cases) {
        const emp = new Employee({ department });
    
        emp.validate(err => {
          expect(err.errors.department).to.exist;
        });    
      }    
    });

});

after(() => {
  mongoose.models = {};
});