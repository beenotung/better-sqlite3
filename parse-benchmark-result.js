let fs = require('fs')
let lines = fs.readFileSync('docs/benchmark.md').toString().split('\n')
let i = 0
while(!lines[i].startsWith('---')) i++
let rows = [[],[],[]]
function part(){
  let title = lines[i++]
  function take(){
    let line = lines[i++]
    let parts = line.split(' ')
    let name = parts.shift()
    while(parts[0]!='x') parts.shift()
    parts.shift()
    let ops = +parts.shift().replace(/,/g,'')
    return{name,ops}
  }
  let p1 = take()
  let p2 = take()
  let p3 = take()
  let r2 = (p1.ops / p2.ops).toFixed(1)
  let r3 = (p1.ops / p3.ops).toFixed(1)
  console.log(`
${title}
${p1.name} : 1x
${p2.name} : ${r2}x
${p3.name} : ${r3}x
`)
  rows[0].push('1x')
  rows[1].push(r2+' x slower')
  rows[2].push(r3+' x slower')
}
part();i++
part();i++
part();i++
part();i++
part();i++

console.log(
  rows
    .map(cols => '|'+cols.join('|')+'|')
    .join('\n')
)
