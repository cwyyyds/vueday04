const _completeDeepClone = (target, map = new Map()) => {
  if (target === null) return target
  if (typeof target !== 'object') return target
  const constructor = target.constructor
  if (/^(Function|RegExp|Date|Map|Set)$/i.test(constructor.name))
    return new constructor(target)
  if (map.get(target)) return map.get(target)
  map.set(target, true)
  const cloneTarget = Array.isArray(target) ? [] : {}
  for (prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = _completeDeepClone(target[prop], map)
    }
  }
  return cloneTarget
}
// 首先判断对象参数是否为“null”，是则返回“null”。
// 判断对象参数数据类型是否为“object”，不是则返回该参数。
// 获取到对象参数的构造函数名，判断是否为函数、正则、日期、ES6新对象其中之一，如果是则直接返回通过该参数对象对应的构造函数生成的新实例对象。
// 当以上条件判断之后函数依然没有结束时继续进行以下操作。
// 在Map对象中获取当前参数对象，如果能获取到，则说明这里为循环引用并返回Map对象中该参数对象的值。
// 如果在Map对象中没有获取到对应的值，则保存该参数对象到Map中，作为标记。
// 根据该参数的数据类型是否为数组创建新对象。
// 遍历该对象参数，将每一项递归调用该函数本身的返回值赋给新对象。
// ————————————————
// 版权声明：本文为CSDN博主「yanlan92」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/sinat_20203869/article/details/123866185
