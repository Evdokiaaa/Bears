
const buttons = document.querySelectorAll('button')
const acceptBtn = document.querySelector('.bear__accept');
const rejectBtn = document.querySelector('.bear__reject')

const bearsContainer = document.querySelector('.bears__container')
const bears = document.querySelectorAll('.bear');
console.log(bears)

// Получение данных через Fake JSON Server (замените URL на свой)
const API = 'http://localhost:3000'
const getData = async (URL) =>{
    try{
        const response = await fetch(URL,{
            method:"GET",
            headers:{
                'Content-Type':'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
        return data
    }
    catch (e){
        console.log(e)
    }
}
getData(`${API}/get-bears`)//works

const postData = async (URL,data)=>{
    await fetch(URL,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'

        },
        body:JSON.stringify(data)
    })
}
const renderData = (data)=>{
    data.forEach((bear,index)=>{
        const bearLayout = `
        <div class="bear">
              <img src=${bear.image_url} alt="bear" />
              <h4 class="bear__title">${bear.name}</h4>
              <div class="bear__desc">
                <p class="bear__type">${bear.type}</p>
                <p class="bear__sex">${bear.gender}</p>
              </div>
              <div class="bear__btns">
                <button class="bear__accept">Accept</button>
                <button class="bear__reject">Reject</button>
              </div>
            </div>
        `
        bearsContainer.innerHTML +=bearLayout
        console.log(bear)
    })
    console.log('DATA',data)

}
window.addEventListener('DOMContentLoaded',()=>{
    getData(`${API}/get-bears`).then((data)=>renderData(data))
})
