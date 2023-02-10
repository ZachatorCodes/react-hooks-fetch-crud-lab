import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestionList(data));
  }, []);

  function handleDeleteItem(deletedItem) {
    const updatedQuestions = questionList.filter(
      (question) => question.id !== deletedItem.id
    );
    setQuestionList(updatedQuestions);
  }

  function handleChangeCorrectAnswer(updatedQuestion) {
    const updatedQuestions = questionList.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion;
      } else {
        return question;
      }
    });
    setQuestionList(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionList.map((question) => (
          <QuestionItem
            question={question}
            key={question.id}
            onDeleteItem={handleDeleteItem}
            onAnswerChange={handleChangeCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
