import React, { Component } from 'react';
import './resourlist.scss'
import utils from '../../public/js/utils'
import { withRouter} from 'react-router-dom'
let scrollTop = 0;
class TabList extends Component {
    constructor(props){
        super(props)
        this.state={
            title: [
                {
                  name:"全部",
                  type:""
                },
                {
                  name:"视频",
                  type:"1"
                  },
                  {
                  name:"课件",
                  type:"2"
                  },
                  {
                  name:"文献",
                  type:"3"
                  },
                  {
                  name:"病例",
                  type:"4"
                  }
              ],
              ckickNum:0,
              themeColor:'#23aae5',
              listParams:{},
              listClassify:[],
              postCode:'',
              paramsType:'',
              difCheck: null,
              resourList:[],
              isScrollBottom:false
        }
    };
    componentWillMount () {
        this.setState({
            clickNum:0,
            listParams:JSON.parse(localStorage.getItem('listParams')),
            listClassify:JSON.parse(localStorage.getItem('listClassify')),
        })
        
    };
    componentDidMount () {
        // console.log(this.props.history)
      

        if(this.state.listClassify.length>0) {
            this.setState({
               postCode: this.state.listClassify[0].dictCode,
               difCheck: this.state.listClassify[0].dictCode
            },()=>{
                this.getResourList();
            }) 
          }else{
            this.setState({
                postCode:this.state.listParams.code,
                paramsType:this.state.title[0].type
            
            },()=>{
                this.getResourList();
            })
          }
        
        

    };
    getResourList () {
       
        let params = {
            entid: this.state.listParams.entid,
            code: this.state.postCode,
            type: this.state.paramsType,
          };
          utils.$postHttp("/medapp/api/college/listresource", params).then(
            result => {
              let data = result.data;
            
              if(data.code === '0'){
                data.collegeresource.map(item => {
                    if (item.crType === '1') {
                      item.defColor = "#4892d7";
                    } else if (item.crType === '2') {
                      item.defColor = "#f3db39";
                    } else if (item.crType === '3') {
                      item.defColor = "#89d579";
                    } else if (item.crType === '4') {
                      item.defColor = "#bba1ca";
                    }
                        })
                  this.setState({
                    resourList:data.collegeresource
                  },()=>{
                    if (this.contentNode) {
                        console.log(scrollTop)
                        if(this.props.history.action==='PUSH'){
                            scrollTop=0
                        }
                      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
                      this.contentNode.scrollTop = scrollTop
                    }
                  })    
              }else{
                console.log( data.code )
              }
            },
            error => {
              console.log( error );
            }
          );
    };
    tabTitle(index){
        this.setState({
            clickNum:index,
            paramsType: this.state.title[index].type
        },()=>{
            this.getResourList();
        });
    };
    defClassify(code) {
        this.setState({ 
            postCode: code
        },()=>{
            this.getResourList();
        }) 
      };
      goNewPage(){
        this.props.history.push('/newpage')
      };
    //   记录滚动条位置
    onScrollHandle(event) {
    
        const clientHeight = event.target.clientHeight
        const scrollHeight = event.target.scrollHeight
        const scrollTop = event.target.scrollTop
        const isBottom = (clientHeight + scrollTop === scrollHeight)
        // console.log(clientHeight,scrollHeight,scrollTop,isBottom)

        if (this.state.isScrollBottom !== isBottom) {
          this.setState({
            isScrollBottom: isBottom
          })
        }
      };
      componentWillUnmount() {
        
        if (this.contentNode) {
           
          this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
          scrollTop = this.contentNode.scrollTop;
        //   console.log(scrollTop)

        }
      }
    render () {
        let tablist = this.state.title.map((item,index)=>{
           return (
            <li style={{color:this.state.clickNum===index?this.state.themeColor:'#333'}} onClick={this.tabTitle.bind(this,index)}  key={index}> 
            <span>{item.name}</span>
            {
              this.state.clickNum===index&&(<div  className="line" style={{backgroundColor:this.state.themeColor}}></div>)
            }
          </li>
           )
        })
        let classfiy = this.state.listClassify.map((item,index)=>{
           return ( 
            <div onClick={this.defClassify.bind(this,item.dictCode)} style={{backgroundColor:this.state.postCode===item.dictCode?this.state.themeColor:'#d2d2d2'}} key={index}>{item.dictName}</div>
           )
        });
    
        let fliterMsg=(value)=>{
            let name;
            if (value === '1') {
                name = "视频";
              } else if (value === '2') {
                name = "课件";
              } else if (value === '3') {
                name = "文献";
              } else if (value === '4') {
                name = "病例";
              }
              return name;
        }
        let resourList = this.state.resourList.map((item,index)=>{
            return (
              <div className="Wrap" key={index} onClick={this.goNewPage.bind(this)}>
                    <div className="cont_left">
                    <img src={item.crIconUrl} alt="" />
                    </div>
                    <ul className="cont_right">
                    <li className="cont_right_1">
                        <span >{item.crTitle}</span>
                    
                        <i style={{backgroundColor:item.defColor}}>{fliterMsg(item.crType)}</i>
                    </li>
                    <li className="cont_right_2" >
                        {item.crAutherName}
                    </li>
                    <li className="cont_right_3" >
                    {
                       (item.crAutherOrg=== ''||item.crAutherOrg===null)&&(<span></span>)  
                    }
                    {
                       (item.crAutherOrg!==''&&item.crAutherOrg!==null)&&(<span >{item.crAutherOrg}</span>) 
                    }
                        <i>{item.crViewNum}次浏览</i>
                    </li>

                    </ul>

                </div>
            )
              
        })
        return (
            <div id="ConfenceList" ref={ node => this.contentNode = node }>
               <header>
                 <ul>{tablist}</ul>
                 <div className="search"  style={{background:'red'}}>
                    <img src={require('./img/search.png')} alt="" />
                 </div>
              </header>
              <div className="nameWrap">
                  {classfiy}
             </div>   
             <div className="cont">
                {resourList}
             </div>

      
      
           </div>
           
        )
    }
}
export default withRouter(TabList)

// let scrollTop = 0 在类外面作为全局变量
// onScrollHandle(event) {
//     const clientHeight = event.target.clientHeight
//     const scrollHeight = event.target.scrollHeight
//     const scrollTop = event.target.scrollTop
//     const isBottom = (clientHeight + scrollTop === scrollHeight)
//     if (this.state.isScrollBottom !== isBottom) {
//       this.setState({
//         isScrollBottom: isBottom
//       })
//     }
//   }

//   componentDidMount() {
//     if (this.contentNode) {
//       this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
//       this.contentNode.scrollTop = scrollTop
//     }
    //  如果是调用接口渲染页面，绑定scroll的方法要放在this.setState的回调函数中
//   }

//   componentWillUnmount() {
//     if (this.contentNode) {
//       this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
//       scrollTop = this.contentNode.scrollTop
//     }
//   }