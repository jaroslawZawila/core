#!ts-node

const itemss: Map<string, number[]> = new Map();

itemss.set("k", [1,2,3])
itemss.set("j", [1])
itemss.set("z", [])

const itemsss = Array.from(itemss.entries()).map(([key, value]) => [key, ((value.reduce((a, b) => {return a + b}, 0)) / value.length).toFixed(1)]);


console.log(itemsss)
