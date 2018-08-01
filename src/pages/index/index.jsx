import React, { Component } from 'react';
import './index.scss';
import utils from '../../public/js/utils'

import { withRouter} from 'react-router-dom'

class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
           MenuList:[],
           isGetData:false,
           router:this.props.history
        }
    };
 
   
    componentDidMount () {
      
        
        
        this.getMenuList();
    };
    componentWillMount () {
      

    };
    changeName=()=>{
// this.setState({
//     MenuList: [1,2,3,4,5,6,7]
// })
console.log(this.state.MenuList)
    };
    getMenuList () {
        let params = {
            entid: 32
          };
          utils.$postHttp("/medapp/api/college/dictionary", params).then(
            result => {
              let data = result.data;
            
              if(data.code === '0'){
            
                this.setState({
                    MenuList: result.data.menu,
                    isGetData:true,
                })
                setTimeout(()=>{
                    console.log(this.state.MenuList)
                },300)
               
                 
                 
              }else{
                console.log( data.code )
              }
            },
            error => {
              console.log( error );
            }
          );
    };
    myTest(cont,num){
        alert(cont)

    }
   
    render() {
        return (
        
            <div id="homepage">
              <header>
                <div className="myAccount" onClick={this.changeName}>个人中心</div>
                <img src={require('./img/header.png')} alt="" />
             </header>
             <div className="flex_cont">
               <Menu  myTest={this.myTest.bind(this)} dataList={this.state.MenuList} router={this.state.router} isGetData={this.state.isGetData}></Menu>
            </div>
            </div>  
        );
    }
};
class Menu extends Component {
    constructor (props) {
        super(props);
        this.state={
            Menulist:[],
            router:null,
            listParams:{
                entid:32,
                type:'',
                code:''
            },
            listClassify:[]
        }
    };
    goResourList(num,index){
        console.log(num,index)
    
        if(this.state.Menulist[num].dictionarys[index].dictionarys.length<=0){
            // 修改对象中的值
            let data = Object.assign({}, this.state.listParams, { code:this.state.Menulist[num].dictionarys[index].dictCode })
            this.setState({
                listParams:data
            })  
        }
        this.setState({
            listClassify:this.state.Menulist[num].dictionarys[index].dictionarys,
        },()=> {
              localStorage.setItem('listParams',JSON.stringify(this.state.listParams));
              localStorage.setItem('listClassify',JSON.stringify(this.state.listClassify));
              this.state.router.push({
                  pathname:'/resourlist/1',
                  query:{
                      name:'test'
                  },
                  state:{
                      title:'222'
                  }       
            });
        } )
     
     
       
       
    };
    
    componentWillReceiveProps(nextProps){
        if( this.props.isGetData!==nextProps.isGetData){
            this.setState({
                Menulist:nextProps.dataList,
                router:nextProps.router
              })
        }
        };
        myTest(){
            
        }

    render(){
        let {Menulist} = this.state
        const listItems = Menulist.map((item,index) =>
        
        <div className="spine" key={index}>
        <div className="cont_title">
          <img src="./img/shu.png" alt="" />
          <span>{item.dictName}</span>
          <img className="slash" src="./img/Slash.png" alt=""/>
          <b>{item.dictNameEn}</b>
        </div>
        <div className="classify" id="classify" >
     {
         item.dictionarys.map((child,key)=>(
            <ul className="left" key={key} onClick={this.goResourList.bind(this,index,key)} style={{background:child.dictColor,backgroundSize:'100% 100%'}}>
                <li className="cn">[{child.dictName}]</li>
                <li className="en">{child.dictNameEn}</li>
            </ul>
         ))
     }
 </div>
      </div>
               );
        return (      
       <div>
           {/* 子组件给父组件传值 */}
       <div  onClick={()=>this.props.myTest('子组件给父组件传值',2,)}>我要测试的点击方法</div>
       {listItems}</div>
        )
    }
}


// 要获取router跳转的方法，必须把组件写成路由组件就是要 使用 withRouter(Home) 包裹组件导出 

// 此页面的写法主要，因为 包裹的是Home组件，所以Menu组件中获取不到router方法，此时要把router方法从父组件中传过来

// 这样的页面尽量使用一个组件写完
export default withRouter(Home);