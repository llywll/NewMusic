function isEmpty(data) {
    var dataType = typeof (data);//typeof 返回的是字符串，有六种可能："number"、"string"、"boolean"、"object"、"function"、"undefined";
    switch (dataType) {
        case "number"://数字
            return false;
        case "string"://字符串
            if (data == "") return true;//为空
            else return false;
        case "boolean": return data;//布尔值      
        case "object"://对象
            if (!data && typeof (data) != "undefined" && data != 0) return true;//为null
            else {
                for (var key in data) {//非空对象
                    return false;
                }
                return true;
            }
        case "function"://函数
            return false;
        case "undefined":
            return true;//undefined
    }
}
export default isEmpty