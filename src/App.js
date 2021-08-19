import React, { Component } from 'react';
import './App.css';
import CreateContent from './components/CreateContent';
import ReadContent from './components/ReadContent';
import UpdateContent from './components/UpdateContent';
import TOC from './components/TOC';
import Subject from './components/Subject';
import Control from './components/Control';

class App extends Component{
  //컴포넌트 안에 constructor가 있다면 제일 먼저 실행되서 초기화를 한다.
  //클래스의 기본 생성자라고 이해하자.
  constructor(props){
    super(props);
    this.max_content_id = 3;
    //내부적으로 사용할 상태는 state를 쓴다
    this.state = {
      mode: "welcome",
      selected_content_id: 1,
      subject:{
        title: "WEB",
        sub: "world wide web!"
      },
      welcome:{
        title: "Welcome",
        desc: "Hello, React!"
      },
      contents:[
        {id: 1, title: "HTML", desc: "HTML if for information"},
        {id: 2, title: "CSS", desc: "CSS is for design"},
        {id: 3, title: "JavaScript", desc: "JavaScript if for interactive"}
      ]
    };
  }
  getReadContent(){
    for(let i = 0; i < this.state.contents.length; i++){
      let data = this.state.contents[i];
      if(data.id === this.state.selected_content_id){
        return data;
        break;
      }
    }
  }
  getContent(){
    let _title, _desc, _article = null;
    if(this.state.mode === "welcome"){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title = {_title} desc = {_desc}></ReadContent>;
    }
    else if(this.state.mode === "create"){
      _article =  <CreateContent
                    onSubmit = {
                                function(_title, _desc){
                                  this.max_content_id = this.max_content_id + 1;
                                  let _contents = this.state.contents.concat({
                                    id: this.max_content_id, 
                                    title: _title, 
                                    desc: _desc
                                  });
                                  this.setState({
                                    contents: _contents,
                                    selected_content_id: this.max_content_id,
                                    mode: "read"
                                  });
                                  
                                }.bind(this)
                              }
                  ></CreateContent>;
    }
    else if(this.state.mode === "read"){
      let _content = this.getReadContent();
      _article = <ReadContent title = {_content.title} desc = {_content.desc}></ReadContent>;
    }
    else if(this.state.mode === "update"){
      let _content = this.getReadContent();
      _article =  <UpdateContent
                    data = {_content}
                    onSubmit = {
                                function(_id, _title, _desc){
                                  let _contents = Array.from(this.state.contents);
                                  for(let i = 0; i < _contents.length; i++){
                                    if(_contents[i].id === _id){
                                      _contents[i] = {id: _id, title: _title, desc: _desc};
                                    }
                                  }
                                  this.setState({
                                    contents: _contents,
                                    mode: "read",
                                    selected_content_id: _id
                                  });
                                  
                                }.bind(this)
                              }
                  ></UpdateContent>;
    }
    return _article;
  }
  render(){
    console.log("App render");
    return (
      <div className="App">
        
        <Subject 
          title = {this.state.subject.title}
          sub = {this.state.subject.sub}
          onChangePage = {
            function(){
              this.setState({
                mode: "welcome"
              });
            }.bind(this)
          }
        ></Subject>

        <Control
          onChangeMode = {
            function(_mode){
              if(_mode === "delete"){
                if(window.confirm("really?")){
                  let _contents = Array.from(this.state.contents);
                  for(let i = 0; i < _contents.length; i++){
                    if(_contents[i].id === this.state.selected_content_id){
                      _contents.splice(i,1);
                      break;
                    }
                  }
                  this.setState({
                    mode: "welcome",
                    contents: _contents
                  });
                  alert("deleted");
                }
              }
              else{
                this.setState({
                  mode: _mode
                })
              }
            }.bind(this)
          }
        
        ></Control>

        <TOC onChangePage = {
            function(id){
              this.setState({
                mode: "read",
                selected_content_id: Number(id)
              });
            }.bind(this)
          } 
          data = {this.state.contents}
        ></TOC>

        {this.getContent()}
        
      </div>
    );
  }
}

export default App;
