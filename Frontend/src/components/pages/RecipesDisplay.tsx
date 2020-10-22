
import styled from 'styled-components'
import '../materialized/materialize.css'
import '../materialized/materialize.min.css'

import React, { Component, FunctionComponent, useState } from "react";

import { Modal } from '../modal'
import { RecipeModal } from '../recipe-modal'
import { useModal } from '../useModal';


export const Wrapper = styled.div`
  margin: 10px;

  display: grid;
  background: browm;
  grid-template-rows: min-content min-content;
  grid-template-columns: repeat(2,1fr);
  height: 100vh;
  grid-gap: 5px;
  grid-template-areas:
    'recipe recipe';
  

  @media screen and (max-width: 1050px) {
    grid-template-rows: repeat(5, min-content);
    grid-template-columns: 1fr; 
    height: auto;
    overflow: auto;
    grid-template-areas:
      'recipe'
      'recipe';
  }
`
const Button = styled.button`
    padding: 2px 5px;
    color: black;
    height:50px;
    width: 60%;
    cursor: pointer;
    font-family: 'Source Sans Pro', sans-serif;
   
    
`



const recipes = [{
    name: "Pizzabolle",
    content: [{
        imageUrl: "https://brands-a.prod.onewp.net/app/uploads/sites/4/2018/09/Pizzaboller.jpg",
        time: "1 hour",
        description: "Not healthy, but good as hell."
      },
      
    ]
  },
  {
    name: "Tomatsuppe",
    content: [{
        imageUrl: "https://idagranjansen.com/wp-content/uploads/tomatsuppe__p2b6663.jpg",
        time: "2 hours",
        description: "This is the perfect dish."
      }
    ]
  }
];


const RecipesDisplay: FunctionComponent = () =>{

  const { isShown, toggle } = useModal();
  const onConfirm = () => toggle();
  const onCancel = () => toggle();

    return (/*
      <Wrapper>
        return <div> 
        {
      recipes.map((item, index) => {
        return ( <div>
            <h1>{item.name}</h1>
            { item.content.map((c, i) => <div>
                <img src={c.imageUrl}></img>  
            <h3>{c.time}</h3>
            <h3>{c.description}</h3>
            </div>)}
          </div>
        )
      }
      )
    }
    </div>
    </Wrapper>*/
    <Wrapper>
        {recipes.map((item, index) => {
        return (
        <div className="row">
        <div className="col s12 m6">
        <div className="card" onClick= {toggle}>
            <div className="card-image">
            <img src={item.content[0].imageUrl}/>
            
            
            </div>
            <div className="card-content">
            <span className="card-title">{item.name}</span>   
            <p>{item.content[0].description}</p>
            </div>
        </div>
        </div>
    </div>
        )})
    }
     <Button onClick={toggle}>Open this recipe (picture here)</Button>
      
      <Modal
        isShown={isShown}
        hide={toggle}
        headerText='Pasta BoloNICE'
        modalContent={
          <RecipeModal 
            onConfirm={onConfirm} 
            onCancel={onCancel}
            title='hei'
            time = 'ja'
            description = 'nje'
          />
        }
      />  

    
      
    </Wrapper>   
    )
    
  }
  
  export default RecipesDisplay;