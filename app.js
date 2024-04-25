// ! variables
let OldHours;
let GreatingsWord,PMorAM;
let time12,time24;
let btn = document.querySelectorAll('[data-btn="btn"]');
// ! methods
function TwoDigit(number)
{
    return (number.toString().length<2)?`0${number.toString()}`:number.toString();
}

function DateChange()
{
    let DATE = document.querySelector("#date");
    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    let dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let date = new Date();
    let todayDate;

    todayDate = `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;

    DATE.innerText = todayDate;
    
}

function Greatings(hour)
{
    let GREATING = document.querySelector("#greating");
    GreatingsWord = (hour>="00" && hour<"12")
                ?"Good Morning"
                :(hour>="12" && hour<"18")
                ?"Good Afternoon"
                :"Good Evening";    

    GREATING.innerText =  GreatingsWord;
}

function  AddPMAM(hour,hide){
    let showing_PMorAM = document.querySelector("#showing_PMorAM");
    let ishide = (showing_PMorAM.classList.contains("hide"))?true:false; 
    if(hide)
    {
        if(!ishide)
        { 
            showing_PMorAM.classList.add("hide");
        }
    }
    else
    {
        if(ishide)
        {
            showing_PMorAM.classList.remove("hide");
        }
        PMorAM = (hour>="12")
        ?"PM"
        :"AM";    
        showing_PMorAM.innerText = PMorAM;
    }
}

function Init(hour,hide=false)
{
    let NewHours = TwoDigit(hour);
    if(OldHours!=NewHours)
    {
        Greatings(NewHours)
        AddPMAM(NewHours,hide);
        DateChange();
        OldHours = NewHours;
    }
}

function Time12()
{
    let TIME = document.querySelector("#showing_time");
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    Init(h);
    h = (h>12)
        ?(h%12)
        :(h==0)
        ?12
        :h;
    TIME.innerText = `${TwoDigit(h)} : ${TwoDigit(m)} : ${TwoDigit(s)}`;
}

function Time24()
{
    let TIME = document.querySelector("#showing_time");
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    Init(h,true);
    TIME.innerText = `${TwoDigit(h)} : ${TwoDigit(m)} : ${TwoDigit(s)}`;
   
}

function btnAction(time_format)
{
    let btn_action = document.querySelector(".btn-action");
        btn_active = btn_action.querySelector(".active");
        btn = btn_action.querySelectorAll("[data-btn='btn']");
        hilight = btn_action.querySelector("[data-btn='btn_hilight']");
    
    (btn_active)?btn_active.classList.remove("active"):"";

    if(time_format=="12")
    {
        btn[0].classList.add("active");
        hilight.className = "hilight active12";
    }
    else
    {
        btn[1].classList.add("active");
        hilight.className = "hilight active24";
    }
}

btn.forEach((i)=>{
    i.onclick = ()=>
    {
        btnAction(i.innerText);
        OldHours = 0;
        if(i.innerText=="12")
        {
            clearInterval(time24);
            time12 = setInterval(()=>Time12(),1000);
            
        }
        else
        {
            clearInterval(time12);
            time24 = setInterval(()=>Time24(),1000);
        }
    }
});




let date = new Date();
let _12or24_ = parseInt(date.toLocaleTimeString().slice(0,2));

// console.log(date.toString())
if(_12or24_>12)
{
    time24 = setInterval(()=>Time24(),1000);
    btnAction("24");
}
else
{
    time12 = setInterval(()=>Time12(),1000);
    btnAction("12");
}

