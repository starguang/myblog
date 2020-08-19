### 记一次ref使用

之前开发的时候其实用ref比较少，因为都尽量避开使用ref的场景，所以对ref使用有些生疏，但是这几天用到了比较多的ref，发现其实还是比较好用的，不过看文档说ref对性能有影响，不过我用了下感觉还是影响不大的；

基本的类组件里使用我就不说了，比较简单，最多有一个回调的问题；

今天主要说下function组件里的使用问题。

先说明下我这里的场景，父组件是一个class组件，子组件是function组件，其实一开始认为这个组件比较轻量级，所以选择了function组件，没想到最后还是有点“重量”的；

一开始用class组件的方式处理，react总给我报错，说function组件没有ref属性，让我用forwardRef，跟着报错修改完页面直接白屏，很尴尬。没办法，只能去度文档了，把react的ref相关内容看了下，还是有点不明所以，只能自己去一步步试验。

最终得到的结论是：在父组件中还是按照class组件的方式去创建ref

```js
const xxxref = React.createRef();
```

之后呢将ref属性传给子组件，这时候请注意，因为function组件直接接受ref的话ref为null或者undefined，所以要用forwardRef方法包裹一下，这个方法可能算一个高阶组件吧，这样就可以获取到ref了，但是请注意，这个时候ref其实并没有在props中，要单独去拿ref

```js
forwardRef((props, ref) => {
  return (
  	<div ref={ref}></div>
  )
});
```

这样就可以快乐的在function组件中使用ref了；

不过还有一点要注意的是，这样获取的是子组件的dom结构，并不能获取子组件中的具体数据，如果不需要获取真实的dom结构而是获取子组件某些数据这要可能不行，还需要用useImperativeHandle这个方法去包裹一下。

```js
const childRef = useRef();
useImperativeHandle(ref, () => ({
    要传的数据,
}));

return (
  	<div ref={childRef}></div>
  )
```

这要就可以做到只传想要的数据，而不是仅仅获取真实dom了。

