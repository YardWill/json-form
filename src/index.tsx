import * as React from 'react'
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
  config: IFormConfig[]
  initialData?: IData
  errorHandler: (errorMsg?: string) => void
  submitHandler: (data: IData) => void
}

interface IFormState {
  [x: string]: any
}

class Form extends React.Component<IFormProps, IFormState> {
  constructor(props: IFormProps) {
    super(props);
    this.state = props.initialData || {};
  }
  private onChange = (target: string, value: any) => {
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
    if (!err) {
      // tslint:disable-next-line:no-console
      console.log(this.state);
      submitHandler(this.state)
    }
  }
  public render() {
    const state = this.state;
    const { config } = this.props

    return <div>
      {config.map(item => {
        const Component = componentLib[item.type]
        const value = state[item.target];
        return <Component
          key={item.target}
          value={value}
          onChange={(e: any) => this.onChange(item.target, e)}
          placeholder={item.placeholder}
        />
      })}
      <div onClick={this.submit}>submit</div>
    </div>
  }
}

export default Form;

