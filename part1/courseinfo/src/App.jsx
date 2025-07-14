import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.onClick}>
        {props.text}
    </button>
)

const Display = props => <div>{props.value}</div>

const App = () => {
    const [value, setValue] = useState(10)

    const setToValue = newValue => {
        console.log('value now', newValue)
        setValue(newValue)
    }

    //Do not define components inside another component
  

    return (
        <div>
            <Display value={value} />
            <Button onClick={() => setToValue(1000)} text="thousand" />
            <Button onClick={() => setToValue(0)} text="reset" />
            <Button onClick={() => setToValue(value + 1)} text="increment" />
        </div>
    )
}



// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const [total, setTotal] = useState(0)

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     console.log('left before', left)
//     const updatedLeft = left + 1
//     setLeft(updatedLeft)
//     setTotal(updatedLeft + right)
//   }

//    const handleRightClick = () => {
//     setAll(allClicks.concat('R'));
//     const updatedRight = right + 1;
//     setRight(updatedRight);
//     setTotal(left + updatedRight);
//   };

//   return (
//     <div>
//       {left}
//       <Button onClick={handleLeftClick} text='left' />
//       <Button onClick={handleRightClick} text='right' />
//       {right}
//       <History allClicks={allClicks} />

//       <p>total {total}</p>
//     </div>
//   )
// }

// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>














// const Display = ({counter}) => <div>{counter}</div>


// const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

// const App = () => {
//   const [ counter, setCounter ] = useState(0)
//   console.log('rendering with counter value', counter)

//   const increaseByOne = () => setCounter(counter + 1)
//   console.log('increasing, value before', counter)
//   const decreaseByOne = () => setCounter(counter - 1)
//   console.log('decreasing, value before', counter)
//   const setToZero = () => setCounter(0)
//   console.log('resetting to zero, value before', counter)

//   const handleClick = () => {
//     console.log('clicked')
//   }

  
//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} 
//       text='plus'
//       />
//       <Button onClick={setToZero}
//       text='zero'
//       />
//       <Button onClick={decreaseByOne}
//       text='minus'
//       />
//     </div>
//   )
// }

export default App











// const Header = (props) => {
//   console.log(props)
//   return (
//     <h1>{props.course}</h1>
//   )
//  }

//  const Part = (props) => {
//   console.log(props)
//   return (
//     <p>
//       {props.part.name}  {props.part.exercises}
//     </p>
//   )
//  }


//  const Content = (props) => {
//   console.log(props)
//   return (
//     <div>
//      <Part part={props.parts[0]} />
//      <Part part={props.parts[1]} />
//      <Part part={props.parts[2]} />
//     </div>
//   )
//  }


// const Total = (props) => {
//   return (
//     <p>
//       Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
//     </p>
//   )
// }


//  const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }
  
//   return (
//     <div>
//       <Header course={course.name} />
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//       </div>
//   )
// }


// const Hello = ({ name, age }) => {
//   const bornYear = () => new Date().getFullYear() - age
//   return (
//     <div>
//       <p>Hello {name}, you are {age} years old</p>
//       <p>You were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 24

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }