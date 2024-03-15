//#region Слайдер

const slider_line = document.querySelector('.slider-line');

var focused_block = 0;
var previos_focus = 0;
var focus_chenged = true;

document.addEventListener('wheel', (event) => {
    if(focus_chenged){
        focused_block += event.deltaY > 0 ? 1 : -1;
        focused_block = Math.min(Math.max(focused_block, 0), 5)

        set_focus(focused_block);
    }
});

slider_line.addEventListener('transitionend', () => {
    focus_chenged = true;
});

function set_focus(new_focused_block){
    focused_block = new_focused_block;
    slider_line.style.top = -100 * focused_block + 'vh';

    focus_chenged = previos_focus == focused_block;
    previos_focus = focused_block;

}

//#region Переходы по кнопкам

document.querySelector('#abt-poizon').addEventListener('click', () => {set_focus(1);});
document.querySelector('#abt-prjct').addEventListener('click', () => {set_focus(2);});
document.querySelector('#calculate').addEventListener('click', () => {set_focus(3);});
document.querySelector('#order').addEventListener('click', () => {set_focus(4);});
document.querySelector('#contacts').addEventListener('click', () => {set_focus(5);});

document.querySelector('.btn.down-btn').addEventListener('click', () => {set_focus(4);});
document.querySelector('.btn.up-btn').addEventListener('click', () => {set_focus(0);});

//#endregion

//#endregion

//#region Параллакс

const header_parallax_item = document.querySelector('.parallax-item');
const foother_parallax_item = document.querySelector('.parallax-label');

document.addEventListener('mousemove', (event) => {
    if(focused_block == 0 || focused_block == 5){
        const translateX = -(event.clientX - window.innerWidth/2)/30;
        const translateY = -(event.clientY - window.innerHeight/2)/30;
    
        switch(focused_block){
            case 0: header_parallax_item.style.transform = `translate(${translateX}px, ${translateY}px)`;
            case 5: foother_parallax_item.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
    }
});

//#endregion

//#region Формы ВК бота
const product_link_field = document.querySelector('#product_link');
const buyer_link_field = document.querySelector('#buyer_link');
const nickname_field = document.querySelector('#nickname');
const size_field = document.querySelector('#size');

const base_url = 'http://localhost:8000/';    

document.querySelector('#sent_form_btn').addEventListener('click', ()=>{
    
    if( product_link_field.value    == '' ||
        nickname_field.value        == '' ||
        size_field.value            == '' ||
        buyer_link_field.value      == '')
    {
        alert('Пожалуйста, заполните все поля формы.');
        return
    }

    fetch(base_url, {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product_link:   product_link_field.value,
            nickname:       nickname_field.value,
            size:           size_field.value,
            buyer_link:     buyer_link_field.value
        })
    })
});

//#endregion

//#region Форма расчёта стоимости
const currency_field = document.querySelector('#currency');
const currency_label = document.querySelector('#currency_label');

document.querySelector('#calculate_currency').addEventListener('click', get)

async function get(){
    if(currency_field.value == ''){
        alert('Пожалуйста, введите сумму в юанях')
        return
    }
    
    const translate = fx(currency_field.value).from("CNY").to("RUB");
    const translate_offset = currency_field.value * 1.5;
    const cost = translate + translate_offset + 800;
    currency_label.innerHTML = `итого: ${cost.toFixed(2)}₽`;
}

//#region 