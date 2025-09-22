import { createAnecdote } from "../request"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from "../AnecdoteContext"


const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const queryClient = useQueryClient()


  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({
        type: "SET_NOTIFICATION",
        payload: "anecdote added successfully",
      });
      setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 1000);
    },

    onError: (error) => {
      console.log(error);
      
      dispatch({
        type: "SET_NOTIFICATION",
        payload: `${error.response.data.error}`
      });
      setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION" }), 3000);
    },
  });

 
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }


  

  // if (newAnecdoteMutation.isError) {
  //   dispatch({
  //     type: "SET_NOTIFICATION",
  //     payload: newAnecdoteMutation.error.message
  //   })
  //   setTimeout(() => dispatch({ type: "CLEAR_NOTIFICATION"}), 1000)
  // }


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
