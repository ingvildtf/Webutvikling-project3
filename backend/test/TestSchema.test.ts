import { expect } from 'chai'
import 'mocha';
import { mockServer } from 'graphql-tools'
import { MockList } from 'graphql-tools'
const schema = require('../graphql/schema/index')
import 'ts-node';

//****TO RUN TYPE (in backend folder): npm test ****/

//get the fiels of the query og the schema
const filter = schema.query;



describe('recipes', 
  () => { 
    it('Returns recipe with the right fields', async  () => { 
        //The purpose of mocking is to isolate and focus on the code being
        //tested and not on the behavior or state of external dependencies.
        
        const testMockServer = mockServer(schema, {
            Name: () => 'String',
            Image: () => 'String'
          })
          //recipes(offset: Int, limit: Int)
          const response = await testMockServer.query(`{ 
            recipes(offset: 0, limit: 0){
                name,
                image
            }
          }`)
          

          //expect(response.data && response.data.recipes).to.have.lengthOf.above(1)

//if respone.data is empty then return null, if not forEach in recipes
     response.data && response.data.filter.getFields().recipes.forEach((recipes: any) => {
      expect(filter.getFields().recipes.Name).to.equal('string')
      expect(filter.getFields().recipes.Image).to.equal('string')
    })

    
  }); 
});

describe('search', 
  () => { 
    it('Returns recipe where the name or the category contains search string', async  () => {
        
        const testMockServer = mockServer(schema, {
            Name: () => 'String',
            Category: () => 'string'
          })
          //searchRecipes(searchSequence: String!, offset: Int, limit: Int)
          const response = await testMockServer.query(`{ 
            searchRecipes(searchSequence: '', offset: 0, limit: 0){
                Name,
                Category
            }
          }`)

//if respone.data is empty then return null, if not forEach in searchRecipes
     response.data && response.data.filter.getFields().searchRecipes.forEach((recipes: any) => {
      expect(filter.getFields().searchRecipes.Name).to.contain('string')
      expect(filter.getFields().earchRecipes.Category).to.contain('string')
    })

    
  }); 
});

