import './App.css';
import React, {usestate} from 'react';
import FlashcardList from './component/FlashcardList';

function App() {
  const [flashcards, setFlashcards] = usestate(sampleFLashcards);
  return (
    <div className="App">
      <h1>Hello World</h1>
      <FlashcardList flashcards={flashcards}/>
    </div>
  );
}
const sampleFLashcards = [
  {
    id: 1,
    question: 'What is 2+2?',
    answer: '4',
    option: [
       '2','3', '4','5'
    ]
  }, 
  {
    id: 2,
    question: 'What is 4+2?',
    answer: '4',
    option: [
       '2','3', '4','6'
    ]
  }, 
]
export default App;
