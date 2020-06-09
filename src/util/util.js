function getUrlBase64(url, ext, callback) {
    let canvas = document.createElement("canvas");   //创建canvas DOM元素
    let ctx = canvas.getContext("2d");
    let img = new Image;
    img.setAttribute("crossOrigin",'Anonymous')
    img.src = url;
    img.onload = function () {
        canvas.height = 60; //指定画板的高度,自定义
        canvas.width = 85; //指定画板的宽度，自定义
        ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
        let dataURL = canvas.toDataURL(`image/${ext}`);
        callback.call(this, dataURL); //回掉函数获取Base64编码
        canvas = null;
    };
}
export default getUrlBase64