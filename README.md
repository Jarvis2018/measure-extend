# measure-extend
> sketch Measure 导出标注功能扩展，例如添加自定义单位和缩放比例、动态H5的代码模板。


## 使用方法
在导出的标注文件中，在根目录下找到`index.html`，编辑该文件，在文档最后，比如在`<body id="app"></body>`下
一行添加如下代码：
<img style="width:200px;" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/beb2e1c15a4c428ca100e54b153e51d6~tplv-k3u1fbpfcp-zoom-1.image">
```javascript
  <script src="https://cdn.jsdelivr.net/gh/Jarvis2018/measure-extend/index.js"></script>
```
也可以将代码下载到本地自行引入。


### 添加自定义配置

如需自定义配置可以修改`index.js`中的变量`unitsData`。例如添加小程序`rpx`单位的配置：
```javascript
{
  name: 'css rpx @2x', // 单位名称
  unit: 'rpx',  // 单位
  scale: 0.5   // 缩放比例
}
```
