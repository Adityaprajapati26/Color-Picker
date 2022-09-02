const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');
// const rgbColor= document.getElementById('colorValue')
const rgbgrid=document.getElementById('colorGrid')
const r= document.getElementById('r')
const g= document.getElementById('g')
const b= document.getElementById('b')
const rgb=document.getElementById("rgb")
const Select=document.getElementById("Select")
const Clear=document.getElementById("clear")
const Selected=document.getElementById("Selected")
const red=document.querySelector(".red")
const yellow=document.querySelector(".yellow")
const pink=document.querySelector(".pink")
const black=document.querySelector(".black")
const white=document.querySelector(".white")
const orange=document.querySelector(".orange")
const purple=document.querySelector(".purple")
const brown=document.querySelector(".brown")
const blue=document.querySelector(".blue")
const green=document.querySelector(".green")
const Parent2=document.querySelector(".Parent2")
const Side= document.getElementById("select_color")
const ParentSide=document.getElementById("side")
const Value=document.getElementById("value")
//html tags color
red.addEventListener("click",()=>{
    Side.innerText="#ff0000"
    ParentSide.style.color="black"
    ParentSide.style.background="#ff0000"
})
yellow.addEventListener("click",()=>{
    Side.innerText="#ffff00"
    ParentSide.style.color="black"
    ParentSide.style.background="#ffff00"
})
pink.addEventListener("click",()=>{
    Side.innerText="#ffc0cb"
    ParentSide.style.color="black"
    ParentSide.style.background="#ffc0cb"
})
black.addEventListener("click",()=>{
    Side.innerText="#000000"
    ParentSide.style.color="white"
    ParentSide.style.background="#000000"
})
white.addEventListener("click",()=>{
    Side.innerText="#ffffff"
    ParentSide.style.color="black"
    ParentSide.style.background="#ffffff"
})
orange.addEventListener("click",()=>{
    Side.innerText="#ffa500"
    ParentSide.style.color="black"
    ParentSide.style.background="#ffa500"
})
purple.addEventListener("click",()=>{
    Side.innerText="#800080"
    ParentSide.style.color="white"
    ParentSide.style.background="#800080"
})
brown.addEventListener("click",()=>{
    Side.innerText="#964b00";
    ParentSide.style.color="white"
    ParentSide.style.background="#964b00"
})
blue.addEventListener("click",()=>{
    Side.innerText="#0000ff"
    ParentSide.style.color="white"
    ParentSide.style.background="#0000ff"
})
green.addEventListener("click",()=>{
    Side.innerText="#00ff00"
    ParentSide.style.color="black"
    ParentSide.style.background="#00ff00"
})
//
btn.addEventListener('click', async () => {
    chrome.storage.sync.get('color', ({ color }) => {
        // console.log('color: ', color);
    });
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

       
    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: pickColor,
        },
        async (injectionResults) => {
            const [data] = injectionResults;
            if (data.result) {
                const color = data.result.sRGBHex;
                colorGrid.style.backgroundColor = color;
                colorValue.innerText = color;
             
        //storage
        
            var myMap=new Map()
             
               
        //local Storage
             chrome.storage.local.get({Colors:[]}, function (result) {
                var Color=result.Colors
                Color.push({color:color, HasBeenUploadedYet: false});
                // myMap.set(Color.color)
                // console.log(Color.color)
                chrome.storage.local.set({Colors: Color}, function () {
                    
                    chrome.storage.local.get('Colors', function (result) {
                        
                        var Colors=result.Colors
                        console.log(Colors)
                        clear()
                        Colors.map((data)=>{
                            myMap.set(data.color,data.color)
                            myMap.forEach((key,value) => {
                               
                                Select.add(new Option(key,value,))
                            
                                
                            })
                            
                        })
                        // ,
                    

                    });
                });
            });
          
          //value fetch
          Selected.addEventListener("click",()=>{
            // console.log("select")
            let ans=Select.value
            console.log(ans)
            Selected.style.background=ans
          })

         
                
        //rgb color
                
                const hexColor= hexToRgb(color)
                
                rgbgrid.style.background=color
                rgb.innerText="rgb:"
                // console.log(hexColor)
                r.innerText=hexColor.r+","
                g.innerText=hexColor.g+","
                b.innerText=hexColor.b
                
                function hexToRgb(color) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
                    return result ? {
                      r: parseInt(result[1], 16),
                      g: parseInt(result[2], 16),
                      b: parseInt(result[3], 16)
                    } : null;
                  }
                 
                try {
                    await navigator.clipboard.writeText(color);
                } catch (err) {
                    console.error(err);
                }
            }
            Clear.addEventListener("click",clearing)
            // clear the storage
            function clear(){
                chrome.storage.local.clear(function(obj){
                  console.log("cleared");
                   });
              }
              function clearing(){
                chrome.storage.local.clear(function(obj){
                    window.location.reload();
                   
                   console.log("cleared");
                   });
              }
             
        }
    );
    
});

async function pickColor() {
    try {
        // Picker
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open();
    } catch (err) {
        console.error(err);
    }
}
