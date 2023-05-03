import React, { Component } from 'react'
import {QuizData} from './QuizData'
import './styles.css'
export class Quiz extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
           userAnswer: null,
           currentIndex: 0,
           options: [],
           quizEnd: false,
           score: 0,
           disabled: true
      
        }
      }
      
      loadQuiz = () => {
          const {currentIndex} = this.state;
          this.setState(() => {
              return {
                  question: QuizData[currentIndex].question,
                  options:  QuizData[currentIndex].options, 
                  answer: QuizData[currentIndex].answer
              }
          })
      
      }

      nextQuestionHandler = () => {
      const {userAnswer, answer, score} = this.state
      
      if(userAnswer === answer) {
          this.setState({
              score: score + 1
          })
        }
      this.setState({
          currentIndex: this.state.currentIndex + 1,
          userAnswer: null 
      })
      }
      
      componentDidMount() {
          this.loadQuiz();
      }
      
      checkAnswer = answer => {
          this.setState({
              userAnswer: answer,
              disabled: false
          })
      }
      componenttDidUpdate(prevProps, prevState){ 
          const{currentIndex} = this.state; 
          if(this.state.currentIndex !== prevState.currentIndex){
              this.setState(() => {
                  return {
                      question: QuizData[currentIndex].question,
                      options:  QuizData[currentIndex].options, 
                      answer: QuizData[currentIndex].answer
                  }
              });
          }
      }
      
      //This is what appears in the DOM
        render() {
          const {question, options, currentIndex, userAnswer, quizEnd} =this.state
          return (
            <div>
              <h2>{question}</h2>
              <span>{`Question ${currentIndex + 1} of ${QuizData.length}`}</span>
                {
 
                    options.map(option => 
                        <p key = {option.id} className={`options ${userAnswer === option? "selected"  : null}`} 
                        onClick = {() => this.checkAnswer(option)} 
                        >
                        {option}
                        </p>
                        )
                }
            </div>
          )
        }
}





export default Quiz