export{}
import {} from "cypress";

describe('End to end test', () => {
  
  Cypress.config({
    viewportWidth: 1300,
    viewportHeight: 800,
  })

/* Dette funket ikke siden cypress ikke kunne åpne localhost pga syntax error i applikasjonen
    beforeEach(() => {
        cy.visit('http://localhost:3000');
      });
      */
    
      it('Front page loaded', () => {
        cy.visit('http://localhost:3000');
        cy.contains('/');
      });

      
      

      it('There should be 15 recipes on load, and 30 when the user has scrolled to the bottom (pagination)', () => {
        cy.get("[data-cy=recipeCard]").should("have.length", 15) //counts number of recipecards
        cy.scrollTo('bottom', {duration: 5000}) //scrolls to bottom of page to trigger pagination
        cy.get("[data-cy=recipeCard]").should("have.length", 30) //counts types of recipecards, which should now be 30 instead of 15
      });

      it('Search should only return recipes with corresponding category and name', () => {
        cy.get('[data-cy=searchBar]').type('Banana Pancakes') //types "Banana Pancakes" into the text field
        cy.get("[data-cy=recipeCard]").its(".cardTitle").contains("Banana Pancakes") //Checks that all the recipecards displayed has a title including "Banana Pancakes"
      });
    

});