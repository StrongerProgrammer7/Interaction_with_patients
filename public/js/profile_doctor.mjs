var accountUser = null;
var connectedContract = false;

var id_doctor;
var table_patients;
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
            if(e.target.id==="show_table_patients")
            {
                table_patients.responsive.recalc();
                table_patients.columns.adjust().responsive.recalc();
            }
            if(e.target.id ==="btn_moreInfo")
            {
                
                // console.log(table_doctors.cell(e.target).data(()=>
                // {
                //     e.target.classList.remove('btn-primary');
                //     e.target.classList.add('btn-danger');
            
                // }));//.data('измененные данные');
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
           
           
        }
    } catch (error) 
    {
        console.log("Event :",error);   
    }
    

    
});

$('#table_patients tbody').on('click','tr', function (e) 
{ 
    if(e.target.id=="btn_action_setDiagnosis")
    {
        try 
        {
            let data = table_patients.row( this ).data();
            if(data===undefined)
                data = table_patients.row( e.target ).data()
            document.querySelectorAll(`#form_setDiagnosis #form-setDiagnosis__status`)[0].style.display ='none';
   
            isAccess(data.meta);
            //$('#modal_setDiagnosis').modal('show');
            fillFormForSetDiagnosis(data);
            console.log($('#form_setDiagnosis #id_patient')[0].value)
            
            
        } catch (error) 
        {
            console.log("Problem with setDiagnosis!",error);    
        }
    }

    if(e.target.id=="btn_moreInfo")
    {
        console.log("More info");
    }
    

});
var data_changeDiagnosisPatient;
$('#table_ills tbody').on('click','tr','ul li', function (e) 
{ 
    if(e.target.id=="btn_changeDiagnosis")
    {
        try 
        {
            let data = table_ills.row( e.target ).data();
            data_changeDiagnosisPatient = data;
           
            console.log(data);
            document.querySelectorAll(`#form_setDiagnosis #form-setDiagnosis__status`)[0].style.display ='flex';
            isAccess(data.meta);
           
            
            setTimeout(()=>
            {
                if(document.getElementById('modal_setDiagnosis').classList.contains('show')===true)
                {
                    fillFormChangeDiagnosisPatient(data);
                    const select = document.querySelectorAll('#form_setDiagnosis #name_ills');
                    const options = Array.from(select[0].options);
                    const input = document.querySelector('#form_setDiagnosis #filter_by_name');
                    function findMatches (search, options) 
                    {
                      return options.filter(option => {
                        const regex = new RegExp(search, 'gi');
                        return option.text.match(regex);
                      });
                    }
                    function filterOptions () 
                    {
                      options.forEach(option => { 
                        option.remove();
                        option.selected = false;
                      });
                      console.log(this.value);
                      const matchArray = findMatches(this.value, options);
                      select[0].append(...matchArray);
                    }
                    
                    input.addEventListener('change', filterOptions);
                    input.addEventListener('keyup', filterOptions);
                }
            },200)
        } catch (error) 
        {
            console.log("Problem with setDiagnosis!",error);    
        }
    }

    if(e.target.id=="btn_moreInfo_ill")
    {
        console.log("More info");
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

                await fillFormPersonalData()
                .then(()=>
                {
                    fillTablePatients();
                    fillTableIlls();
                    
                    fillFormSetDiagnosis();
                });
               

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
    //TODO
	// document.getElementById("problems").style.paddingBottom = "1.4%";    
	
    // if(document.getElementById(parentDiv)===null)
    // {
    //     document.getElementById(problem).style.display="block";
    //     const data = document.getElementById(problem).appendChild(document.createElement('h5'));

    //     data.className = "problems";
    //     data.id = parentDiv + "Problem";
    //     data.textContent = text;

    //     if(document.getElementById(idForButton) === null)
    //     {
    //         const btn = helper.createBtn(problem,"block",idForButton,textForButton);
    //         btn.style.hidden = true;
    //     }else
    //     {
    //         document.getElementById(idForButton).style.hidden = true;
            
    //     }
                        
    // }else
    // {
    //     document.getElementById(problem).style.display="block";
    //     document.getElementById(parentDiv).innerText ="";
    //     const data = document.getElementById(problem).appendChild(document.createElement('h5'));
    //     data.className = "problems";
    //     data.id = parentDiv+"Problem";
    //     data.textContent = text;

    //     if(document.getElementById(idForButton)  === null)
    //     {
    //         const btn = helper.createBtn(problem,"block",idForButton,textForButton);
    //         btn.style.hidden = true;
    //     }else
    //     {
    //         document.getElementById(problem).appendChild(document.getElementById(idForButton));
    //         document.getElementById(idForButton).style.hidden = true;
    //         document.getElementById(problem).style.display="block";
    //     }
    // }
}

function addActionForListDoctors(data)
{
    for(let i =0;i<data.length;i++)
    {
       // console.log(data[i])
        data[i].action = `
        <div class='btn-group'>`;
        if(data[i].list_doc_have_access_to_patient!==null)
        {
            
            if(data[i].list_doc_have_access_to_patient.indexOf(id_doctor) > -1)
            {
                data[i].action += `<button class='btn btn-success btn-sm' id='btn_action_setDiagnosis'>Назначить диагноз</button>`
            }
        }
        data[i].action +=`<button class='btn btn-primary btn-sm' id='btn_moreInfo'>О пациенте</button></div>`
    }
    return data;
}
async function fillTablePatients()
{
    await fetch('/api/get_all_patients')
    .then(hashdata => hashdata.json())
    .then(result =>
    {
        let data= result.data;

        return addActionForListDoctors(data);
    })
    .then(list_patietns =>
    {
        table_patients = new DataTable('#table_patients',
        {
            responsive: true,
            data: list_patietns,
            columns: [
                { data: "num"},
                { data: 'initials' },
                { data: 'mail'},
                { data: 'city' },
                { data: 'action'},
                { data: 'list_doc_have_access_to_patient'},
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
                // preSelect:[
                //     {
                //         column:4,
                //         rows: [city_patient]
                //     }
                // ]
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
                    targets:[3,5]
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
                                label: 'Назначить диагноз',
                                value: function(rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Назначить диагноз');
                                }
                            }
                            // {
                            //     label: 'Имеет доступ',
                            //     value: function(rowData, rowIdx) 
                            //     {
                            //         return rowData.action.includes('Забрать доступ');
                            //     }
                            // }
                        ]
                       // className: 'bord'
                    },
                    targets: [4]
                },
                // {
                //     searchPanes: {
                //         show:true,
                //         options: [
                //             {
                //                 label: 'Имеется доступ',
                //                 value: function(rowData, rowIdx) 
                //                 {
                //                     if(rowData.list_doc_have_access_to_patient !== null)
                //                         {
                //                             //console.log(rowData.list_doc_have_access_to_patient);
                //                             return rowData.list_doc_have_access_to_patient.includes('61')
                //                         }
                //                     return;
                //                 }
                //             }
                       
                //         ]
                //     },
                //     targets: [5]
                // }
                
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

       // console.log(table_patients.data().length);
        // table_doctors.searchPanes.container().prependTo(table_doctors.table().container());
        // table_doctors.searchPanes.resizePanes();
    })
    .catch(error=>console.log);


}

async function isAccess(meta_patient)
{
    //console.log(meta_patient);
    if(meta_patient !== null && meta_patient !== undefined && meta_patient != "")
    {
        await window.contract.methods.checkAccess(meta_patient)
        .call({from :accountUser})
        .then(isAccess =>
        {
            if(isAccess===true)
            {
                $('#modal_setDiagnosis').modal('show');
                
                console.log("You have access")
            }else
            {
                console.log("You don't have access")
                return false;
                
            }
            window.contract.getPastEvents("allEvents",
            {                               
                fromBlock: 'latest',     
                toBlock: 'latest'     
            }).then((events) => console.log(events))
            .catch((err) =>console.error(err));
        })
        .catch((error)=>
        {
            console.error(error);
            //console.error(error.message);
            let start = error.message.indexOf("message");
            console.log( error.message.slice(start-1,  error.message.indexOf("\",",start)) );

        });
        
    }       
    
}



async function fillTableIlls()
{
    await fetch("/api/get_all_ill_s_patient",
    {
        method: 'POST',
        body: JSON.stringify({meta:accountUser,queryDoctor:true}),
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
            data[i].action = `<div class='btn-group'>`
            
            if(data[i].status.includes('ill')===true && data[i].list_doc.includes(id_doctor)===true && data[i].id_doctor === id_doctor)
            {
                data[i].action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`;    
            }else
            {
                if(data[i].status.includes('ill')===true && data[i].list_doc.includes(id_doctor)===true && data[i].list_doc.includes(data[i].id_doctor)===false)
                    data[i].action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`;
            }
            
            data[i].action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`
            data[i].action += `</div>`;
            if(data[i].date_cured!== "" && data[i].date_cured!== undefined && data[i].date_cured!==null)
                data[i].date_cured = `${ new Date(data[i].date_cured).toISOString().slice(0,10) + ' ' + new Date(data[i].date_cured).toISOString().slice(11,19)}`
            
            if(data[i].date_ill!== "" && data[i].date_ill!==undefined && data[i].date_ill!==null)
                data[i].date_ill = `${  new Date(data[i].date_ill).toISOString().slice(0,10) + ' ' + new Date(data[i].date_ill).toISOString().slice(11,19)}`

           
        }
        return data;
    })
    .then(list_ills =>
    {
        if(list_ills!==undefined || list_ills !== null || list_ills.length !==0)
        {
            createTableIlss(list_ills,[
                { data: "num"},
                { data: "surname"},
                { data: 'name_ill' },
                { data: 'treatment'},
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured'},
                { data: 'status'},
                { data: 'action'},
                { data: 'id'},
                { data: 'id_patient'},
                { data: 'meta'}
            ]);
        }else
        {
            createTableIlss([],[
                { data: "num"},
                { data: "surname"},
                { data: 'name_ill' },
                { data: 'treatment'},
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured'},
                { data: 'status'},
                { data: 'action'},
                { data: 'id'},
                { data: 'id_patient'},
                { data: 'meta'}
            ]);
        }


        // table_ills.searchPanes.container().prependTo(table_ills.table().container());
        // table_ills.searchPanes.resizePanes();
    })
    .catch(error=>console.log);
}

function createTableIlss(list_ills,name_column)
{
    table_ills = new DataTable('#table_ills',
        {
            responsive: true,
            initComplete: function() {
                //Show datatable when load complete
                $('#table_ills').show();
            },
            data: list_ills,
            columns: name_column,
        
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
                layout: 'columns-3',
            },
            dom: 'Plfrtip',
            columnDefs:[
                {
                    sClass: "hide_columns",
                    aTargets: [9,10,11]
                },
                {
                    searchPanes:
                    {
                        show:true
                    },
                    targets:[4,5,7]
                },
                {
                    searchPanes:
                    {
                        show:false
                    },
                    targets:[0,1,2,3,5,6,8,9,10,11]
                }
                
            ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true
           
        });
}

async function fillFormPersonalData()
{
    Promise.all([
        await fetch("/api/get_contacts_doctors",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        }).then(hashFiles => hashFiles.json()),
        await fetch("/api/get_all_categories_doctors",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        })
        .then(hashdata => hashdata.json()),
        await fetch("/api/get_hospitals",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        })
        .then(hashdata => hashdata.json()),
        await fetch("/api/get_all_profession_doctors",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        })
        .then(hashdata => hashdata.json()),
        await fetch("/api/get_all_personalInfo_doctor",
        {
            method: 'POST',
            body: JSON.stringify({meta:accountUser}),
            headers:
            {
                "Content-Type":"application/json"
            }
        })
        .then(hashdata => hashdata.json())
    ])
    .then(result =>
        {
           // console.log(result);
            let contacts = result[0].data;
            let categories = result[1].data;
            let hospitals = result[2].data;
            let professions = result[3].data;
            let doctor = result[4].data[0];
      
            fillSelectOptions('contacts_id',contacts,optionContacts_doctors);
            fillSelectOptions('categories',categories,optionCategory);
            fillSelectOptions('hospital_id',hospitals,optionHospitals);
            fillSelectOptions('professions',professions,optionProfession);
            
 
            //console.log(data);
            id_doctor = doctor.id;
            nameId.value = doctor.name;
            surnameId.value = doctor.surname;
            lastnameId.value = doctor.lastname;
            document.getElementById('title_profile').innerHTML = 'Доктор ' + doctor.name + ' <span style="font-size:16px">(#' + id_doctor +')</span>';

            phoneDoctor.value = doctor.phone;
            mailDoctor.value = doctor.mail;
            selectedOption('#professions',doctor.profession);
            selectedOption('#contacts_id',doctor.contacts_id);
            selectedOption('#hospital_id',doctor.hospital_id);
            selectedOption('#categories',doctor.category);
            document.querySelector('#form_change_personalData #meta').value = accountUser; 
            
        })
        .catch(error=>console.log(error))

    
}

async function fillFormSetDiagnosis()
{
    Promise.all([
        await fetch("/api/get_all_classificationIlls",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        }).then(hashFiles => hashFiles.json()),
        await fetch("/api/get_all_name_ills",
        {
            method: 'GET',
            headers:
            {
                "Content-Type":"application/json"
            }
        })
        .then(hashdata => hashdata.json()),
    ])
    .then(result =>
        {
           // console.log(result);
            let name_ill = result[1].data;
            let classification = result[0].data;
      
            fillSelectOptions('name_ills',name_ill,optionNameIll);
            fillSelectOptions('classification',classification,optionClassification);
            
            //$('#form_setDiagnosis #meta').value = accountUser; 
            document.querySelectorAll(`#form_setDiagnosis #meta`)[0].value = accountUser;
        })
        .catch(error=>console.log(error))

    
}

function fillFormForSetDiagnosis(data_patient)
{
    $('#form_setDiagnosis #name_ill')[0].value = "";
    $('#form_setDiagnosis #treatment')[0].value = "";
    $('#form_setDiagnosis #data_ill')[0].value = "";
    $('#form_setDiagnosis #data_cured')[0].value = "";
    $('#form_setDiagnosis #id_ill')[0].value = "";
    $('#form_setDiagnosis #statusIll')[0].value = "";
    $('#form_setDiagnosis #id_patient')[0].value = data_patient.id;
    document.querySelectorAll(`#form_setDiagnosis #btn_setDiagnosis`)[0].textContent = "Поставить диагноз"
}
function fillFormChangeDiagnosisPatient(data_illPatient)
{
    $('#form_setDiagnosis #id_patient')[0].value = data_illPatient.id;
    $('#form_setDiagnosis #name_ill')[0].value = data_illPatient.name_ill;
    $('#form_setDiagnosis #treatment')[0].value = data_illPatient.treatment;
    $('#form_setDiagnosis #data_ill')[0].value = data_illPatient.date_ill;
    $('#form_setDiagnosis #data_cured')[0].value = data_illPatient.date_cured;
    $('#form_setDiagnosis #id_ill')[0].value = data_illPatient.id;
    $('#form_setDiagnosis #statusIll')[0].value = data_illPatient.status;
    selectedOption('#form_setDiagnosis #classification',data_illPatient.classification);
    selectedOption('#form_setDiagnosis #name_ills',data_illPatient.name_ill);
    document.querySelectorAll(`#form_setDiagnosis #meta`)[0].value = accountUser;
    document.querySelectorAll(`#form_setDiagnosis #btn_setDiagnosis`)[0].textContent = "Изменить данные"
}


function fillSelectOptions(parent,data,optionElements)
{
    for(let i=0;i<data.length;i++)
    {
        const option = document.createElement('option');
        if(data[i].id===undefined)
            option.value = optionElements(data[i]);
        else
            option.value = data[i].id;

        option.textContent = optionElements(data[i]);
        document.getElementById(parent).appendChild(option);
        
    }
}

function selectedOption(parent_id,value)
{
    if(document.querySelectorAll(`${parent_id}`)[0].querySelector(`[value="${value}"]`)!==null)
    {
        document.querySelectorAll(`${parent_id}`)[0].querySelector(`[value="${value}"]`).selected = true
    }
}

function optionContacts_doctors(element)
{
    return `${element.office_phone}:${element.office_mail}`
}

function optionHospitals(element)
{
    return `${element.city}:${element.number_hospital}`
}

function optionCategory(element)
{
    return `${element.category}`
}

function optionProfession(element)
{
    return `${element.profession}`
}
function optionNameIll(element)
{
    return `${element.name_ill}`
}
function optionClassification(element)
{
    return `${element.classification}`
}

document.getElementById('form_change_personalData').addEventListener("submit", async function()
{
    const personalData = 
    {
        name: nameId.value,
        surname: surnameId.value,
        lastname: lastnameId.value,
        professions: professions.value,
        phone:phonePatient.value,
        mail:mailPatient.value,
        contacts_id: contacts_id.value,
        hospital_id: hospital_id.value,
        categories: categories.value,    
        meta: accountUser, 
    };
    if(checkData(personalData) == true)
    {

        // await fetch("/api/update_pesonalInfo_patient",
        // {
        //     method: 'POST',
        //     body: JSON.stringify(personalData),
        //     headers:
        //     {
        //         "Content-Type":"application/json"
        //     }
        // }).then(hashFiles => hashFiles.json()).then(data =>
        // {
        //     console.log(data);
        // });
    }
});

//TODO: form change password

function checkData(data)
{
    if(data.name === undefined || data.surname === undefined || data.addressOfResidence === undefined || data.addressRegistered === undefined || data.insurancePolicy === undefined || data.bdate === undefined )
    {
        return false;
    }
    if(data.name === null || data.surname === null || data.addressOfResidence === null || data.addressRegistered === null || data.insurancePolicy === null || data.bdate === null )
    {
        return false;
    }
    if(data.name == "" || data.surname == "" || data.addressOfResidence == "" || data.addressRegistered == "" || data.insurancePolicy == "" || data.bdate == "" )
    {
        return false;
    }
    var notOnlyWord = new RegExp("^.*[^A-zА-яЁё].*$");
    if(notOnlyWord.test(data.name) && notOnlyWord.test(data.surname))
    {
       return false; 
    }
    if(data.lastname !== undefined && data.lastname !== null && data.lastname != "")
    {
        if(notOnlyWord.test(data.lastname))
        {
           return false; 
        }
    }
    const passReg = new RegExp(/^(?=.*[\d])(?=.*[!@#$%^&+*;:})({])[\w!@#$%^&+*;:})({]{10,255}$/);
    if((password_repeat.value !== undefined && data.password !== undefined && data.password === password_repeat.value))
    {
        if(passReg.test(data.password) === false)
        {
            console.log(passReg.test(data.password))
            return false;
        }
    }
    

    return true;
}

document.getElementById("home").addEventListener("click", function()
{
    window.open("/",'_self');
});



document.getElementById('name_ills').addEventListener('change', function()
{
    document.querySelector('#name_ill').value=this.value;
});

document.getElementById('form_setDiagnosis').addEventListener("submit", async function()
{
    console.log(meta);
    const diagnosis = 
    {
        name_ill: name_ill.value,
        treatment: treatment.value,
        classification: classification.value,
        date_ill: data_ill.value,
        date_cured: data_cured.value,
        meta: accountUser,
        id_patient: id_patient.value,
        id_ill: id_ill.value,
        status: statusIll.value
    };

    console.log(diagnosis);
    if(document.querySelectorAll(`#form_setDiagnosis #id_ill`)[0].value===undefined || document.querySelectorAll(`#form_setDiagnosis #id_ill`)[0].value === '')
    {
       await setDiagnosis(diagnosis);//set_diagnosis
    }else
    {

       await updateDB(diagnosis);
    }
   
    
});

async function setDiagnosis(diagnosis)
{
        await fetch("/api/set_diagnosis",
        {
            method: 'POST',
            body: JSON.stringify(diagnosis),
            headers:
            {
                "Content-Type":"application/json"
            }
        }).then(hashFiles => hashFiles.json())
        .then(result =>
        {
            console.log(result)
            let data = result.data[0];
            //console.log(data)
            data.action = `<div class='btn-group'>`
            
            if(data.status.includes('ill')===true && data.list_doc.includes(id_doctor)===true)
                data.action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`; 
            if(data.date_cured!== "" && data.date_cured!== undefined && data.date_cured!==null)
                data.date_cured = `${ new Date(data.date_cured).toISOString().slice(0,10) + ' ' + new Date(data.date_cured).toISOString().slice(11,19)}`
              
            if(data.date_ill!== "" && data.date_ill!==undefined && data.date_ill!==null)
                data.date_ill = `${  new Date(data.date_ill).toISOString().slice(0,10) + ' ' + new Date(data.date_ill).toISOString().slice(11,19)}`

            data.action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`
            data.action += `</div>`;
            console.log(table_ills.data().length+1);
            
            table_ills.row.add(
                {
                    "num": table_ills.data().length+1,
                    "surname": data.surname,
                    'name_ill' : data.name_ill,
                    'treatment': data.treatment,
                    'classification': data.classification,
                    'date_ill' : data.date_ill,
                    'date_cured': data.date_cured,
                    'status': data.status,
                    'action': data.action,
                    'id': data.id,
                    'id_patient': data.id_patient,
                    'meta': data.meta
                }
            ).draw();
           // console.log(table_ills.data());
        })
        .catch(error=>console.log(error))

}

async function updateDB(diagnosis)
{
    await fetch("/api/update_diagnosis",
    {
        method: 'POST',
        body: JSON.stringify(diagnosis),
        headers:
        {
            "Content-Type":"application/json"
        }
    }).then(hashFiles => hashFiles.json())
    .then(result =>
    {
        console.log(result);
        console.log(data_changeDiagnosisPatient);
        data_changeDiagnosisPatient.classification = diagnosis.classification;

        if(diagnosis.date_cured!== "" && diagnosis.date_cured!== undefined && diagnosis.date_cured!==null)
            data_changeDiagnosisPatient.date_cured = `${ new Date(diagnosis.date_cured).toISOString().slice(0,10) + ' ' + new Date(diagnosis.date_cured).toISOString().slice(11,19)}`
            
        if(diagnosis.date_ill!== "" && diagnosis.date_ill!==undefined && diagnosis.date_ill!==null)
            data_changeDiagnosisPatient.date_ill = `${  new Date(diagnosis.date_ill).toISOString().slice(0,10) + ' ' + new Date(diagnosis.date_ill).toISOString().slice(11,19)}`

        data_changeDiagnosisPatient.treatment = diagnosis.treatment;
        data_changeDiagnosisPatient.name_ill = diagnosis.name_ill;
        data_changeDiagnosisPatient.status = diagnosis.status;
        if(diagnosis.status === "Cured")
        {
            data_changeDiagnosisPatient.action = `<div class='btn-group'>`;
            data_changeDiagnosisPatient.action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`;
            data_changeDiagnosisPatient.action += `</div>`;
        }
    

        table_ills.row(data_changeDiagnosisPatient.num-1).data(data_changeDiagnosisPatient).draw();
       // table_ills.draw();
       // console.log(table_ills.data());
    })
    .catch(error=>console.log(error))

}
