import { useDispatch, useSelector } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'


const Vote = ({ anecVote, handleClick}) => {
    return (
        <div>
            has {anecVote}
            <button onClick={handleClick}>vote</button>
        </div>
    )
}

Vote.propTypes = {
    anecVote: PropTypes.number.isRequired,
    handleClick: PropTypes.func.isRequired
}


const AnecdoteList = () => {
    const anecdote = useSelector(({ filter, anecdotes}) => {
        if (filter) {
            return anecdotes.filter(anec => 
            anec.content.toLowerCase().includes(filter.toLowerCase()))
        }
        return anecdotes
    })



    const dispatch = useDispatch()
    
    const sortedAnecdote = [...anecdote].sort((a, b) => b.votes - a.votes)


    const vote = (id) => {
        dispatch(createVote(id))
        
        const content = sortedAnecdote.find(anec => anec.id === id).content
        console.log('anecdote', anecdote);
        
        dispatch(createNotification(`you voted "${content}"`))
        
        }


    return (
        <div>
            {sortedAnecdote.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <Vote anecVote={anecdote.votes} handleClick={() => vote(anecdote.id)}/>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList