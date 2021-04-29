import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import {
  StyledForm,
  BinaryTextInput,
  Label,
  Button,
  DecimalTextInput,
  Field
} from './styles'

function App() {
  const [binaryText, setBinaryText] = useState('')
  const [decimalText, setDecimalText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  const onFormSubmit = e => {
    e.preventDefault()

    // tendo a certeza de que só vai aceitar 0 ou 1
    if (binaryText.match(/^[0-1]+$/g) === null) {
      setErrorMessage('É 0 ou 1, padrinho!')
      return
    }

    setErrorMessage('') 

    // Formula:
    // input = 1 => output = 1 * (2^0) = 1
    // input = 10 => output = (0 * (2^0)) + (1 * (2^1)) = 2
    // então invertemos a iteração
    const reversedBinaryText = binaryText
      .split('')
      .map(Number) 
      .reverse()

    
    const result = reversedBinaryText.reduce(
      (accumulator, currentValue, idx) =>
        accumulator + currentValue * Math.pow(2, idx)
    )
    setDecimalText(result)
  }

  return (
    <>
      <h1>Conversor de faixas</h1>

      <StyledForm onSubmit={onFormSubmit}>
        {errorMessage && <span style={{ color: 'red' }}>{errorMessage}</span>}
        <br />
        <Field>
          <Label>Input Binário</Label>
          <div>
            <BinaryTextInput
              autoComplete="off"
              type="text"
              name="binary"
              placeholder="Escreva com 0 ou 1"
              value={binaryText}
              onChange={e => setBinaryText(e.target.value)}
            />
            <Button type="submit">Converter</Button>
          </div>
        </Field>
        <Field>
          <Label>Output Decimal</Label>
          <DecimalTextInput
            type="text"
            name="decimal"
            value={decimalText}
            disabled
          />
        </Field>
      </StyledForm>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
