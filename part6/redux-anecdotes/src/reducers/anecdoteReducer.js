import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes";




const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const newObject = action.payload
      return state.map(anec => anec.id !== newObject.id ? anec : newObject)
    },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdote(state, action) {
      return action.payload
    }
  },
})


export const { updateAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}



export const createVote = id => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(anec => anec.id === id)
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(newObject)
    dispatch(updateAnecdote(updatedAnecdote))




  }
}

















// const anecdoteReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)



//   switch (action.type) {
//     case 'NEW_ANECDOTE':
//       return [...state, action.payload]
//     case 'NEW_VOTE': {
//       const id = action.payload.id
//       const anecdoteToVote = state.find(anec => anec.id === id)
//       const VotedAnecdote = {
//         ...anecdoteToVote,
//         votes: anecdoteToVote.votes + 1
//       }
//       return state.map(anec => anec.id !== id ? anec : VotedAnecdote)
//     }
//     default:
//       return state
//   }
// }



// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       votes: 0,
//       id: generateId()
//     }
//   }
// }

// export const createVote = (id) => {
//   return {
//     type: 'NEW_VOTE',
//     payload: { id }
//   }
// }

// export default anecdoteReducer