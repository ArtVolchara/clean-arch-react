import { useState } from 'react';

interface IWithInputTextProps {
  children: (inputText: string, setInputText: (text: string) => void) => JSX.Element
}

export default function WithInputText(props: IWithInputTextProps) {
  const { children } = props;
  const [inputText, setInputText] = useState('');
  return children(inputText, setInputText);
}
