import React from "react";

export class BlockErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Block rendering error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div>Failed to render content.</div>;
    }

    return this.props.children;
  }
}
