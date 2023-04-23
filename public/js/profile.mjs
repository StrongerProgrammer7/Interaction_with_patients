var accountUser = null;
var connectedContract = false;
import * as helper from '../utils/helpers.js';

document.addEventListener("DOMContentLoaded", async() =>
{   
    //provider = await detectEthereumProvider();
    try 
    {
        if(!window.ethereum && !window.ethereum.isMetaMask)
            console.log('Please install MetaMask!');
        else
            connectMetamask();
    } catch (error) 
    {
        let btn = document.getElementById("switch__buttonThree");
        btn.checked = false;
        btn.disabled = false;
        showProblem("account","problems_withAccount","Не обнаржуен провайдер ethereum, проверьте свой бразуер, на наличие расширения и поддержки, и попробуйте снова!","Повторное соединение","btnSwitch");             
        console.log(error);
    }
    

});

document.getElementById("switch__buttonThree").addEventListener("click",function()
{
    try    
    {
        connectMetamask();
    } catch (error) 
    {
        console.log(error);   
    }
    
});


const connectMetamask = async () =>
{
    //console.log(provider);

    if(typeof window.ethereum !== 'undefined')
    {
        if(window.ethereum.isMetaMask == true)
            console.log("Using Metamask's web3 provider");
        else
             console.log("Using other web3 provider");

        try 
        {
            web3 = await new Web3(window.ethereum);
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            if(accounts.length !=0)
            {
                hideProblemIfExists("problems_withAccount");
                accountUser = accounts[0];
                let btn = document.getElementById("switch__buttonThree");
                btn.checked = true;
                btn.disabled = true;

                
                if(connectedContract==false)
                    connectContract();                           


                /*if(document.getElementById("historyPatient").style.display == "none")
                {
                    let btn = helper.createBtn("historyPatient","block","btnGetHistoryPatient","Get patient's history");
                    btn.style.width="240px";
                }*/

                /*if(document.getElementById("downloadFiles").style.display == "none")
                {
                    let btn  = helper.createBtn("downloadFiles","block","btnDownloadLinks","Download links ipfs!");
                    btn.style.width="240px";
                }*/


            }else
            {
                let btn = document.getElementById("switch__buttonThree");
                btn.checked = false;
                btn.disabled = false;
             
                if(document.getElementById("accountProblem") === null || document.getElementById("accountProblem") === undefined)
                showProblem("account","problems_withAccount","Вы не соединилсь с кросчейн-кошельком! Попробуйте снова!","Соединиться с кросчейн-кошельком(либо сообщите администратору)","btnSwitch");
            }
  
        } catch (error) 
        {    
            let btn = document.getElementById("switch__buttonThree");
            btn.checked = false;
            btn.disabled = false;
            if(document.getElementById("accountProblem") === null || document.getElementById("accountProblem") === undefined)
                showProblem("account","problems_withAccount","Вы не соединилсь с кросчейн-кошельком! Попробуйте снова!","Соединиться с кросчейн-кошельком(либо сообщите администратору)","btnSwitch");             
            console.log(error);
        } 
    }else
    {
        console.warn('No web3 detected or metamask! Falling back to http://localhost:8545.');
        let web3 = await new Web3("ws://localhost:5000");
        showProblem("account","problems_withAccount","Не обнаружен web3 или кросчейн-кошелек MetaMask! Пожалуйста установите соответствующие расширение для браузера и попробуйте снова!","Повторное соединение","btnSwitch");
    }
}

const connectContract = async () =>
{
    try
    {
        if(helper.isExistsContract() == true)
        {
            
            window.contract = await new window.web3.eth.Contract(ABI,addressContract);
            connectedContract = true;
            document.getElementById("navigationPanel-header__input").checked = true;
            document.getElementById("navigationPanel-header__input").disabled = true;
            
        }else
        {
            showProblem("contracts","problems_withContract","Существует проблема с контрактом. Сообщите о проблеме администратору сайта по почте (внизу страницы).","Попытаться соединиться с контрактом еще раз","connectContractAgain");
        }
        
        
    }catch(err)
    {
        showProblem("contracts","problems_withContract","Существует проблема с контрактом. Сообщите о проблеме администратору сайта по почте (внизу страницы).","Попытаться соединиться с контрактом еще раз","connectContractAgain");
        console.log(err);
    }
    
}

