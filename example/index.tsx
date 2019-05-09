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
