//Method 1
const outerFunc = (t1) => {
    return inner1 = (t2) => {
        return inner2 = (t3) => {
            return inner3 = (t4) => {
                return inner4 = (t5) => {
                    var str = t1 + t2 + t3 + t4 + t5;
                    console.log(str);
                }
            }
        }
    }
}
const i1 = outerFunc('first');
const i2 = i1(' second');
const i3 = i2(' third');
const i4 = i3(' fourth');
i4(' fifth');


//Method 2
const outerFunc = (t1) => (t2) => (t3) => (t4) => (t5) => {
    var str = t1 + t2 + t3 + t4 + t5;
    console.log(str);
}
//Method 2 Print 1
outerFunc('first')(' second')(' third')(' fourth')(' fifth');
//Method 2 Print 2
const i1 = outerFunc('first')(' second')(' third')(' fourth')
i1(' fifth');


//Method 3
validMiddleWare = (store) => (next) => (action) => {
    var str = store + ' ' + next + ' ' + action;
    console.log(str);
}
validMiddleWare('aaaaa')('bbbbb')('ccccc');

