import { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'



const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabel2 ? props.buttonLabel2 : 'cancel'}</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  ref:PropTypes.func,
  children: PropTypes.node,
  buttonLabel: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string
}


export default Togglable