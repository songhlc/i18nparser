var a = window.a.b("中文") || "中文"
var c = window.c
var b = function (a, b) {
  console.log(a, b)
}
b(2, "你好")