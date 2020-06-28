var carousel = {
    showIndex: 0,
    dataArr: [],
    options: {},
    initCarousel: function (options, dataArr) {
        this.options = options;
        this.dataArr = dataArr;
        let pdom = document.getElementById(options.parentName);
        //创建dom片段
        let frag = document.createDocumentFragment();
        //创建
        for (let i = 0; i < options.initItemNum; i++) {
            let child = document.createElement("div");
            child.classList.add(options.itemCla);
            frag.appendChild(child);
            // animation: move 2s linear 1s infinite;
            let time = i * 1;
            child.style.animation = options.aniName + ` ` + options.moveTime + `s linear ` + time + 's infinite';
            child.id = 'item_' + i;
        }
        pdom.appendChild(frag);
        this.initEvent();

    },
    onClick: function (e) {
        this.options.clickCallBack && this.options.clickCallBack(e);
    },
    initEvent: function () {
        let pdom = document.getElementById(this.options.parentName);
        // 动画开始时事件
        pdom.addEventListener("webkitAnimationStart", this.initItem.bind(this));
        //动画结束事件
        pdom.addEventListener("webkitAnimationIteration", this.initItem.bind(this));
        //事件委托
        if (this.options.clickCallBack)
            pdom.addEventListener("click", this.onClick.bind(this));
    },
    removeEvent: function () {
        let pdom = document.getElementById(this.options.parentName);
        if (this.options.clickCallBack)
            pdom.removeEventListener("click", this.onClick.bind(this));
        pdom.removeEventListener("webkitAnimationStart", this.initItem.bind(this));
        //动画结束事件
        pdom.removeEventListener("webkitAnimationIteration", this.initItem.bind(this));
    },
    initItem(e) {
        let item = e.target;
        let dataItem = this.getData();
        item.innerText = dataItem.value;
        //将数据绑定到节点上，方便扩展
        item.bindData = dataItem;
    },
    getData() {
        if (this.showIndex == dataArr.length) {
            this.showIndex = 0;
        }
        return this.dataArr[this.showIndex++];

    }

}