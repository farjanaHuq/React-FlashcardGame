import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./component/FlashcardList";
import "./App.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashCards] = useState(SAMPLE_FLASHCARDS);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  //get category from API
  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  });



  useEffect(() => {
  // axios
  //   .get(
  //     "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"
  //   )
  //   .then((res) => {
  //     setFlashCards(
  //       res.data.results.map((questionItem, index) => {
  //         const answer = questionItem.correct_answer; //we want our question to be completely in random order, to do so we create another variable called option.
  //         const question = decodeString(questionItem.question);
  //         const options = [
  //           ...questionItem.incorrect_answers.map((a) => decodeString(a)),
  //           answer,
  //         ];
  //         return {
  //           id: `${index}-${Date.now()}`, //to ensure it's actually be unique
  //           question: question,
  //           answer: answer,
  //           options: options.sort(() => Math.random() - 0.5), //50% time we get a positive number and 50% time gives negetive numbers
  //         };
  //       })
  //     );
  //     console.log(res.data);
  //   });
  }, []);

  //Decode string
  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashCards(
          res.data.results.map((questionItem, index) => {
            const answer = questionItem.correct_answer; //we want our question to be completely in random order, to do so we create another variable called option.
            const options = [
              ...questionItem.incorrect_answers.map((str) => decodeString(str)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`, //to ensure it's actually be unique
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5), //50% time we get a positive number and 50% time gives negetive numbers
            };
          })
        );
         console.log(res.data);
      });
  }

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category) => {
              return (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of Questions</label>
          <input
            type="number"
            id="amount"
            min={1}
            step={1}
            defaultValue={10}
            ref={amountEl}
          ></input>
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>

      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}
const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "what is 2+2?",
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
