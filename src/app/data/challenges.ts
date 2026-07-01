import { Challenge } from '../models/challenge';

export const CHALLENGES: Challenge[] = [

  {
    id: 1,
    type: 'math',
    question: 'What is 8 + 5?',
    answer: '13'
  },

  {
    id: 2,
    type: 'text',
    question: 'Type the following text: ANGULAR',
    answer: 'ANGULAR'
  },

  {
    id: 3,
    type: 'image',
    question: 'Select all cats',
    options: [
      'cat.jpg',
      'dog.jpg',
      'cat2.jpg',
      'bird.jpg'
    ],
    answer: [
      'cat.jpg',
      'cat2.jpg'
    ]
  }

];