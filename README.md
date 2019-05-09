## JSON-FORM
A easy way to write form!

## Start 
```
yarn dev
```
This a project powered by parcel.

## Usage



## API

```
import * as React from 'react'
import { render } from 'react-dom'
import Form, { registerComponent } from '../src/index'

const Input = ({ value, onChange, placeholder }: any) => {
  return <input
    style={{ flex: 1 }}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
}

const config = [
  { type: 'input', target: 'name', title: 'name', placeholder: '111', test: (e: string) => !!e, errorMsg: 'error' },
  { type: 'input', target: 'title', title: 'title', placeholder: '111', test: (e: string) => !!e, errorMsg: 'error' }
]

const initialData = {
  name: '',
  title: '',
}

registerComponent('input', Input)

const effects = ($, setValue) => {
  $('name').subscribe((value) => {
    setValue('title', value)
  })
}

const Page = () => {
  return <div>
    <h3>#inline mode</h3>
    <Form
      inline
      config={config}
      initialData={initialData}
      effects={effects}
      submitHandler={(data) => console.log(data)}
      errorHandler={(errorMsg) => console.error(errorMsg)}
      button={(submit, reset) => <div>
        <div onClick={submit}>submit</div>
        <div onClick={reset}>reset</div>
      </div>}
    />
    ----------------------------
    <h3>#normal mode</h3>
    <Form
      config={config}
      initialData={initialData}
      effects={effects}
      submitHandler={(data) => console.log(data)}
      errorHandler={(errorMsg) => console.error(errorMsg)}
      button={(submit, reset) => <div>
        <div onClick={submit}>submit</div>
        <div onClick={reset}>reset</div>
      </div>}
    />
  </div >
}

render(<Page />, document.getElementById("app"))

```

## Custom Component API

If you want to use a custom component? Here is the rule your component should depend on. The component should have two APIs named value and onChange
1. value: It's the real value your component has.
2. onChange: The component change event is hook with a param named value(The value after change), and the hook will change the value as you expect. You can do something in the hook like adjust value.


## Effect
There will be a problem when the data effect each other.
For Example:
When I change the name value, it also changes the title value the same.
So we import an API named 'effect', it will trigger when the data changed, and we can subscribe the name value to change the title value.