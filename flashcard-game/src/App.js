import React, { useState } from 'react';
import FlashcardList from './component/FlashcardList';
import './App.css';
// import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  return (
     
      <div className="container">
         <h1>Hello World</h1>
        <FlashcardList flashcards={flashcards} />
      </div>

  );
}
const  SAMPLE_FLASHCARDS = [
  {
    id: 1,
    quetion: 'what is 2+2',
    answer: '4',
    options: ['2', '4', '5']
  },
  {
    id: 2,
    quetion: 'what is getorade?',
    answer: 'drink',
    options: ['animal', 'mammal', 'drink']
  }
]
export default App;
