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
__rpn.push(20);
__rpn.push('u_age');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(10);
__rpn.push('ten_years_later');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(__rpn.scope.u_age);
__rpn.push(__rpn.scope.ten_years_later);
__rpn.temp = __rpn.pop(); 
__rpn.push(__rpn.pop() + __rpn.temp);
__rpn.push('current_age');
__rpn.scope[__rpn.pop()] = __rpn.pop(); 
__rpn.push(__rpn.scope.current_age);
__rpn.push(1);
__rpn.temp = __rpn.pop();
if (__rpn.temp <= 0) throw new Error('argument must be greater than 0');
if (Math.floor(__rpn.temp) != __rpn.temp) throw new Error('argument must be an interge');
__rpn.print(__rpn.pop(), __rpn.temp);

//# sourceMappingURL=./test1.js.map