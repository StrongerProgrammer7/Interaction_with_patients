var accountUser = null;
var connectedContract = false;
var list_doctors_have_access =[];
var city_patient = "";
var table_doctors;
var table_ills;
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

document.addEventListener("click", function(e) 
{
    try 
    {
        if(e.target) 
        {
            if(e.target.id==="show_table_ills")
            {
                table_ills.responsive.recalc();
                // table_ills.draw();
                 table_ills.columns.adjust().responsive.recalc();
            }
            if(e.target.id==="show_table_doctors")
            {
                table_doctors.responsive.recalc();
                //table_doctors.draw();
                table_doctors.columns.adjust().responsive.recalc();
            }
            if(e.target.id == "btnSwitch")
            {
                try    
                {
                    connectMetamask();
                } catch (error) 
                {
                    console.log("Connect metamask:",error);   
                }
            }
            if(e.target.id == "connectContractAgain")
            {
                try    
                {
                    document.getElementById("connectContractAgain").hidden = true;
                    hideProblemIfExists("problems_withContract");
                    connectContract();
                } catch (error) 
                {
                    console.log("Connect contract again:",error);   
                }
                
            }
            if(e.target.id=="btn_action_revokeAccess")
            {
                try 
                {
                    let data = table_doctors.row(e.target).data();
                    console.log(data.id);
                    console.log(data.initials);
                    if(list_doctors_have_access.indexOf(`${data.id}`) > -1)
                    {
                        updateListDoctorsRevokeRole(data.id,data.meta,e.target);
                        
                    }else
                    {   
                        alert("You did not give access to the doctor ", data.initials);
                    }

                } catch (error) 
                {
                    console.log("Problem with revoke access!".error);    
                }
            }
            if(e.target.id=="btn_action_giveAccess")
            {
                try 
                {
                    let data = table_doctors.row(e.target).data();
                    console.log(data.id);
                    console.log(data.initials);
                    if(list_doctors_have_access.indexOf(`${data.id}`) > -1)
                    {
                        alert("You already give access this doctor ", data.initials);
                    }else
                    {   
                        updateListDoctorsGiveRole(data.id,data.meta,e.target);
                    }

                } catch (error) 
                {
                    console.log("Problem with give access!",error);    
                }
            }   
        }
    } catch (error) 
    {
        console.log("Event :",error);   
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

                await fetch("/api/get_list_doctors_haveAccess",
                {
                    method: 'POST',
                    body: JSON.stringify({meta:accountUser}),
                    headers:
                    {
                        "Content-Type":"application/json"
                    }
                }).then(hashFiles => hashFiles.json()).then(result =>
                {
                    list_doctors_have_access = result.data[0].list_doc.split(',');    
                })
                .catch(error=>console.log);

                fillTableDoctors();
                fillTableIlls();
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

async function fillTableDoctors()
{
    await fetch('/api/get_all_doctors')
    .then(hashdata => hashdata.json())
    .then(result =>
    {
        let data= result.data;
        for(let i =0;i<data.length;i++)
        {
            if(list_doctors_have_access.length!==0)
            {
                if(list_doctors_have_access.indexOf(`${data[i].id}`) > -1)
                {
                    data[i].action = `
                        <div class='btn-group'>
                            <button class='btn btn-danger btn-sm' id='btn_action_revokeAccess'>Забрать доступ</button> `
                }else
                {
                    data[i].action = `
                        <div class='btn-group'>
                            <button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button>`
                }
            }else
            {
                data[i].action = `
                        <div class='btn-group'>
                            <button class='btn btn-info btn-sm' id='btn_action_giveAccess'>Дать доступ</button>`
            }
            
            data[i].action +=`<button class='btn btn-primary btn-sm' id='btn_moreInfo'>О враче</button>
            </div>`
        }
        return data;
    })
    .then(list_doctors =>
    {
        table_doctors = new DataTable('#table_doctors',
        {
            responsive: true,
            data: list_doctors,
            columns: [
                { data: "num"},
                { data: 'initials' },
                { data: 'mail'},
                { data: 'profession' },
                { data: 'city' },
                { data: 'action'},
                { data: 'id'},
                { data: 'meta'}
            ],
        
            searchPanes: 
            {
                cascadePanes:true,
                dtOpts:
                {
                    // dom:'tp',
                    // paging:true,
                    // pagingType:'numbers',
                    // searching:true,
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-3',
                preSelect:[
                    {
                        column:4,
                        rows: ['Краснодар']
                    }
                ]
            },
            dom: 'Plfrtip',
            columnDefs:[
                {
                    sClass: "hide_columns",
                    aTargets: [6,7]
                },
                // {
                //     target: -1,
                //     visible: false,
                //     searchable: true,
                // },
                {
                    searchPanes:
                    {
                        show:true
                    },
                    targets:[3,4]
                },
                {
                    searchPanes:
                    {
                        show:false
                    },
                    targets:[1,2]
                },
                {
                    searchPanes: {
                        show:true,
                        options: [
                            {
                                label: 'Не имеет доступ',
                                value: function(rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Дать доступ');
                                }
                            },
                            {
                                label: 'Имеет доступ',
                                value: function(rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Забрать доступ');
                                }
                            }
                        ]
                       // className: 'bord'
                    },
                    targets: [5]
                }
                
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
            scrollY: 300,
            scrollX: false,
            deferRender:    true,
            scroller:       true
           // select: true,
            //keys: true
           
        });


        // table_doctors.searchPanes.container().prependTo(table_doctors.table().container());
        // table_doctors.searchPanes.resizePanes();
    })
    .catch(error=>console.log);


}

async function updateListDoctorsGiveRole(id_doctor,meta_doctor,button)
{
    if(id_doctor !== null && id_doctor !== undefined && id_doctor != "" && meta_doctor !== null && meta_doctor !== undefined && meta_doctor != "")
    {
        await window.contract.methods.giveRole(meta_doctor).send({from :accountUser}).then((res) =>
        {
           // console.log(res);
            window.contract.getPastEvents("allEvents",
            {                               
                fromBlock: 'latest',     
                toBlock: 'latest'     
            })
            .then((events) => console.log(events))
            .catch((err) => console.error(err));
            
        })
        .then(async () =>
        {
            list_doctors_have_access.push(data.id);
            let temp_list = list_doctors_have_access.toString();
            updateDB(temp_list,button);
        })
        .catch((err) =>
        {
            console.log('Error with contract or user denied',err);
        });
       
    }       
    
}

async function updateListDoctorsRevokeRole(id_doctor,meta_doctor,button)
{
    if(id_doctor !== null && id_doctor !== undefined && id_doctor != "" && meta_doctor !== null && meta_doctor !== undefined && meta_doctor != "")
    {
        await window.contract.methods.anualRole(meta_doctor).send({from :accountUser}).then((res) =>
        {
            console.log(res);
            window.contract.getPastEvents("allEvents",
            {                               
                fromBlock: 'latest',     
                toBlock: 'latest'     
            })
            .then((events) => console.log(events))
            .catch((err) => console.error(err));
            
        })
        .then(async () =>
        {
            list_doctors_have_access.splice(list_doctors_have_access.indexOf(`${data.id}`),1);
            let temp_list = list_doctors_have_access.toString();
            updateDB(temp_list,button);
        })
        .catch((err) =>
        {
            console.log('Error with contract or user denied',err);
        });
       
    }       
    
}

async function updateDB(list_doctors,button)
{
    await fetch("/api/update_list_doctors",
            {
                method: 'POST',
                body: JSON.stringify({meta:accountUser,list_doctors_have_access:list_doctors}),
                headers:
                {
                    "Content-Type":"application/json"
                }
            }).then(hashFiles => hashFiles.json()).then(data =>
            {
                console.log(data);
                if(button.id === "btn_action_giveAccess")
                {
                    button.classList.remove('btn-info');
                    button.classList.add('btn-danger');
                    button.id= 'btn_action_revokeAccess';
                }else
                {
                    button.classList.add('btn-info');
                    button.classList.remove('btn-danger');
                    button.id= 'btn_action_giveAccess';
                }
            })
            .catch(error=>console.log("Error with DB",error));
}


async function fillTableIlls()
{
    await fetch("/api/get_all_ill_s_patient",
    {
        method: 'POST',
        body: JSON.stringify({meta:accountUser}),
        headers:
        {
            "Content-Type":"application/json"
        }
    })
    .then(hashdata => hashdata.json())
    .then(result =>
    {
        //console.log(result);
        let data= result.data;
        for(let i =0;i<data.length;i++)
        {
            data[i].num = i+1;
            data[i].action = `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`
        }
        return data;
    })
    .then(list_ills =>
    {
        table_ills = new DataTable('#table_ills',
        {
            responsive: true,
            initComplete: function() {
                //Show datatable when load complete
                $('#table_ills').show();
            },
            data: list_ills,
            columns: [
                { data: "num"},
                { data: 'name_ill' },
                { data: 'treatment'},
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured'},
                { data: 'status'},
                { data: 'action'},
                { data: 'id'}
            ],
        
            searchPanes: 
            {
                cascadePanes:true,
                dtOpts:
                {
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-2',
            },
            dom: 'Plfrtip',
            columnDefs:[
                {
                    sClass: "hide_columns",
                    aTargets: [8]
                },
                {
                    searchPanes:
                    {
                        show:true
                    },
                    targets:[3,6]
                },
                {
                    searchPanes:
                    {
                        show:false
                    },
                    targets:[0,1,2,4,5,7]
                }
                
            ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true
           
        });

        // table_ills.searchPanes.container().prependTo(table_ills.table().container());
        // table_ills.searchPanes.resizePanes();
    })
    .catch(error=>console.log);


}
