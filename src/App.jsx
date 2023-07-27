import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  

  const [tasks,setTasks] = useState([])
  const [search,setSearch] = useState([])
  const [InputValue,setInputValue] = useState("")

  function handleSubmit(event){

    event.preventDefault()
    //console.log(event.target.elements)
    const task = event.target.elements[0].value
    // console.log("handle calisti");
    
    if(task){
      const obj ={title:task, isDone:false, isDeleted:false}
      setSearch([obj.title,...search])
      setTasks([obj,...tasks])
      console.log(search)
      //console.log("tasks--> ",tasks)  
      //console.log("search--> ",search)
    
      event.target.reset();
      
    }
    console.log("submit calıisti")
  }

  //is done bilgisi toggle yapılacak

  function handleTask(id ,action="done" ){
    console.log("id--> ",id,action)

    const actionType = action === "done" ? "isDone" : "isDeleted"

    const newTasks = tasks.map((item,index)=>{
      if(index === id){
        return {...item, [actionType]: !item[actionType]}
      }
      return item
      
    })
    setTasks(newTasks)  
  }
  function InputHandler(event){
    setInputValue(event.target.value)
 
  }

  return (
    <>
      {/* 
      checkbox: silinenleri göster
      checkbox: sadece tamamlananları göster is done bilgisi true olanları 
      input içine yazı yazarken ayni zamanda aramada yapabilsin 
      uzerine tıklanınca isdone olsun
      yanda delete butona tıklanınca isdeleted olsun 
      */}
    <form onSubmit={handleSubmit} >

      <input 
      type="text" 
      className='form-control'
      style={{border:"5px solid orange",width:"50%"}} 
      name='task' 
      id='task'
      onChange={InputHandler}
      />
      <button className='btn btn-primary' type='submit' >Kaydet</button>
      <button className='btn btn-danger' type='reset' >Reset</button>

    </form>
    
    
    {!!tasks.length && <h2>Gorevler:</h2>}

     <ul>
     {
       tasks.map(
         (item,index) =>
         <li 
         key={index}
         
         > 
        {/* {item?.title} {item?.isDone} */}
        {JSON.stringify(item)}
          <button onClick={()=> handleTask(index,"done")}  className='btn btn-success'> is done </button>
          <button onClick={()=> handleTask(index,"delete")}  className='btn btn-danger'> is deleted </button>
        </li>
      )
    }
    </ul>

    <ul>
      {
        search.filter(item => item.includes(InputValue)).
        map((item,index) => 

          <li key={index}>
            {item}
          </li>
          )
      }
    </ul>
    </>
  )
}


export default App
