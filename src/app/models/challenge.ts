import { ImageOption } from './image-option';
export interface Challenge {

  id: number;

  type: 'image' | 'math' | 'text';

  question: string;

  options?: ImageOption[];
  
  answer: string | string[];

}