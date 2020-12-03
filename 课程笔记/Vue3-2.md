# Vue3-2

从写template到渲染出视图都经历了些什么：

- 写出来一个template
- 编译成render函数
- 该函数返回vnode，一个虚拟节点 虚拟dom
- mountElement 把虚拟节点转换成真实的dom
- mount给了个根容器，告诉Vue应该把节点加到哪里

## pixijs

主要讲了一些API，看文档即可

## custom renderer

重点要分清楚dom操作的API和pixijs的API

## 飞机大战

- 不能用vue自己的render，要用自己缝状render对象
- game文件夹放的是pixi相关的文件
- pages文件夹放的时候详细界面



- @click的自动处理，nextvalue是对应的回调函数



- 利用计算属性实现页面切换
  - 通过点击发送消息，告诉父组件要切换
  - setup可以传入两个参数分别是props和context
  - 父组件通过`:eventname`接收事件并进行处理



- 地图滚动
  - 就是移动坐标
  - 实现思路：需要两张图片一起循环着移动![image-20201130222110528](/Users/songchenghao/Library/Application Support/typora-user-images/image-20201130222110528.png)
  - 需要两张地图，并定制Y坐标
    - 用高度取Y坐标
    - 用ticker方法移动
      - 需要调用pixi相关api，也就需要game文件
      - 处理到头的情况





