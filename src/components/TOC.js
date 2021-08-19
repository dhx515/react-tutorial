import React, { Component } from 'react';

class TOC extends Component{
    shouldComponentUpdate(newProps, newState){
        console.log("Contents render shouldComponentUpdate");

        if(newProps.data === this.props.data) return false;
        else{
            console.log(newProps.data);
            console.log(this.props.data);
            return true;
        }
    };

    render(){
        console.log("TOC render");
        let lists = [];
        let data = this.props.data;
        for(let i = 0; i < data.length; i++){
            lists.push(
                <li key={data[i].id}>
                    <a href={"/content/" + data[i].id}
                        data-id = {data[i].id}
                        onClick = {
                            // function(e){
                            //     e.preventDefault();
                            //     this.props.onChangePage(e.target.dataset.id);
                            // }.bind(this)
                            function(id, e){
                                e.preventDefault();
                                this.props.onChangePage(id);
                            }.bind(this, data[i].id)
                        }
                    >
                        {data[i].title}
                    </a>
                </li>
            );
        }

        return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
        );
    }
}

export default TOC;