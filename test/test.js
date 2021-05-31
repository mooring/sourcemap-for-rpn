var __rpn   = {};
__rpn.stack = [];
__rpn.scope = {};
__rpn.temp  = 0; 
__rpn.push = function (val){
    __rpn.stack.push(val);
};
__rpn.pop = function (){
    if(__rpn.stack.length > 0){
        return __rpn.stack.pop();
    }else{
        throw new Error('can\'t pop from empty stack');
    }
};
__rpn.print = function( val, repeat){
    var tmp = [];
    while(repeat-- > 0){tmp.push(val);}
    console.log(tmp.join(''));
};
__rpn.push(8);
__rpn.push('a');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(2);
__rpn.push('b');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(__rpn.scope.a);
__rpn.push(__rpn.scope.b);
__rpn.push(1);
__rpn.temp = __rpn.pop(); 
__rpn.push(__rpn.pop() - __rpn.temp);
__rpn.temp = __rpn.pop();
if (__rpn.temp === 0) throw new Error('divide by zero error');
__rpn.push(__rpn.pop() / __rpn.temp);
__rpn.push('c');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(__rpn.scope.a);
__rpn.push(1);
__rpn.temp = __rpn.pop();
if (__rpn.temp <= 0) throw new Error('argument must be greater than 0');
if (Math.floor(__rpn.temp) != __rpn.temp) throw new Error('argument must be an interge');
__rpn.print(__rpn.pop(), __rpn.temp);
__rpn.push(__rpn.scope.b);
__rpn.push(1);
__rpn.temp = __rpn.pop();
if (__rpn.temp <= 0) throw new Error('argument must be greater than 0');
if (Math.floor(__rpn.temp) != __rpn.temp) throw new Error('argument must be an interge');
__rpn.print(__rpn.pop(), __rpn.temp);
__rpn.push(__rpn.scope.c);
__rpn.push(1);
__rpn.temp = __rpn.pop();
if (__rpn.temp <= 0) throw new Error('argument must be greater than 0');
if (Math.floor(__rpn.temp) != __rpn.temp) throw new Error('argument must be an interge');
__rpn.print(__rpn.pop(), __rpn.temp);

//# sourceMappingURL=./test.js.map