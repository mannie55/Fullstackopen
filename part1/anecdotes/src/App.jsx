import { useState } from 'react'


const Button = (props) => <button onClick={props.click}>{props.text}</button>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',

    'Adding manpower to a late software project makes it later!',

    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',

    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',

    'Premature optimization is the root of all evil.',

    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',

    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',

    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))
  const [highestVote, setHighestVote] = useState(0)


  const handleClick = () => {
    const anecdoteLength = anecdotes.length
    const randomNum = Math.floor(Math.random() * anecdoteLength)
    setSelected(randomNum)
  }
  const handleVoteClick = () => {
    const voteArrayCopy = [...vote] 
    voteArrayCopy[selected] += 1
    setVote(voteArrayCopy)
    const maxVotes = Math.max(...voteArrayCopy)
    const index = voteArrayCopy.indexOf(maxVotes)
    setHighestVote(index)


  }  


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button click={handleVoteClick} text="vote" />
      <Button click={handleClick} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highestVote]}</p>
      <p>has {vote[highestVote]} votes</p>
      <p></p>
    </div>
  )
}

export default App