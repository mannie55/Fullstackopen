const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
        <div>
          name: <input value={props.nameValue} onChange={props.nameOnChange} />
        </div>
        <div>
          number: <input type="number" value={props.numberValue} onChange={props.numberOnchange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

export default PersonForm