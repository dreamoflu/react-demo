##react 记录滚动条位置

```js
let scrollTop = 0 此变量在类外面作为全局变量
 onScrollHandle(event) {
    const clientHeight = event.target.clientHeight
    const scrollHeight = event.target.scrollHeight
    const scrollTop = event.target.scrollTop
     const isBottom = (clientHeight + scrollTop === scrollHeight)
    if (this.state.isScrollBottom !== isBottom) {
       this.setState({
         isScrollBottom: isBottom
      })
    }
   }

   componentDidMount() {
     if (this.contentNode) {
      this.contentNode.addEventListener('scroll', this.onScrollHandle.bind(this));
       this.contentNode.scrollTop = scrollTop
     }
    //  如果是调用接口渲染页面，绑定scroll的方法要放在this.setState的回调函数中
   }

   componentWillUnmount() {
     if (this.contentNode) {
      this.contentNode.removeEventListener('scroll', this.onScrollHandle.bind(this));
      scrollTop = this.contentNode.scrollTop
     }
   }
```
 