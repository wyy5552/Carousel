# 为什么效率高

>1.硬件加速 transform；

>2.只创建两个dom，可以支持无限数据；（dom数量不限制，1个都行）

>3.代码简洁，没有多余内容；

>4.createDocumentFragment虚拟dom

# 为什么做这个
> 市面上的跑马灯都是创建n多个div子容器，然后开始整体移动父容器。

> 像`vant,element-ui`都是这种思路。

> 如果有一百条消息的话，就会创建一百个div，每次滑动的时候都会重绘。

> 打开页面都听到风扇呼哧哧的吹。

# 代码片段
可以看到，无论数据有多少，我们都仅仅需要创建2个dom节点。

（代码中的魔法数字不要介意，因为代码太少了。没有看不懂的。）
```
    that.initCarousel = function (options) {
        that.options = options;
        that.dataArr = options.dataArr;
        var pdom = document.getElementById(options.parentName);
        //创建dom片段
        var frag = document.createDocumentFragment();
        //创建
        for (var i = 0; i < options.initItemNum; i++) {
            var child = document.createElement("div");
            child.classList.add(options.itemCla);
            frag.appendChild(child);
            // animation: move 2s linear 1s infinite;
            var time = i * 1;
            child.style.animation = options.aniName + ` ` + options.moveTime + `s linear ` + time + 's infinite';
            // child.id = 'item_' + i;
        }
        pdom.appendChild(frag);
        that.initEvent();

    };
```

# 后面计划

> * 封装逻辑，做到更加傻瓜化 ；
> * 支持MVVM；
> * 控制代码与换行等 不超过60行；
> * npm库

# 使用说明

> 创建容器节点
``` 
 <div id='paomadeng'></div>
 ```
> 设置容器样式，跑马灯样式，跑马灯动画
```
<style>
    #paomadeng {
        --item-width: 200px;
        --item-height: 16px;
        --item-init-x: 200px;
        --item-target-x: -200px;
        position: relative;
        overflow: hidden;
        width: var(--item-width);
        height: 16px;
    }

    #paomadeng div {
        height: var(--item-height);
        width: var(--item-width);
        position: absolute;
        display: inline-block;
    }

    @keyframes move {
        from {
            transform: translateY(-16px);
        }

        to {
            transform: translateY(16px);
        }
    }
</style>

```

>js调用
```
<script src="Carousel.js"></script>
<script type="text/javascript">
    let dataArr = [
        { value: '你好中国' },
        { value: '你好中国2' },
        { value: '你太坏了' },
        { value: '什么啊？？？？？？？' }];

    var options = {
        //绑定的跑马灯容器dom id
        parentName: "paomadeng",
        //初始化创建的dom数量
        initItemNum: 2,
        //移动用时
        moveTime: 2,
        //默认的样式
        itemCla: "item",
        //动画名字
        aniName: "move",
        //数据
        dataArr: dataArr,
        //点击回调
        clickCallBack: clickCallBack
    }

    function clickCallBack(e) {
        console.log(e);
        console.log(e.target);
        console.log(e.target.bindData);
    }
    var carou = new Carousel();
    carou.initCarousel(options);

</script>

```

#FIX_ME:
横向移动没有处理好；




