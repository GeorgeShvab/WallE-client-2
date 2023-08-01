import { Component, ErrorInfo, ReactElement } from 'react'

interface Props {
  children: ReactElement
  fallback: ReactElement | ((error: any) => ReactElement)
}

interface State {
  hasError: boolean
  error: any
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(e: any) {
    return { hasError: true, error: e }
  }

  componentDidCatch(error: any, info: ErrorInfo) {}

  render() {
    if (this.state.hasError) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error)
      }

      return this.props.fallback
    }

    return this.props.children
  }
}

export default ErrorBoundary
