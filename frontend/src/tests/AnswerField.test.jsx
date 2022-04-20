import { Button, Checkbox, TextField } from '@mui/material';
import { shallow } from 'enzyme';
import React from 'react';
import AnswerField from '../components/AnswerField'

const mockAllAnswers = [
    [
        {
          "id": 0,
          "answer": "ans1",
          "correct": true
        },
        {
          "id": 1,
          "answer": "ans2",
          "correct": false
        },
        {
          "id": 2,
          "answer": "ans3",
          "correct": false
        }
      ]
]

describe('Answer Field', () => {
    it('Has a TextField for Putting answer', () => {
        const answerField = shallow(<AnswerField />)
        const text = (answerField.find(TextField))
        expect(text.exists()).toEqual(true);
    })

    it('Has a Checkbox for correct answers', () => {
        const answerField = shallow(<AnswerField />)
        const check = (answerField.find(Checkbox))
        expect(check.exists()).toEqual(true);
    })

    it('Cannot delete answers since minimum answer is 2', () => {
        const answerField = shallow(<AnswerField />)
        const btn = (answerField.find(Button))
        expect(btn.exists()).toEqual(false);
    })

    it('onChange for answer', () => {
        const mockUpdate = jest.fn();
        const answerField = shallow(<AnswerField allAnswers={mockAllAnswers} updateAnswers={mockUpdate}/>)
        let text = (answerField.find(TextField))
        text.simulate('change', { target: { value: 'answers' }})
        answerField.update();
        text = (answerField.find(TextField))
        expect(text.props().value).toBe('answers')
    })

    it('change if it is correct answer', () => {
        const mockUpdate = jest.fn();
        const correct = true;
        const answerField = shallow(<AnswerField allAnswers={mockAllAnswers} updateAnswers={mockUpdate} isCorrect={correct}/>)
        let check = (answerField.find(Checkbox))
        check.simulate('change')
        answerField.update();
        check = (answerField.find(Checkbox))
        expect(check.props().checked).toBe(true)
    })

    it('change if it is correct answer', () => {
        const mockUpdate = jest.fn();
        const correct = true;
        const answerField = shallow(<AnswerField allAnswers={mockAllAnswers} updateAnswers={mockUpdate} isCorrect={correct} isDelete={correct}/>)
        let delButton = (answerField.find(Button))
        delButton.simulate('click')
        answerField.update()
        expect(mockUpdate).toHaveBeenCalledTimes(1)
    })
})