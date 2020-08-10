# tree组件解析

### tree组件原解析

### 1.启动

npm run dev tree

### 2.目录结构

首先看下总体的目录结构
![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117806-882710c8-398d-471b-b50a-595e10eab482.png#align=left&display=inline&height=486&originHeight=486&originWidth=514&size=0&status=done&width=514)

首先tree组件的结构还是很简单的，index依旧只是入口文件，无需过多研究，所以其实主体就是tree.js文件。

#### 1.所以我们先来研究tree.js文件

然后我们需要明白tree组件的两种试用方式：一个是直接用TreeNode作为子节点弄Tree组件包裹然后生成DOM结构；第二个是用数据直接生成类似的结构；所以我们先看render里的DOM结构：

![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117815-10d67167-947e-46ff-a3a4-0f55db75b483.png#align=left&display=inline&height=488&originHeight=488&originWidth=872&size=0&status=done&width=872)
其实就是一个ul父节点包裹一个方法，里面做了判断。
一、如果配置了dataSource就renderByDataSource这个方法，其实从名字也大概能看出来其实这个就是数据生成节点的方式，我们先来看这个方法：renderByDataSource
其实看之前我们需要明白一点：那就是想通过数据生成一个treeNode节点那么肯定是要递归的；从文档提供的dataSource的配置结构也能看出来；
那么现在我们看下这个方法：
![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117808-213d51ac-141e-47c5-96b6-5e81ec08a2c1.png#align=left&display=inline&height=1068&originHeight=1068&originWidth=1068&size=0&status=done&width=1068)
其实很简单的事吧，就是一个递归函数，把dataSource的数据进行递归，引用了TreeNode组件然后返回一个这样的treeNode的结构，展示出来，主要就是继承下父组件传来的参数，基本上就是组件上绑定的方法，还有各种配置的api之类的，然后还有一点需要稍微注意一点的就是挂载props的时候还有一个getNodeProps这个方法，其实这个方法基本就是props的一些扩展，这个方法返回一个对象，之后就是把这个对象解构然后挂载TreeNode上；
二、之后是直接有children Node的情况，其实是大同小异的，走的是这个方法renderByChildren；
然后我贴一下这个方法就不详细介绍了。
![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117829-07cf259c-b0ef-4054-aca8-b8a916e5c1cd.png#align=left&display=inline&height=994&originHeight=994&originWidth=1112&size=0&status=done&width=1112)
这个只不过是把数据从dataSource换成了从children中那节点了而已，实现的逻辑基本是一样的；
然后tree组件的主体就是这些了，核心其实就是两个递归函数，其余的是一些配置或者是样式、兼容性等等等的判断了。

#### 2.接下来我们还需要看下子节点的文件：treeNode.js文件

我们依然先来看render里的return的内容：
![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117842-f02864ee-bce6-4955-9991-83919305f6e5.png#align=left&display=inline&height=884&originHeight=884&originWidth=1230&size=0&status=done&width=1230)
我们还记得，其实tree.js的文件里render里return的是一个ul，所以他的子节点里就是li了。
1.然后我们就看到了第一个判断canExpand是否存在，其实这个就是在判断这个节点是否还能扩展，也就是他是不是最小的子节点了，因为我们可以看到组件中最小的子节点是没有左边的icon的，这个就是分开来作为判断的；
2.第二个就是checkable，这个api文档有解释：

> 单独设置是否出现复选框，覆盖 Tree 的 checkable


然后这个方法就是返回了一个CheckBox；
3.editing就是是否可编辑，这个又引入了tree-node-input.js的内容，其实就是让节点可编辑，就不详细展开了
4.我们前面这么多内容其实还没有到主体内容，这个组件最主体的内容其实是renderChildTree这方法，他最终返回了我们的treeNode的节点内容，接下来我们看下这个方法：
![](https://cdn.nlark.com/yuque/0/2019/png/411464/1573110117817-14546ca5-1703-494e-a8c4-d3805ab7bb5e.png#align=left&display=inline&height=630&originHeight=630&originWidth=1236&size=0&status=done&width=1236)
其实也比较简单，首先他接受一个参数:hasChildTree，然后做一个判断expanded并且hasChildTree，那么久展示子节点，expanded是指是否展开状态，如果有子节点但是不展开，当然也是不需要展示；然后还有第二个判断，如果animation存在就是为一个另一个了，这里的Expand组件是fusion自己实现的一个动画组件，文档也说明了这个有缺省值是true，也就是默认是打开动画效果的；
至此这个组件的主体内容就到这里了，当然我们这里还有很多细节没有去分析，比如很多的点击事件，如何去做父子组件间的传值，如何去实现这个动画效果，节点展开和关闭的时候icon的改变等等。但是我认为这些东西比较繁琐，而且不属于tree组件的核心内容。
上个组件的时候我分析的比较仔细，几乎把每个方法都说到了，那是因为那个组件不管从哪方面来说都是比较简单的，即使全部解释也不会有太大的难度，但是组件会越来越复杂，也会有越来越多兼容、细节处理，这个时候我们如果每行都去仔细研究清楚应该是不太现实的。所以对于源码来说，我们一定要找到他的核心内容，去研究核心，一些细节可能自己在项目中也能遇到，或者说等到具体遇到的时候在去仔细研究。
