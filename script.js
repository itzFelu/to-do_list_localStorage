let task = document.querySelector("#task-el")
let descrip = document.querySelector("#descrip-el")
let add = document.querySelector('.add-btn')
let cnt = 0
let memo= new Array()
let temp=localStorage.getItem('data')
if(temp){
    memo=JSON.parse(temp)
    for(i in memo){
        memo[i].id=`${cnt}`
        func(memo[i].task,memo[i].descrip,memo[i].checked, (cnt++))
    }
    localStorage.setItem('data',JSON.stringify(memo))
}
function save_n_edit(val1, val2,tick,id) {
    let obj={
        id: id,
        task: val1,
        descrip: val2,
        checked: tick
    }
    memo.push(obj)
    localStorage.setItem('data',JSON.stringify(memo))
}
function func(val1, val2,tick,id) {
    if (val2 === '') val2 = '...'
    task.value = ''
    descrip.value = ''
    let title = document.createElement('p')
    title.setAttribute('class', 'output-el title')
    title.innerHTML = val1
    let details = document.createElement('p')
    details.setAttribute('class', 'output-el descrip')
    details.innerHTML = val2
    let txts = document.createElement('div')
    txts.setAttribute('class', 'child-op txts')
    txts.appendChild(title)
    txts.appendChild(details)

    let check = document.createElement('input')
    check.setAttribute('class', 'btns-el check')
    check.setAttribute('type', 'checkbox')
    check.checked=tick
    

    let del = document.createElement('button')
    del.setAttribute('class', 'btns-el del')
    del.innerHTML = 'DELETE'
    let btns = document.createElement('div')
    btns.setAttribute('class', 'child-op btns')
    btns.appendChild(check)
    btns.appendChild(del)

    let output = document.createElement('div')
    output.setAttribute('class', 'output-container')
    console.log()
    output.id=id
    output.appendChild(txts)
    output.appendChild(btns)
    document.querySelector('.o_p').appendChild(output)
    

}

// code for add task
document.querySelector(".input-container").addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        if (task.value === '') return
        save_n_edit(task.value, descrip.value,false,(cnt))
        func(task.value, descrip.value,false,(cnt++))
    }
})
add.addEventListener('click', () => {
    if (task.value === '') return
    save_n_edit(task.value, descrip.value,false,(cnt))
    func(task.value, descrip.value,false,(cnt++))
})
// code for delete and check update
document.querySelector('body').addEventListener('click', (event) => {
    let x = event.target.closest('.output-container')
    if (x){
        let id=x.id
        if(event.target.className === 'btns-el del'){
            x.remove()
            memo.splice(id, 1)
            cnt--
            document.querySelector('.o_p').innerHTML=''
            for (i=0;i<cnt;i++) {
                memo[i].id = `${i}`
                func(memo[i].task, memo[i].descrip, memo[i].checked, i)
            }
            localStorage.setItem('data', JSON.stringify(memo))
        }
        if(event.target.className === 'btns-el check'){
            let i=x.id
            i=Number(i)
            memo[i].checked=(event.target.checked)
            localStorage.setItem('data', JSON.stringify(memo))
        }
    }
})