let a = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2
  }
}

let b = Object.assign(a, { a: 2, c: { a: 2 } })

let c = { ...a, ...{ a: 2, c: 2 } }
console.log(b, c)
