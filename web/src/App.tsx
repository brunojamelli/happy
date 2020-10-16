import React from 'react';
interface TitleData {
  text: string;
}


function Title(props: TitleData) {
  return <h1>{props.text}</h1>
}
function App() {
  return (
    <Title text="something"/>
  );
}

export default App;
