import React, { Component } from 'react';

class Subject extends Component{
    //JavaScript Class에 들어가는 함수는 function 선언 생략가능
    render(){
        console.log("Subject render");
        return (
        //하나의 최상위 태그만 허용
        <header>
            <h1>
                <a href="/" 
                    onClick={
                        function(e){
                            e.preventDefault();
                            this.props.onChangePage();
                        }.bind(this)
                    }
                >{this.props.title}
                </a>
            </h1>
            {this.props.sub}
        </header>
        );
    }
}

export default Subject;