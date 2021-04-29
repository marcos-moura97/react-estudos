import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
  StyledForm,
  ASCIITextInput,
  Label,
  Button,
  BrailleTextInput,
  Field
} from './styles'

import BRAILLE from './alfabeto';


function App() {
  const [asciiText, setAsciiText] = useState('')
  const [brailleText, setBrailleText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  const onFormSubmit = e => {
    e.preventDefault()

    var upperText, upperTextLength, brailleText, i;

    upperText = asciiText.toUpperCase();
    upperTextLength = upperText.length;
    brailleText = '';

    for (i = 0; i < upperTextLength; i++) {
        brailleText += !!BRAILLE[upperText[i]] ? BRAILLE[upperText[i]] : '?'
    }

    setErrorMessage('') 

    
    setBrailleText(brailleText)
  }

  return (
    <>
      <h1>Conversor para Braille</h1>

      <StyledForm onSubmit={onFormSubmit}>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        <br />
        <Field>
          <Label>Digite seu texto aqui</Label>
          <div>
            <ASCIITextInput
              autoComplete="off"
              type="text"
              name="texto_ascii"
              placeholder="Digite qualquer coisa :P"
              value={asciiText}
              onChange={e => setAsciiText(e.target.value)}
            />
            <Button type="submit">Converter</Button>
          </div>
        </Field>
        <Field>
          <Label>Saída em Braille</Label>
          <BrailleTextInput
            type="text"
            name="texto_braille"
            value={brailleText}
            disabled
          />
        </Field>
      </StyledForm>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
