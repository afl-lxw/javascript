// var obj = {
//     // 定义对象的同时定义了该属性以及值(可修改、可删除以及可枚举的)
//     name : 'Deity'
// }

// //修改现有属性
// Object.defineProperty(obj,'name',{
//     value : 'Deity',
//     writable : true,//控制当前属性是否可被修改
//     configurable : true//控制当前属性是否可被删除
// })

// console.log(obj.name)//Deity
// //修改name属性值
// obj.name = 'devil'
// console.log(obj.name)//devil
// //删除name属性值
// delete obj.name
// console.log(obj.name)//Deity

let a = {name: "cyj", age: 20}

let b = {ta: "??"}

b.__proto__ = {hah: "!!"}

a.__proto__ = b

for (let i in a) {
    console.log(i)
}