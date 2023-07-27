import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {


  const [tasks,setTasks] = useState([])
  const [search,setSearch] = useState([])
  const [InputValue,setInputValue] = useState("")
  const [deleted,setDeleted] = useState([])
  const [completed,setCompleted] = useState([])

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

  function handleTask(id ,action ){
    //console.log("id--> ",id,action)

    const actionType = action === "done" ? "isDone" : "isDeleted"
    

    const newTasks = tasks.map((item,index)=>{
      if(index === id){
        //console.log("item--> ",item)
        if(item.isDone === true){
          //console.log(item.title)
          setCompleted([item.title,...completed])
        }

        else if(item.isDeleted === true){
          setDeleted([item.title,...deleted])
        
        }
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
    <div  className='container text-center ' style={{backgroundColor:"#001C30",color:'white',padding:"10px",borderRadius:"10px"}} >
      <div className="row justify-content-center ">

          <div className="col align-items-center " >
            <h1  style={{color:"white"}} >Todo List</h1>
          {/* 
          checkbox: silinenleri göster
          checkbox: sadece tamamlananları göster is done bilgisi true olanları 
          input içine yazı yazarken ayni zamanda aramada yapabilsin 
          uzerine tıklanınca isdone olsun
          yanda delete butona tıklanınca isdeleted olsun 
          */}
        <form onSubmit={handleSubmit} >

          <div className='input-group mb-3' >
          <input 
          type="text" 
          className='form-control'
          
          name='task' 
          id='task'
          onChange={InputHandler}
          />
          <button className='btn btn-outline-primary '  type='submit' >Kaydet</button>
          <button className='btn btn-outline-danger'   type='reset' >Reset</button>

          </div>

        </form>


        {!!tasks.length && <h2>Gorevler:</h2>}

          <ul style={{display:"inline-block"}} >
          {
            tasks.map(
              (item,index) =>
              <li  
              key={index}
              style={{listStyleType:"inherit"}}
              >
              {JSON.stringify(item)}
              {/* 
              {JSON.stringify(item).split(",")[0]}
              {JSON.stringify(item).split(",")[1]}
              {JSON.stringify(item).split(",")[2]} */}
               
            
              <button onClick={()=> handleTask(index,"done")}  className='btn btn-outline-primary mx-3   '> is done </button>
              <button onClick={()=> handleTask(index,"delete")}  className='btn btn-outline-danger'> is deleted </button>
            </li>
          )
          }
        </ul>

        <ul  style={{display:"inline-block"}} >
          <li >Arama Sonucu</li>
          {
            search.filter(item => item.includes(InputValue)).
            map((item,index) => 

              <li
               key={index}
               className='my-2'
               >
                {item}
              </li>
              )
          }
        </ul>

        <ul style={{display:"inline-block"}} >
            <li>Done olanlar</li>
            {
              completed.map((item,index) =>
                <li key={index}>
                  {item}
                </li>
              )
            }
        </ul>

        <ul style={{display:"inline-block"}} >    
          <li>Deleted Olanlar</li>
          {
            deleted.map((item,index) =>
              <li key={index}>
                {item}
              </li>
            )
          }
            
          
        </ul>  

          </div>
      </div>
    </div>
  )
}

export default App
