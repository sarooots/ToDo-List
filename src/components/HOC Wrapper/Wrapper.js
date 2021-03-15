import React from "react"

const Wrapper = () => Content => {
  class Wrapper extends React.Component {

    render() {
      return (
        <div id="mainWrapper">
         <Content />
        </div>
      );
    }
  }

  return Wrapper
};

export default Wrapper