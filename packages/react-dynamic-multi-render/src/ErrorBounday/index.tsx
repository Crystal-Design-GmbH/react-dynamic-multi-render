import React from 'react';

export default class ErrorBoundary extends React.Component<
  {},
  { missingComponent?: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    if (error.code === 'MODULE_NOT_FOUND') {
      const missingComponent = error.message.split("'")[1].replace("'", '');
      return { missingComponent };
    }
    return {};
  }

  public render() {
    if (this.state.missingComponent) {
      // You can render any custom fallback UI
      return (
        <span>Component "{this.state.missingComponent}" does not exist</span>
      );
    }

    return this.props.children;
  }
}
