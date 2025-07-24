
const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

 const Part = ({parts}) => {
  return (
    parts.map(part =>
      <p key={part.id}>{part.name}</p>
    )
  )
 }

 const Sum = ({parts}) => { 
  
  const total = parts.reduce((sum, part) => sum += part.exercises, 
  0)   
  return (
    <h4>total of {total} exercises</h4>
  )   
}

const Content = ({content}) => {
  
  return (
    <div>
      <Part  parts={content.parts} />
      <Sum parts={content.parts} />
    </div>
  )
}

const Course = ({course}) => {

  return (
    <div>
       {course.map((courseobject, index) =>
       <div key={index}>
        <Header header={courseobject.name} />
        <Content content={courseobject}/>
       </div>
     )
    }
    </div>
  )
}


export default Course