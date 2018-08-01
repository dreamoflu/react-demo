import React, { Component } from 'react';
class Menu extends Component {
    constructor (props) {
        super(props);
        this.state={
            list:[]
        }
    };
    componentDidMount () {
        // console.log(this.props)
    };
    componentWillMount () {
       
    };
    componentWillReceiveProps(nextProps){
        if( this.props.isGetData!==nextProps.isGetData){
            alert(1)
            this.setState({
                list:nextProps.dataList
              })
        }
        }
    render(){
        let {list} = this.state
        const listItems = list.map((number) =>
               <li>{number}</li>
               );
        return (
            
       <ul>{listItems}</ul>
         
        
        )
    }
}
export default Menu