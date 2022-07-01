import React, {useEffect, useState} from 'react'
import './App.css'

//get data(jetlivar refress karye to data vay jay na atla mate)(ane function ne bar banavanu)
const getlocalitem=()=>{
  let list=localStorage.getItem('lists');
  // console.log(list)
  if(list){
    return JSON.parse(localStorage.getItem('lists'))
  }
  else
  {
    return [];
  }
}

const Student = () => {
  const[inputData,setInputData]=useState('');
  const[x,setX]=useState(1);
  const[items,setItems]=useState(getlocalitem());
  const [toggleSubmit ,setToggleSubmit]=useState(true);
  const [isEditItem , setIsEditItem]=useState(null);
  //const [conditionalRender, setconditionalRender] = useState(items)//Active & complet mate 
  const [conditionalRender, setconditionalRender] = useState(items)//Active & complet data
  const [checkDone, setCheckDone] = useState(false) // delete all button 

  useEffect(() => {
    console.log("esssssssssssss",x);
  }, [x])
  
  //add item 
  const addItem=()=>{
    if(!inputData)
    {
      alert('please Fill Data');
    }else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem)=>{
          if(elem.id == isEditItem){
            return{...elem,name:inputData}
          }
          return elem;
        })
        )
        console.log("+++++update",items)
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
          }
          else
          {
            const allInputData={id:new Date().getTime().toString(),name:inputData,done:false}
            setItems([...items,allInputData])//...item(juna data amj rahe)allInputData(new data add thy jay)
            setInputData('') //input box clean karva mate
            
          }
        }
        
        //add data to localstorage
        useEffect(()=>{ //useEffect jetli var page refress thy atli var run thy 
          localStorage.setItem('lists',JSON.stringify(items))
          setconditionalRender(items)
          //console.log("+++++++++++change");
        },[items]) 
        
        
        //delete item
      const deleteItem= (index) =>{
      const upadateitems=items.filter((elem)=>{
        return index != elem.id;
      });
      setItems(upadateitems);
      //setconditionalRender(upadateitems);
    }
    
   // remove all
  //   const removeAll=()=>{
  //   setItems([]);
  // }
  
  //remove all (true vara data delete kare)
const removeAll=()=>{  //true vara dataj delete karse
    const truedata=items.filter((elem)=>{
      return elem.done==!true
    })
    setItems(truedata)
    //console.log(truedata)
}

  //Edit Item
  const editItem=(id)=>{
    let newEditItem=items.find((elem)=>{
      return elem.id == id
    });
    // console.log(newEditItem);
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  }
  
  //doneItem
  const doneItem=(id)=>{
   let data = items.map((value) => {
      if(value.id == id.id) {
          return {...value,done:!value.done}//nagesan true ne false kare dee and false ne true kare dee
        }
        return value
    })
    setItems(data)
    setconditionalRender(data)
    //CHECK par click karo to delete all button dekhay naka pase na dekhay(atel database ma ak pan true male to button dekhay )
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      if(element.done == true) {
        setCheckDone(true)
        break;
      }
      setCheckDone(false)
      
    }
    console.log("++++++++data",data);
    
    //setconditionalRender(data)
  }
  console.log("++++++++checkDone",checkDone);



const onfilter=(e)=>{
  if(e == 'active')
  {
    const upadateitems1=items.filter((elem)=>{
      return  elem.done==false;
    });
   // console.log(upadateitems1)
    setconditionalRender(upadateitems1);
  }
  else if(e == 'complet')
  {
    const upadateitems1=items.filter((elem)=>{
      return  elem.done==true;
    });
    setconditionalRender(upadateitems1);
    //console.log(upadateitems1)
  }
  else
  {
    const upadateitems1=items;
    setconditionalRender(upadateitems1);
    //console.log(upadateitems1)
  }
}

const chnagHandler = () => {
  console.log("++++++++++++++");
  setX(x+1)
}
  //console.log("conditionalRender",conditionalRender);
  return (
    <div >
         {/* <h1>count:{x}</h1>
         <button onClick={() => chnagHandler()}>Add Count</button> */}
       <div className='text-addtodo'>
        <input type="text" className="form-control" placeholder="Add Item....!!" value={inputData} onChange={(e)=>setInputData(e.target.value)}/>
        {
          toggleSubmit ? <button className="btn btn-outline-secondary" type='button'onClick={addItem}>Submit</button>
                       : <button className="btn btn-outline-secondary" type='button'onClick={addItem}>Update</button>
        }
         
      </div>
      <br/>

           <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <a class="nav-link active" aria-current="page" href="#" onClick={(e)=>onfilter("all")}>All</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#" onClick={(e)=>onfilter("active")}>Active</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#" onClick={(e)=>onfilter("complet")}>Complete</a>
                        </li>

                      <div>{checkDone && <button type="button" class="btn btn-primary btn-sm" onClick={removeAll}>Remove all</button>}</div>
            </ul>     
      <div>
          <div className="table table table-striped">
            
            {
              // conditionalRender?.map((elem,ind)=>{
                conditionalRender.map((elem,ind)=>{
                  
                if(elem.done == true){
                  return(
                    <>
                    <div className="eachitem" key={elem.id}>
                      <h3>{ind+1}</h3>
                      <h3 className='line-through'>{elem.name}</h3>                   
                      <span className='buttonnormal'>
                    
                      <a type="button" className='check'onClick={()=>doneItem(elem)}><i className="bi-check-circle-fill"></i></a> 
                      <a type="button" className='update' onClick={()=>editItem(elem.id)} ><i className="bi bi-pencil-square "></i></a>
                      <a type="button" className='delete' onClick={()=>deleteItem(elem.id)}><i className="bi bi-trash "></i></a>
                     
                      </span>
                    </div>
                    </>
                  )
                }
                else{
                  return(
                    <>
                   
                    <div className="eachitem" key={elem.id}>
                    
                      <h3>{ind+1}</h3>
                      <h3 >{elem.name}</h3>                                    
                      <span className='buttonnormal'>
                       
                      <a type="button" className='check'onClick={()=>doneItem(elem)}><i className="bi-check-circle"></i></a> 
                      {/* <a type="button" className='check'onClick={()=>doneItem(elem)}><i className="bi-check-circle"></i></a>                 */}
                      <a type="button" className='update' onClick={()=>editItem(elem.id)} ><i className="bi bi-pencil-square "></i></a>
                      <a type="button" className='delete' onClick={()=>deleteItem(elem.id)}><i className="bi bi-trash "></i></a>
                      </span>
                    </div>
                    </>
                    
                  )
                } 
              })
              
            }
           

            
          </div>
      </div> 
    </div>
  )
}
export default Student