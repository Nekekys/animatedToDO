import './App.css';
import React, {useEffect, useState} from "react";
import close from "./cancel.svg"
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";
import {BrowserRouter, NavLink, Route} from "react-router-dom";





function ToDo(props) {
  const [arrayToDo,setArrayToDo] = useState([/*{text: "lorem  asda xd asdf a kj  wwqw",check: false,id: 1},{text: "lorem asdasdw wwqw",check: false,id: 2}*/])
  const [textInput,setTextInput] = useState("")

  useEffect(()=>{
    setArrayToDo(props.mainArray)
  },[])
  useEffect(()=>{
    return ()=>{props.changeMainArray(arrayToDo)}
  },[arrayToDo])

  const changeInput = (e) =>{
    let text = e.target.value
    setTextInput(text)
  }
  const EnterKey = (e) =>{
    if(e.key == "Enter"){
      if(textInput.length > 0){
        setArrayToDo(e => [...e, {text: textInput,check: false,id: Date.now()}])
        setTextInput("")
      }
      e.preventDefault()
    }
  }


  const changeCheck = (index) =>{
    setArrayToDo(item => (item.map((value, i)=> {
      if(index == i){
        return {
          text: value.text,
          check: !value.check,
          id: value.id
        }
      }else return value
    })))
  }

  return (

        <div className="main__container">
        <div className="input__container">
          <input placeholder={"text"} value={textInput} onChange={changeInput} type="text" onKeyDown={EnterKey}/>
        </div>
        <TransitionGroup className="todo__container" >
          {
            arrayToDo.map((e,index) =>{
              return  <CSSTransition
                  timeout={500}
                  key={e.id}
                  className={"item"}
                  classNames={"item"}>
                <div className={"item"}>
                  <div  className="item__circle"  onClick={() => changeCheck(index)}>
                    <div className="item__circle_mini" style={(e.check ? {opacity: 1} : {opacity: 0})}></div>
                  </div>
                  <div className="item__text" style={(e.check ? {textDecoration: "line-through"} : {textDecoration: "none"})}>{e.text}</div>
                  <div onClick={() =>setArrayToDo([...arrayToDo.filter((value, i)=> i != index)])} className="item__del">
                    <img src={close} alt="close"/>
                  </div>
                </div>
              </CSSTransition>
            })
          }
        </TransitionGroup>
        </div>


  )
}

function Animate() {
  const buttonArray = [{text: "прозрачность",message: "op"},{text: "по оси х",message: "trX"},
    {text: "по оси y",message: "trY"},{text: "увеличение",message: "scB"},{text: "уменьшение",message: "scS"}]
  const [animation,setAnimation] = useState("op")
  const [animationVisibility,setAnimationVisibility] = useState(false)



  const startAnimated = () =>{
    if(!animationVisibility){
      setAnimationVisibility(true)
      setTimeout(()=>setAnimationVisibility(false) , 2000)
    }
  }


  const changeStyle = (message) =>{
    setAnimation(message)
  }



  return <div className="animation">
    <div className="col_1">
      <span>React Transition Group</span>
      <div className="button__croup">
        {buttonArray.map( ({text, message}) => {
          if(animation == message){
            return <div className="button__item activeB" onClick={() => changeStyle(message)}>
              {text}
            </div>
          }else{
            return <div className="button__item" onClick={() => changeStyle(message)}>
              {text}
            </div>
          }

            }
        )
        }

      </div>
      <div className="button__start" onClick={startAnimated}>запустить</div>
    </div>
    <div className="col_2">
      <CSSTransition
        in={animationVisibility}
        timeout={800}
        classNames="circle"
        mountOnEnter
        unmountOnExit
      >
        <span  className={animation + " circle"}></span>
      </CSSTransition>
    </div>
    </div>

}





function App() {
  const [check,setCheck] = useState(true)
  const [mainArray,setMainArray] = useState([])

  const changeMainArray = (arr) =>{
    setMainArray(arr)
  }

  const routes = [
        {path: "/",Component: ToDo  },
        {path: "/animate",Component: Animate}
      ]



  return (
    <BrowserRouter className="App">
        <div className="container">
          <div className="title">
            <span className="lorem"></span>
            <h1 className="title__page_1" ><NavLink style={(check ? {fontSize: "100px"} : {fontSize: "36px"})} to={"/"} onClick={()=> setCheck(true)}>ToDo</NavLink></h1>
            <h1 className="title__page_2" ><NavLink style={(check ? {fontSize: "36px"} : {fontSize: "100px"})} to={"/animate"} onClick={()=> setCheck(false)}>animation</NavLink></h1>
            <span className="lorem"></span>
          </div>
          <div className="con">
            {routes.map(({ path, Component }) => (
                <Route key={path} exact path={path}>
                  {({ match }) => (
                      <CSSTransition
                          in={match != null}
                          timeout={1000}
                          classNames="page"
                          unmountOnExit
                      >
                        <div className="page">
                          <Component changeMainArray={changeMainArray} mainArray={mainArray}/>
                        </div>
                      </CSSTransition>
                  )}
                </Route>
            ))}
          </div>
          {/*{routes.map(({path, Component}) =>
            <Route key={path} exact path={path} >
              {({match}) =>
                  <CSSTransition
                      timout={1000}
                      classNames="page"
                      unmountOnExit
                      in={match != null}
                  >
                    <Component/>
                  </CSSTransition>
              }
            </Route>
          )}*/}
         {/* <Route exact path="/" render={() => ( <CSSTransition   timeout={500}> </CSSTransition>)} />
          <Route exact path="/animate" render={() => ( <CSSTransition   timeout={500}> <Animate /> </CSSTransition>)} />*/}
        </div>
    </BrowserRouter>
  );
}

export default App;
