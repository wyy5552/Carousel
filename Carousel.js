var Carousel = function () {
    var that = this;
    that.showIndex = 0;
    that.dataArr = [];
    that.options = {};
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
            //延迟放入新的item，防止两个item粘到一起
            var time = i * options.moveTime / 2;
            child.style.animation = options.aniName + ` ` + options.moveTime + `s linear ` + time + 's infinite';
            // child.id = 'item_' + i;
        }
        pdom.appendChild(frag);
        that.initEvent();

    };

    that.onClick = function (e) {
        that.options.clickCallBack && that.options.clickCallBack(e);
    };
    that.initEvent = function () {
        var pdom = document.getElementById(that.options.parentName);
        // 动画开始时事件
        pdom.addEventListener("webkitAnimationStart", that.initItem);
        //动画结束事件
        pdom.addEventListener("webkitAnimationIteration", that.initItem);
        //事件委托
        if (that.options.clickCallBack)
            pdom.addEventListener("click", that.onClick);
    };
    that.removeEvent = function () {
        var pdom = document.getElementById(that.options.parentName);
        if (that.options.clickCallBack)
            pdom.removeEventListener("click", that.onClick);
        pdom.removeEventListener("webkitAnimationStart", that.initItem);
        //动画结束事件
        pdom.removeEventListener("webkitAnimationIteration", that.initItem);
    };
    that.initItem = function (e) {
        var item = e.target;
        var dataItem = that.getData();
        item.innerText = dataItem.value;
        //将数据绑定到节点上，方便扩展
        item.bindData = dataItem;
    };
    that.getData = function () {
        if (that.showIndex == dataArr.length) {
            that.showIndex = 0;
        }
        return that.dataArr[that.showIndex++];

    }

}