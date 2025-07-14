import { useState } from 'react'


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>


const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
 
  

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.totalClicks} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.percentage} />
        </tbody>
    </table>
  )
}
return (
  <div>
    <p>No feedback given</p>
  </div>
  
)
}





const App =() => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [percentage, setPercentage] = useState(0)


  // let sum = 0
  // for (let num of allClicks) {
  //   sum += num
  // }

  const handleGoodClick = () => {
    const newGoodClick = good + 1
    setGood(newGoodClick)
    const sum = newGoodClick + neutral + bad
    setTotal(sum)
    const averageNum = (newGoodClick - bad) / sum
    setAverage(averageNum) 
    setPercentage((newGoodClick / sum) * 100)
    
  }

  const handleNeutralClick = () => {
    const newNeutralClick = neutral + 1
    setNeutral(newNeutralClick)
    const sum = newNeutralClick + good + bad
    setTotal(sum)
    const averageNum = (good - bad) / sum
    setAverage(averageNum)
    setPercentage((good / sum) * 100)
  }

  const handleBadClick = () => {
    const newBadClick = bad + 1
    setBad(newBadClick)
    const sum = newBadClick + neutral + good
    setTotal(sum)
    const averageNum = (good - newBadClick) / sum
    setAverage(averageNum)
    setPercentage((good / sum) * 100)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} percentage={percentage + "%"} totalClicks={total}/>
    </div>
  )
}


export default App

