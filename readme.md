# 为什么效率高

>1.硬件加速 transform；

>2.只创建两个dom，可以支持无限数据；（dom数量不限制，1个都行）

>3.代码简洁，没有多余内容；

>4.createDocumentFragment虚拟dom

# 为什么做这个
> 市面上的跑马灯都是创建n多个div子容器，然后开始整体移动父容器。

> 像`vant``element-ui`都是这种思路。

> 如果有一百条消息的话，就会创建一百个div，每次滑动的时候都会重绘。

> 每次打开都听到风扇呼哧哧的吹。

# 代码片段
可以看到，无论数据有多少，我们都仅仅需要创建2个dom节点。

（代码中的魔法数字不要介意，因为代码太少了。没有看不懂的。）
```
    let dom = document.getElementById('paomadeng');
    //创建dom片段
    let frag = document.createDocumentFragment();
    //初始化的div数量
    let itemNum = 2;
    //子组件的样式类
    let itemCla = 'item';
    //显示内容
    let dataArr = [
        { value: '你好中国' },
        { value: '你好中国2' },
        { value: '你好中国3' },
        { value: '你好中国4' },
        { value: '你好中国5' },
        { value: '你好中国6' },
        { value: '你好中国7' },
        { value: '你好中国8' },
        { value: '你好中国9' },
        { value: '你好中国10' },
        { value: '你太坏了' },
        { value: '什么啊？？？？？？？' }];
    //创建
    for (let i = 0; i < itemNum; i++) {
        let child = document.createElement("div");
        child.classList.add(itemCla);
        frag.appendChild(child);
        // animation: move 2s linear 1s infinite;
        let time = i * 1;
        child.style.animation = `move 2s linear `+time+'s infinite';
        child.id = 'item_' + i;
    }
    dom.appendChild(frag);
```

# 后面计划

> * 封装逻辑，做到更加傻瓜化 ；
> * 支持MVVM；
> * 控制代码与换行等 不超过60行；

# 目前缺陷
> 跑马灯条目 是固定宽度高的，因此横向移动的时候可能ui会不好看；竖向的绝对完美；