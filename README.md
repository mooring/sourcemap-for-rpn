# sourcemap-for-rpn

### 逆波兰表达式 js 编译器实现

> 关于逆波兰表达式， 请参见 https://codernotes.club/#/tech/4/about_rpn.md

主要为 https://hacks.mozilla.org/2013/05/compiling-to-javascript-and-debugging-with-source-maps/ 具体实现

学习source-map时产物, 代码作用为： 将逆波兰表达式 `3 4 5 + *`转化为js表达式`3 * ( 4 + 5 )`

使用了`jison`做分词及语法解析, 然后通过`source-map`生成 sourcemap相关代码，重点正如原文所说：

**一个编译器的实现，将其他语言编译为js的过程，至于source-map只是最后一步**

### 与原文变化

1. 原文为浏览器运行环境，此代码为环境无关， 输出为 console.log
2. 修复原文中代码部分转义符`\`缺失，跑不起来的毛病
3. 原文中的window浏览器环境修改为`__.rpn.scope`



### 使用方法

```shell
git clone https://github.com/mooring/sourcemap-for-rpn.git
cd sourcemap-for-rpn
npm i 
npm link
npm run test
npm run test1
```


#### 示例代码解析
##### 1. `test/test.rpn`

```bash
a 8          =;
b 2          =;
c a b 1 - /  =;
a 1      print;
b 1      print;
c 1      print;
```

- 等效代码:
```javascript
var a = 8;
var b = 2;
var c = a / (b -1);
console.log(a);
console.log(b);
console.log(c);
```
- 效果测试
```bash
rpn.js test/test.rpn
node test/test.js
```
![test效果图](http://test.codernotes.club/rpn-test.png)

> 如果将 `test/test.rpn`第2行的 `b 2 =;`修改为 `b 1 =;`,编译正常，但运行会报错，即（除0错误)


##### 2. `test/test1.rpn`

```bash
u_age 20                            =;
ten_years_later 10                  =;
current_age u_age ten_years_later + =;
current_age 1 print;
```

- 等效代码:
```javascript
var u_age                   = 20;
var ten_years_later         = 10;
var current_age = u_age + ten_years_later;
console.log(current_age)
```
- 效果测试
```bash
rpn.js test/test1.rpn
node test/test1.js
```
![test1效果图](http://test.codernotes.club/rpn~test1.png)