function hideProblemIfExists(problem)
{
	if(document.getElementById(problem).style.display != "none")
    {
        const problems = document.getElementById(problem);
		while(problems.lastChild)
		{
			problems.removeChild(problems.lastChild);
		}
        problems.style.display = "none";
        document.getElementById("problems").style.paddingBottom = "8.4%";
    }
}

function showProblem(parentDiv,problem,text,textForButton,idForButton)
{
	document.getElementById("problems").style.paddingBottom = "1.4%";    
	document.getElementById('mainContentInteraction').style.display="none";
	helper.off_onLinks("links__registerId","none","default");
	
    if(document.getElementById(parentDiv)===null)
    {
        document.getElementById(problem).style.display="block";
        const data = document.getElementById(problem).appendChild(document.createElement('h5'));

        data.className = "problems";
        data.id = parentDiv + "Problem";
        data.textContent = text;

        if(document.getElementById(idForButton) === null)
        {
            const btn = helper.createBtn(problem,"block",idForButton,textForButton);
            btn.style.hidden = true;
        }else
        {
            document.getElementById(idForButton).style.hidden = true;
            
        }
                        
    }else
    {
        document.getElementById(problem).style.display="block";
        document.getElementById(parentDiv).innerText ="";
        const data = document.getElementById(problem).appendChild(document.createElement('h5'));
        data.className = "problems";
        data.id = parentDiv+"Problem";
        data.textContent = text;

        if(document.getElementById(idForButton)  === null)
        {
            const btn = helper.createBtn(problem,"block",idForButton,textForButton);
            btn.style.hidden = true;
        }else
        {
            document.getElementById(problem).appendChild(document.getElementById(idForButton));
            document.getElementById(idForButton).style.hidden = true;
            document.getElementById(problem).style.display="block";
        }
    }
}


let data =[
    {
        "num":1,
        "Initials surname": "Tiger Nixon",
        "Profession":   '<p class="profession">Терапевт</p>',
        "Stage":     "2 year",
        "meta":"0x0",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    },
    {
        "num":2,
        "Initials surname": "Garrett Winters",
        "Profession":   '<p class="profession">ГИНЕКОЛОГ</p>',
        "Stage":     "5 year",
        "meta":"0x1",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    },
    {
        "num":3,
        "Initials surname": "Garrett Mariart",
        "Profession":   '<p class="profession">ГИНЕКОЛОГ</p>',
        "Stage":     "5 year",
        "meta":"0x1",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    },
    {
        "num":4,
        "Initials surname": "Garrett Gib",
        "Profession":   '<p class="profession">ГИНЕКОЛОГ</p>',
        "Stage":     "4 year",
        "meta":"0x1",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    },
    {
        "num":5,
        "Initials surname": "Garrett Mowart",
        "Profession":   '<p class="profession">Антрополог</p>',
        "Stage":     "3 year",
        "meta":"0x1",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    },
    {
        "num":6,
        "Initials surname": "Garrett Gib",
        "Profession":   '<p class="profession">Лор</p>',
        "Stage":     "1 year",
        "meta":"0x1",
        "Button": '<button type="button" class="btn btn-primary btn-access">Разрешить доступ</button>'
    }
]
let table = new DataTable('#table_doctors',
{

    searchPanes: 
    {
        cascadePanes:true,
        dtOpts:
        {
            // dom:'tp',
            // paging:true,
            // pagingType:'numbers',
            // searching:true
            info: true
        },
        viewCount: true,
        collapse: true,
        initCollapsed: true
    },
    dom: 'Plfrtip',
    columnDefs:[
        {
            searchPanes:
            {
                show:true
            },
            targets:[1,2,3]
        }
    ],
    data: data,
    columns: [
        {data: "num"},
        { data: 'Initials surname' },
        { data: 'Profession' },
        { data: 'Stage' },
        { data: 'Button' }
    ],
    // dom: 'Bfrtip',
    // buttons: [
    //     {
    //         text: 'Profession',
    //         className: 'btn btn-primary dropdown-toggle',
    //         action: function ( e, dt, node, config ) 
    //         {
    //             //$('.dt-button').toggleClass('')
    //         }
    //     }
    // ],
    scrollY:        300,
    deferRender:    true,
    scroller:       true
   // select: true,
    //keys: true
   
});

table.searchPanes.container().prependTo(table.table().container());
table.searchPanes.resizePanes();

