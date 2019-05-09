import * as React from 'react'
import { Subject } from 'rxjs'
const componentLib = {};

export const registerComponent = (type: string, Component: React.ReactNode) => {
  componentLib[type] = Component
}

interface IFormConfig {
  type: string
  target: string
  title: React.ReactNode
  placeholder?: string
  test?: (value: any) => boolean
  errorMsg?: string
}

interface IData {
  [x: string]: any
}

interface IFormProps {
  inline?: boolean
  config: IFormConfig[]
  initialData?: IData
  errorHandler: (errorMsg?: string) => void
  submitHandler: (data: IData) => void
  effects: (
    $: (target: string) => typeof Subject,
    setValue: (target: string, value: any) => void
  ) => void
  button: (
    submit: (data: IData) => void,
    reset: () => void
  ) => React.ReactNode
}

interface IFormState {
  [x: string]: any
}

class Form extends React.Component<IFormProps, IFormState> {
  subscribes: { [x: string]: any }
  constructor(props: IFormProps) {
    super(props);
    this.state = props.initialData || {};
    this.subscribes = {};
    this.props.config.map(({ target }) => {
      this.subscribes[target] = new Subject();
    })
    this.props.effects(
      (target: string) => this.subscribes[target],
      (target: string, value: any) => this.setState({ [target]: value })
    )

  }
  private onChange = (target: string, value: any) => {
    this.subscribes[target].next(value)
    this.setState({ [target]: value })
  }
  private submit = () => {
    const { config, errorHandler, submitHandler } = this.props
    const err = config.some((item) => {
      if (item.test && !item.test(this.state[item.target])) {
        errorHandler(item.errorMsg)
        return true
      } else {
        return false
      }
    })
    submitHandler(this.state)
    if (!err) {
      // tslint:disable-next-line:no-console
      console.log(this.state);
    }
  }

  reset = () => {
    this.setState({ ...this.props.initialData })
  }
  public render() {
    console.log('render');
    const state = this.state;
    const { config, button, inline } = this.props
    return <div>
      {config.map(item => {
        const Component = componentLib[item.type]
        const value = state[item.target];
        return <div key={item.target} style={{ display: inline ? 'inline-flex' : 'flex', margin: '0 20px 20px 0' }}>
          <div style={{ paddingRight: 20, width: !inline ? '80px' : 'auto' }}>{item.title}:</div>
          <Component
            value={value}
            onChange={(e: any) => this.onChange(item.target, e)}
            placeholder={item.placeholder}
          />
        </div>
      })}
      {button(this.submit, this.reset)}
    </div>
  }
}

export default Form;

