import React, { Component, FunctionComponent, useState } from "react";
import { render } from "react-dom";
import { Modal } from '../modal'
import { RecipeModal } from '../recipe-modal'
import { useModal } from '../useModal';
import styled from 'styled-components'
import RecipesDisplay from './RecipesDisplay'

//https://nainacodes.com/blog/create-an-
import Form from '../form';

export const Wrapper = styled.div`
  margin: 10px;

  display: grid;
  background: #FFFFFF;
  grid-template-rows: min-content min-content auto;
  grid-template-columns: repeat(4,1fr);
  height: 100vh;
  grid-gap: 5px 0px;
  grid-template-areas:
    'search search search button'
    'categories recipes recipes recipes'
    'categories recipes recipes recipes';
  

  @media screen and (max-width: 1050px) {
    grid-template-rows: repeat(5, min-content);
    grid-template-columns: 1fr 1fr; 
    height: auto;
    overflow: auto;
    grid-template-areas:
      'search button'
      'categories categories'
      'recipes recipes';
  }
`
/**** BUTTON AREA ****/
const Button = styled.button`
    padding: 2px 5px;
    color: black;
    height:50px;
    width: 60%;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
   
    
`
const ButtonArea = styled.div `
    grid-area: button;
    position: relative;
    display: flex;
    justify-content: left;
    align-items: left;
   height:50px; 
    

`

/**** SEARCH BAR ****/
const Search = styled.div`
    grid-area: search;
   height: 50px;
    width: 100%;
    text-align:center;

    
   
`
const SearchBar = styled.input`
  
    width:80%;
    height: 50px;
    font-size: 17px;
    font-family: 'Source Sans Pro', sans-serif;
  
`
/**** CATEGORIES ****/
const Categories= styled.div`
    grid-area: categories;
    text-decoration: none;
    font-family: 'Source Sans Pro', sans-serif;
    display: inline-block;
    vertical-align: middle;
    /*
    text-align:center;
    */

`
const CheckBox = styled.input`

`

/**** RECIPES ****/
const Recipe = styled.div`
    grid-area: recipes;
    
    
`

const Recipes: FunctionComponent = () => {
    /** MODAL **/
  const { isShown, toggle } = useModal();
  const onConfirm = () => toggle();
  const onCancel = () => toggle();

  

//https://www.youtube.com/watch?v=TWODzlTeZUM
  return (
    <React.Fragment>
        <Wrapper>
       <Search>
        <SearchBar type="search" placeholder="Hva har du lyst på i dag?"/> 
       </Search>
       <ButtonArea>
            <Button type="submit">SØK</Button>
       </ButtonArea>

        <Categories>
           
            <h2>Kategorier</h2>
            
            <CheckBox type="checkbox" ></CheckBox>
            <label> Frokost</label>
            <br></br>
            <CheckBox type="checkbox" ></CheckBox>
            <label> Lunsj</label>
            <br></br>
            <CheckBox type="checkbox" ></CheckBox>
            <label> Frokost</label>
            <br></br>
            
        </Categories>
        <Recipe>

          <RecipesDisplay></RecipesDisplay> 
          {/* 
        <Button onClick={toggle}>Open this recipe (picture here)</Button>
      
        <Modal
          isShown={isShown}
          hide={toggle}
          headerText='Pasta BoloNICE'
          modalContent={
            <RecipeModal 
              onConfirm={onConfirm} 
              onCancel={onCancel}
              title='title'
            />
          }
        />  
 */}
      
        </Recipe>
       
        </Wrapper>
    </React.Fragment>

  );
};

export default Recipes
