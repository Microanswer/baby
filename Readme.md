### 介绍

这是一个超级小（至少初衷是力求更小）的响应式前端开发框架。只有 4kb，zip后只有不到2kb。
支持功能：

1. 组件模块化。
2. 事件及自定义事件处理。
3. 响应式参数变化及data变化。

响应式并不会自动帮你更新界面上对应的内容，而是你可以通过 `watch` 你的data里的变量或者
props参数里的变量，在`watch`里你需要自己实现对界面的更新。为什么要这样做？因为如果要实
现自动更新界面，那么对比界面前后变化的代码将会是一笔不小的开销，自己实现针对需要更新的界面
代码将会带来更优的执行效率。

### 示例

![prev](./babyprev.gif)

先将本框架代码引入到你的页面中，你就可以开始模块开发了：

```html
<html>
<head>
    ...
    <script src="../dist/Baby.js"></script>
    ...
</head>
<body>
<div id="app"></div>
<script>

    let SubCom = {
        props: {word: {type: String}},
        render: function (h) {
            return h("div", {
                style: {
                    wordBreak: "break-all",
                    border: "1px solid blue",
                    margin: "20px",
                    width: "120px",
                    height: "120px",
                    padding: "5px"
                }
            }, [
                h("div", {style: {color: "gray", fontSize: "10px"}}, "我是子组件"),
                h("div", {ref: "content"}, this.word)
            ])
        },
        watch: {
            word(newval) {
                this.$refs.content.innerText = newval
            }
        }
    }

    let Main = {
        components: {SubCom: SubCom},
        render: function (h) {
            return h("div", {
                style: {
                    border: "1px solid gray",
                    width: "200px",
                    height: "200px",
                    padding: "10px"
                }
            }, [
                h("div", {}, "我是父组件"),
                h("input", {
                    ref: "input",
                    placeholder: "内容会自动响应给子组件",
                    style: {fontSize: "12px"},
                    on: {
                        input: this.onInput
                    }
                }),
                h("SubCom", {props: () => ({word: this.inputValue})})
            ])
        },
        methods: {
            onInput() {
                this.inputValue = this.$refs.input.value;
            }
        },
        data: {
            inputValue: ""
        }
    }

    new Baby(Main).$mount("#app");
</script>
</body>
</html>
```