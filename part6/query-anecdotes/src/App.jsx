import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useNotificationDispatch } from "./AnecdoteContext"



const App = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    // retry: false
  })


  const updateAnecMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  
  const handleVote = (anecdote) => {
    console.log();
    updateAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    const data = `"${anecdote.content}" voted`
    dispatch({ 
      type: "SET_NOTIFICATION",
      payload: data
    })
   setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION"}), 1000)
    
  }

   if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
  return <div>Error: {result.error.message}</div>
  }


  const anecdotes = result.data

  
 
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
