import React, { useState, useEffect } from "react";
import FlashcardList from "./component/FlashcardList";
import "./App.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  useEffect(() => {
    axios
      .get(
        "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"
      )
      .then((res) => {
        setFlashCards(
          res.data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer; //we want our question to be completely in random order, to do so we create another variable called option.
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`, //to ensure it's actually be unique
              questionItem: questionItem.quetion,
              answer: answer,
              options: options.sort(() => Math.random() - 0.5), //50% time we get a positive number and 50% time gives negetive numbers
            };
          })
        );
        console.log(res.data);
      });
  }, []);

  //Decode string
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="container">
      <h1>Hello World</h1>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}
const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    quetion: "what is 2+2",
    answer: "4",
    options: ["2", "4", "5"],
  },
  {
    id: 2,
    quetion: "what is getorade?",
    answer: "drink",
    options: ["animal", "mammal", "drink"],
  },
];
export default App;
