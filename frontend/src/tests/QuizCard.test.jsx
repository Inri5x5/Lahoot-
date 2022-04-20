import { shallow } from 'enzyme';
import React from 'react';
import QuizCard from '../components/QuizCard';
import { Button, Dialog, Typography } from '@mui/material';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const mockQuiz = {
    id: "996885923",
    name: "Quiz 2",
    owner: "a",
    questions: [
        {
            question: "What is my name?",
            timeLimit: "60",
        },
        {
            question: "Where is my house?",
            timeLimit: "120",
        }
    ],
    thumbnail: null,
    active: null,
    createdAt: "2022-04-20T07:39:30.303Z",
    totalTime: "180",
    totalQuestions: "2"
}

const noop = () => {};

describe('QuizCard Component', () => {
    it('Quiz Title Exist and Has the proper Value', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const title = (quiz.find(Typography)).findWhere((node) => node.props().label === 'title')
        /* Title exists */
        expect(title.exists()).toEqual(true);
        /* Have a corresponding Title */
        expect(title.text()).toBe(mockQuiz.name)
    })

    it('Quiz Total Time Exist and Has the proper Value', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const totalTime = (quiz.find(Typography)).findWhere((node) => node.props().label === 'totalTime')
        /* Total Time field exists */
        expect(totalTime.exists()).toEqual(true);
        /* Have the correspondin total time */
        expect(totalTime.text()).toBe('180 seconds')
    })

    it('Quiz Number of Question Exist and Has the proper Value', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const questionNum = (quiz.find(Typography)).findWhere((node) => node.props().label === 'questionNum')
        /* Total question field exists */
        expect(questionNum.exists()).toEqual(true);
        /* Have the corresponding total question */
        expect(questionNum.text()).toBe('2')
    })

    it('Has two button delete and start the quiz' , () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const deleteButton = (quiz.find(Button)).findWhere((node) => node.props().id === 'deleteButton')
        const startButton = (quiz.find(Button)).findWhere((node) => node.props().id === 'startButton')
        expect(deleteButton.exists()).toEqual(true);
        expect(startButton.exists()).toEqual(true);
    })
    
    it('Dialog for starting session and end session is closed at start', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        /* Start session */
        let dialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'startSession')
        expect(dialog.props().open).toEqual(false);
        /* End Session */
        dialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'stopSession')
        expect(dialog.props().open).toEqual(false);
    })
    
    it('End Session result in 2 option button [Yes, No]', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const dialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'stopSession')
        expect(dialog.find(Button).length).toBe(2)
        expect(dialog.find(Button).at(0).text()).toBe('Yes')
        expect(dialog.find(Button).at(1).text()).toBe('No')
    })

    it('Start Session have 3 button [Copy link, next question, stop question]', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        const dialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'startSession')
        expect(dialog.find(Button).length).toBe(3)
        expect(dialog.find(Button).at(0).text()).toBe('Copy Link!')
        expect(dialog.find(Button).at(1).text()).toBe(' Next Question ')
        expect(dialog.find(Button).at(2).text()).toBe('  Stop Quiz ')
    })

    it('Openning Start session dialog', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        quiz.find('#startButton').simulate('click')
        const dialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'startSession')
        expect(dialog.props().open).toEqual(true);
    })
    
    it('Closing the dialog', () => {
        const quiz = shallow(<QuizCard quiz={mockQuiz}/>)
        quiz.find('#startButton').simulate('click')
        /* Start Quiz dialog open */
        let startDialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'startSession')
        expect(startDialog.props().open).toEqual(true);
        quiz.find('#endButton').simulate('click');
        /* End Quiz want to get result dialog open */
        let endDialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'stopSession')
        expect(endDialog.props().open).toEqual(true);
        quiz.find('#closeDialog').simulate('click');
        startDialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'startSession')
        endDialog = (quiz.find(Dialog)).findWhere((node) => node.props().id === 'stopSession')
        expect(endDialog.props().open).toEqual(false);
        expect(startDialog.props().open).toEqual(false);
    })

    it('Delete a quiz', () => {
        const modifyQuiz = jest.fn();
        const quiz = shallow(<QuizCard quiz={mockQuiz} modifyQuizzes={modifyQuiz}/>)
        quiz.find('#deleteButton').simulate('click', {currentTarget: {id: mockQuiz.id} })
        quiz.update();
    })

})