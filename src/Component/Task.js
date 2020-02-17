import React, { Component } from 'react'
import  Css from './task.css'


class Task extends Component {

    constructor(props) {
        super(props)
    
       this.input=React.createRef()
       this.state={
           list:[],
          }
    }
   
    addTask=()=>{
    if(this.input.current.value.trim() == ""){
        document.getElementsByTagName("p")[0].style.display = "block";
    } else{
            const Items={
                value:this.input.current.value
            };

            if(localStorage.getItem('list')==null){
                const list=[]
                list.push(Items);
                localStorage.setItem("list",JSON.stringify(list))
            }
            else{
                const list=JSON.parse(localStorage.getItem('list'))
                list.push(Items)
                localStorage.setItem("list",JSON.stringify(list))
            }
            this.setState({
                list:JSON.parse(localStorage.getItem('list'))
            });
        }
    }



    componentDidMount() {
        const list = window.localStorage.getItem('list');
        const parsedList = JSON.parse(list);
        if(list == null){
            return false
        }
        else{
            this.setState({
                list: parsedList,
            })
            console.log(this.state.list);
        }
    }
    
    deleteTaskItem=(event)=> {
        
        let index = event.target.getAttribute('data-key')
        let listValue=JSON.parse(localStorage.getItem('list'));
        listValue.splice(index,1)
        this.setState({list:listValue});
        localStorage.setItem('list',JSON.stringify(listValue))
    }

    
    
    render() {
        return (
            <div>
                <h1>Task App</h1>
                <hr/>
                <div className="container">
                    <input type="text" placeholder="AddTask....." ref={this.input}></input>
                        <button onClick={this.addTask} className="button" >Add</button>
                        <p>Please enter value.</p>
                            <ol className="taskLists">
                                {
                                    this.state.list.map((item,index)=>
                                    {
                                        return(<li> {item.value}
                                        <button className="button" type="button" value="delete" data-key={index} onClick={this.deleteTaskItem}>Delete</button></li>)
                                    })
                                } 
                            </ol>
                </div>
                
            </div>
        )
    }
}

export default Task
