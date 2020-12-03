## 安装

- vuejs/vue-next
- 使用vue create 直接生成一个vue3项目
- 使用插件vue add vue-next 目前不建议使用

## vue3新特性

- 是youyuxi通过TS重写vue2得到的
- ts -> .d.ts -> vscode
  - 类型提示（洪湖体验性）
  - 保证开发质量
- tree-shaking ： 在打包的时候消除掉没有用到的代码，也就是按需加载，用来控制打包后的体积
  - 初始化在main.js中用函数导入的形式
  - 基于esm静态类型分析，来确定打包是那些代码是没有用到的
- 去掉了根节点
  - vue2的每一个组件必须用一个div根节点包裹起来
  - main.js的也是要挂载上根节点
  - 可以节约一个div标签，在构建大型项目很有用
  - 使用flagment实现
- teleport => 传送门
  - vue不能实现弹窗显示在body里
  - vue3的teleport标签就可以实现，只需要一个标签就可以
  - 语法 <teleport to="where">to里面是选择器
  - 如果在teleport中添加了子组件，那么子组件还是属于对应的父组件的，不会发生数据结构的变化，不会属于body
  - 可以添加多个teleport
- custom render
  - 代码可以不再局限于浏览器上，下节课讲
- composition api 质变

## composition api

相对于vue2的options api，与原来的不冲突，但是不推荐混合使用。

- 设计细节

  - ～ 是新引入进来的概念，并不是替换vue2的原来的东西，相当于是之前的基础上新加的特性

- api

  - setup

    - 新增加的入口
    - 整个composition api的调用入口，所有相关api都要放到setup函数内部
    - 通过return可以返回数据给视图

  - 响应式系统API

    - ref 

      - 用来处理值类型 number string boolleum
      - ref生成的是对象！
      - 用ref.value调用=====template默认处理.value 可以不写，但是setup内一定要写

      - 原因：值类型是无法最终值类型的变化，对象类型是应用类型，可以用proxy进行监听

    - reactive

      - 用来处理引用类型
      - 直接调用

    - readonly

      - 只读，无法修改值
      - 常用业务逻辑，setuo可以接受props，这个props默认就是readonly对象，无法修改

    - computed

      - 作为一个函数引入，应用场景和vue2一样，只不过换了一种写法

    - watch

      - 作为函数引入
      - 可以接受两个参数：第一个是响应式对象，第二个是函数

    - watcheffect

      - 只接收一个回调函数，不能获取到老的值
      - 一上来就会调用

  - 声明周期钩子

    - onmounted
      - 可以写多个的
      - 先添加的先执行

  - 依赖注入
    - provide
    - inject
    - 都必须在setup里面调用
  - refs
    - 完全没讲明白，需要看文档

- 使用vue3的原因

  - 代码集中
  - 所有api都是函数，所以业务逻辑代码写在哪里都可以

- 响应式数据丢失的问题

作业

![image-20201128111103201](/Users/songchenghao/Library/Application Support/typora-user-images/image-20201128111103201.png)

