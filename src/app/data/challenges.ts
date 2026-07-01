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
    id:3,

    type:"image",

    question:"Select all cats",

  options: [

    {
      id: 1,
      image: 'assets/images/cat1.jpg',
      isCorrect: true
    },

    {
      id: 2,
      image: 'assets/images/dog1.jpg',
      isCorrect: false
    },

    {
      id: 3,
      image: 'assets/images/car1.jpg',
      isCorrect: false
    },

    {
      id: 4,
      image: 'assets/images/cat2.jpg',
      isCorrect: true
    },

    {
      id: 5,
      image: 'assets/images/tree1.jpg',
      isCorrect: false
    },

    {
      id: 6,
      image: 'assets/images/cat3.jpg',
      isCorrect: true
    },

    {
      id: 7,
      image: 'assets/images/bike1.jpg',
      isCorrect: false
    },

    {
      id: 8,
      image: 'assets/images/house1.jpg',
      isCorrect: false
    },

    {
      id: 9,
      image: 'assets/images/plane1.jpg',
      isCorrect: false
    }

  ],

    answer:["1","4","6"]

  }

];