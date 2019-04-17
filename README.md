## JSON-FORM
A easy way to write form!

## Usage




## API

```
import * as React from 'react'
import { render } from 'react-dom'
import Form, { registerComponent } from '../src/index'

const Input = ({ onChange }) => {
  return <input onChange={(e) => onChange(e.target.value)} />
}

const config = [
  { type: 'input', target: 'name', title: '', placeholder: '111', test: (e) => e }
]

const initialData = {
  name: '1'
}

registerComponent('input', Input)

const Page = () => {
  return <div>
    <Form
      config={config}
      initialData={initialData}
      submitHandler={(data) => console.log(data)}
      errorHandler={(errorMsg) => console.error(errorMsg)}
    />
  </div >
}

render(<Page />, document.getElementById("app"))

```