import React, { useState, useEffect, useRef } from 'react';

//useRef : allows us to get the reference of different element of our page
export default function Flashcard({ flashcard }) {

  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState('initial');
  const frontEl = useRef(); //refers to current front Element of the card
  const backEl = useRef();
  
  //Set the height of the flashcard element dynamically
  function setMaxHeight(){
    const frontHeight = frontEl.current.getBoundingClientRect().height; //refers to current front Element of the card
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));  //setting a default minimum (100) and max height and passing through setHeight function
  }
  
  useEffect(setMaxHeight,
  [flashcard.question, flashcard.answer, flashcard.options]); //anytime these element changes we are going to recalculate the height

  //recalculate height everytime the page size changes
  useEffect(()=>{
    window.addEventListener('resize', setMaxHeight);
    return() => window.removeEventListener('resize', setMaxHeight);
  }, [])

  return (
   <div className= {`card ${flip? 'flip': ''}`}
      style= {{height: height}}
      onClick = {() => setFlip(!flip)}
   >
    <div className="front" ref={frontEl}>
      {flashcard.question}
      <div className="flashcard-options">
        {flashcard.options.map((option,id) =>{
          return <div className="flashcard-option" key={id}>{option} </div>
        })}
      </div>
    </div>
    <div className="back" ref={backEl}>{flashcard.answer}</div>
    </div>
  )  
}

