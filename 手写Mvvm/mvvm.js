//手写一个MVVM

// 创建出一个Mvvm构造函数
function Mvvm(options = {}) {
    this.$options = options;
    let data = this._data = this.$options.data;

    //数据劫持
    Observe(data);

    //数据代理，把_data里面的对象暴露出来。
    //mvvm._data.item.id => mvvm.item.id
    for (let key in data) {
        Object.defineProperty(this, key, {
            configurable: true,
            get() {
                return this._data[key];
            },
            set(newValue) {
                this._data[key] = newValue;
            }
        });
    };

    // 数据编译
    new Compile(options.el, this);
};

//数据接触 => 本质是给对象设置set和get方法，可以操作对象的value
//创建一个Observe构造函数
function Observe(data) {
    let dep = new Dep();
    for (let key in data) {
        let value = data[key];
        observe(data);
        Object.defineProperty(data, key, {
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value;
            },
            set(newValue) {
                if (value === newValue) {
                    return;
                };
                value = newValue;
                observe(newValue);
                dep.notify()
            }
        })
    }
}

//负责new Observe 和 递归调用
function observe(data) {
    if (!data || typeof data != 'object') return;
    return new Observe;
}

// 创建一个compile构造函数，负责编译
function Compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();

    while (child = vm.$el.firstChild) {
        fragment.appendChild(child);
    };

    //替换el标签内的文本
    function replace(frag) {
        Array.from(frag.childNodes).forEach(node => {
            let txt = node.textContent;
            let reg = /\{\{(.*?)\}\}/g; //匹配{{}}

            if (node.nodeType === 3 && reg.test(txt)) { // 即是文本节点又有大括号的情况{{}}
                console.log(RegExp.$1); 
                let arr = RegExp.$1.split('.');
                let val = vm;
                arr.forEach(key => {
                    val = val[key]; 
                });
                // 用trim方法去除一下首尾空格
                node.textContent = txt.replace(reg, val).trim();
                new Watcher(vm, RegExp.$1, newVal => {
                    node.textContent = txt.replace(reg, newVal).trim();
                })
            }

            if (node.nodeType === 1) { //如果是元素节点
                let nodeAttr = node.attributes;
                Array.from(nodeAttr).forEach(attr => {
                    // v-model:"singer"
                    let name = attr.name;
                    let exp = attr.value;
                    if (name.includes('v-')) {
                        node.value = vm[exp];
                    };
                    new Watcher(vm, exp, function (newVal) {
                        node.value = newVal;
                    });
                    node.addEventListener('input', e => {
                        let newVal = e.target.value;
                        console.log(vm)
                        vm[exp] = newVal;
                        // node.textContent = txt.replace(reg, newVal).trim();
                    });
                })
            }

            //如果有子节点，继续递归
            if (node.childNodes && node.childNodes.length) {
                replace(node)
            };
        });
    };

    replace(fragment);

    vm.$el.appendChild(fragment);
}

//发布订阅
//发布订阅主要靠的就是数组关系，订阅就是放入函数，发布就是让数组里的函数执行
function Dep() {
    //存放函数的数组池子
    this.subs = [];
}
Dep.prototype = {
    addSub(sub) {
        this.subs.push(sub);
    },
    notify() {
        //绑定的方法，都有一个update方法
        this.subs.forEach(sub => sub.update())
    }
}

function Watcher(vm, exp, fn) {
    this.fn = fn;
    this.exp = exp;
    this.vm = vm;

    Dep.target = this;
    // console.log("Dep.target", Dep.target);

    let arr = exp.split('.');
    let val = vm;

    arr.forEach(key => {
        val = val[key]
    });

    Dep.target = null;
};
Watcher.prototype.update = function () {
    // this.fn();
    let arr = this.exp.split('.');
    let val = this.vm;
    arr.forEach(key => {
        val = val[key];
    });
    this.fn(val);
}