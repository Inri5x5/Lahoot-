import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import { shallow } from 'enzyme';
import React from 'react';
import EditQuestionForm from '../components/EditQuestionForm';

const mockQuestion = {
    id: "75ba2153",
    question: "q1",
    timeLimit: "60",
    points: "45",
    questionType: "singleChoice",
    mediaType: "",
    questionAttachment: "",
    answers: [
      {
        id: 0,
        answer: "ans1",
        correct: true
      },
      {
        id: 1,
        answer: "ans2",
        correct: false
      },
      {
        id: 2,
        answer: "ans3",
        correct: false
      }
    ]
  }

describe('EditQuestionForm', () => {
    it('Has Question Field', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        const questionField = (questionForm.find('#questName'))
        expect(questionField.exists()).toEqual(true)
    })

    it('valid question name and can change', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        let questionField = (questionForm.find('#questName'))
        expect(questionField.props().defaultValue).toBe(mockQuestion.question);
        /* Changing its value*/
        questionField.simulate('change', { target: {value: 'q2'} })
        questionForm.update();
        questionField = (questionForm.find('#questName'))
        expect(questionField.props().defaultValue).toBe('q2');
    })

    it('Has TimeLimit field', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        const timeField = (questionForm.find('#timeLimit'))
        expect(timeField.exists()).toEqual(true)
    })

    it('valid time limit and can change', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        let timeField = (questionForm.find('#timeLimit'))
        expect(timeField.props().defaultValue).toBe(mockQuestion.timeLimit);
        /* Changing its value*/
        timeField.simulate('blur', { target: {value: '80'} })
        questionForm.update();
        timeField = (questionForm.find('#timeLimit'))
        expect(timeField.props().defaultValue).toBe(80);
    })

    it('Has points Field', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        const pointsField = (questionForm.find('#pointsWorth'))
        expect(pointsField.exists()).toEqual(true)
    })

    it('valid time limit and can change', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        let pointsField = (questionForm.find('#pointsWorth'))
        expect(pointsField.props().defaultValue).toBe(mockQuestion.points);
        /* Changing its value*/
        pointsField.simulate('blur', { target: {value: '90'} })
        questionForm.update();
        pointsField = (questionForm.find('#pointsWorth'))
        expect(pointsField.props().defaultValue).toBe(90);
    })


    it('Has a choice between multi choice or single choice', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        const singleChoice = (questionForm.find('#SC'))
        const multiChoice = (questionForm.find('#MC'))
        expect(singleChoice.exists()).toEqual(true)
        expect(multiChoice.exists()).toEqual(true)
    })

    it('Has checkBox for media type', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion}/>)
        const checkImage = (questionForm.find(FormControlLabel)).findWhere((node) => node.props().label === 'Image')
        const checkVideo = (questionForm.find(FormControlLabel)).findWhere((node) => node.props().label === 'Video Url')
        expect(checkImage.exists()).toEqual(true)
        expect(checkVideo.exists()).toEqual(true)
    })

    it('Has Button for cancel and Edit Question', () => {
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion} isAdd={false}/>)
        const cancelBtn = (questionForm.find('#cancelBtn'))
        const saveBtn = (questionForm.find('#saveBtn'))
        expect(cancelBtn.exists()).toEqual(true)
        expect(saveBtn.exists()).toEqual(true)
    })

    it('Cancel the edit with btn', () => {
        const cancel = jest.fn()
        const questionForm = shallow(<EditQuestionForm selectedQuestion={mockQuestion} cancelModified={cancel}/>)
        const cancelBtn = (questionForm.find('#cancelBtn'))
        cancelBtn.simulate('click')
        expect(cancel).toHaveBeenCalledTimes(1);
    })

})