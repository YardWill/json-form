## JSON-FORM
A easy way to write form!

## Usage




## API

```
import * as React from 'react'
import { render } from 'react-dom'
import Form, { registerComponent } from '../src/index'

const Input = ({ value, onChange }) => {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />
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

## custom component API

If you want to use a custom component? Here is the rule your component should depend on. The component should have two APIs named value and onChange
1. value: It's the real value your component has.
2. onChange: The component change event is hook with a param named value(The value after change), and the hook will change the value as you expect. You can do something in the hook like adjust value.