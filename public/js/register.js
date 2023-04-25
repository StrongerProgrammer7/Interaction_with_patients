var accountUser;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const setNewDataBase = urlParams.get('setNewDataBase');
var baseDataAboutPatient;
var baseData = new Array();

window.addEventListener("DOMContentLoaded",async() =>
{  
    
    if(typeof window.ethereum !== 'undefined')
    {
        if(window.ethereum.isMetaMask)
            console.log("Using Metamask's web3 provider");
        window.web3 = await new Web3(window.ethereum);

        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        accountUser = accounts[0];
        document.getElementById("meta").value = accountUser; 
        try 
        {
            error.style.display = "none";       
            window.contract = await new window.web3.eth.Contract(ABI,addressContract);
            console.log(window.contract._address);

            await fetch("/api/get_cities",
            {
                method: 'GET',
                headers:
                {
                    "Content-Type":"application/json"
                }
            }).then(hashFiles => hashFiles.json()).then(cities =>
            {

                let data = cities.data;
                putCityToSelect('addressOfResidence',data);
                putCityToSelect('addressRegistered',data);
                
            });

        } catch (error)
        {
            messageError('There is problem with contract, check console!');
            console.log(error);
        }  
    }else
    {
        console.warn('No web3 detected. Falling back to http://localhost:8545.');
        web3 = await new Web3("ws://localhost:8545");       
        success.style.display = "none";
        error.style.display = "block";
        error.innerText = 'No web3 detected. Falling back to http://localhost:8545.';
        document.querySelector('#btn-open-form').disabled = true;
    }

 
    if(setNewDataBase !==null && setNewDataBase == 1)
    {
        clear_removeAttribute(); 
        document.getElementById("title").appendChild(document.createElement('p')).innerText = " Если поля останутся как есть, то эти данные не будут изменены"; 
        baseDataAboutPatient = await window.contract.methods.getInformationPatient(accountUser).call({from :accountUser});
        fullDatainput();
       
    }
    
});

function putCityToSelect(parent,data)
{
    for(let i=0;i<data.length;i++)
    {
        const option = document.createElement('option');
        option.value = data[i].id;
        option.textContent = `${data[i].region}:${data[i].city}`;
        option.selected = true; //TODO: Delete after test 
        document.getElementById(parent).appendChild(option);
        
    }
}

document.getElementById("home").addEventListener("click", function()
{
    window.open("/",'_self');
});

let hashTx ="";
form.addEventListener("submit", async function()
{
    //console.log(setNewDataBase);
    if(setNewDataBase ===null && setNewDataBase !== 1)
    {
        if(password.value === password_repeat.value)
            registerPatient();
        else
        {
            console.log('password don`t repeat');
        }
        // console.log(accountUser);
        // console.log(window.contract._address);
            
            // const tx = 
            //     {
            //         from: accountUser,
            //         to: window.contract._address,
            //         //gas:'200000',
            //         data: window.contract.methods.createPatient().encodeABI()
            //     };
            
            //   const hash = web3.utils.soliditySha3(tx);
            //   console.log(hash);
              
            //   ethereum.request(
            //     {
            //         method:'eth_sign',
            //         params:[accountUser,hash]
            //     }
            //   ).then(async (result) =>
            //     {   console.log(result);
            //         const reg = { meta:accountUser, hashTx:result};
            //             console.log(reg);
            //             await fetch("/api/register",
            //             {
            //                 method: 'POST',
            //                 body: JSON.stringify(reg),
            //                 headers:
            //                 {
            //                     "Content-Type":"application/json"
            //                 }
            //             }).then(hashFiles => hashFiles.json()).then(data =>
            //             {
            //                 console.log(data);
            //             });
            //     })
            
              //   ethereum.request({ 
            //     method: 'personal_sign', 
            //     params:[hash,accountUser],
            //     from: accountUser
                
            // }).then(async (data) => 
            //     {
            //     const reg = { meta:accountUser, hashTx:data};
            //     console.log(reg);
            //     await fetch("/api/register",
            //     {
            //         method: 'POST',
            //         body: JSON.stringify(reg),
            //         headers:
            //         {
            //             "Content-Type":"application/json"
            //         }
            //     }).then(hashFiles => hashFiles.json()).then(data =>
            //     {
            //         console.log(data);
            //     });
            // });
    }
    else
        changeBaseDataPatient();
    
});

async function registerPatient()
{
    const registerData = 
    {
        name: nameId.value,
        surname: surnameId.value,
        lastname: lastnameId.value,
        bdate: bdateId.value,
        phone:phonePatient.value,
        mail:mailPatient.value,
        addressOfResidence: addressOfResidence.value,
        addressRegistered: addressRegistered.value,
        insurancePolicy: insurancePolicy.value,    
        meta: accountUser, 
        password:password.value
    };

    if(checkData(registerData) == true)
    {
        //TODO Begin query DB ,check repeat 
        await window.contract.methods.createPatient().send({from :accountUser}).then((res) =>
        {
           // console.log(res);
            window.contract.getPastEvents("allEvents",
            {                               
                fromBlock: 'latest',     
                toBlock: 'latest'     
            }).then((events) => 
            {
                success.style.display = "block";
                error.style.display = "none";
                success.innerText = 'Great!' + 'your contract : ' + events[0].returnValues[3];
                console.log(events);
            })
            .catch((err) => console.error(err));
            
        })
        .then(async () =>
        {
            await fetch("/api/register",
            {
                method: 'POST',
                body: JSON.stringify(registerData),
                headers:
                {
                    "Content-Type":"application/json"
                }
            }).then(hashFiles => hashFiles.json()).then(data =>
            {
                console.log(data);
            });
        })
        .catch((err) =>
        {
            console.log(err);
            messageError('Error with contract, check console');
        });
       

        // let data = new Array();
        // for (let key in registerData)
        // {
        //     if(!registerData.hasOwnProperty(key)) 
        //         continue;
        //     data.push(registerData[key]);
        // }
        // console.log(data);

    }else
    {
        messageError('Error! Check your data, exists empty data or don`t right password');
    }
}

async function changeBaseDataPatient()
{
    try 
    {   
        
        if(baseDataAboutPatient!==null && baseDataAboutPatient.length ==7)
        {
            const registerData = 
            {
                name: nameId.value,
                surname: surnameId.value,
                lastname: lastnameId.value,
                bdate: bdateId.value,
                addressOfResidence: addressOfResidence.value,
                addressRegistered: addressRegistered.value,
                insurancePolicy: insurancePolicy.value,    
                meta: accountUser
            };

            if(checkData(registerData) == true)
            {               
                let ind = 0;
                for (let key in registerData)
                {
                    if(!registerData.hasOwnProperty(key) || key=="meta") 
                        continue;
                    if(baseData[ind] == registerData[key])
                        baseData[ind] = "";
                    else
                        baseData[ind] = registerData[key];
                    ind++;
                }
                console.log(baseData);
        
                await window.contract.methods.setNewBaseData(baseData).send({from :accountUser}).then((res) =>
                {
                    console.log(res);
                    window.contract.getPastEvents("allEvents",
                    {                               
                        fromBlock: 'latest',     
                        toBlock: 'latest'     
                    }).then((events) => 
                    {
                        success.style.display = "block";
                        error.style.display = "none";
                        success.innerText = 'Great!';
                        transition();
                    })
                    .catch((err) => console.error(err));
                }).catch((err) =>
                {
                    console.log(err);
                    messageError('Error with contract, check console!');
                });
            }else
            {
                messageError('Error! Check your data, exists empty data');
            }
        }else
        {
            messageError('Error! You don"t patient! Fall in back!');
            transition();

            
        }
    } catch (err) 
    {
        console.log(err);
        messageError('Error! You don"t patient or problem with contract! Fall in back!');
        transition();   
    }
   
}


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

function transition()
{
    setTimeout(function()
    {
        window.open("/",'_self');
    },  8 * 1000);
}

function fullDatainput()
{
    for (let elem = 0; elem < baseDataAboutPatient.length; elem++) 
    {
        const element = baseDataAboutPatient[elem];
        let pos = -1;
        pos = element.lastIndexOf(":") +2;

        console.log(pos, element,element.slice(pos));
        baseData.push(element.slice(pos));
       
    }
    console.log(baseData);
    document.getElementById('nameId').value = baseData[0];
    document.getElementById('surnameId').value = baseData[1];
    document.getElementById('lastnameId').value = baseData[2];
    document.getElementById('addressOfResidence').value = baseData[4];
    document.getElementById('addressRegistered').value = baseData[5];
    document.getElementById('insurancePolicy').value = baseData[6];
    document.getElementById('bdateId').value = baseData[3];
}

function clear_removeAttribute()
{
    document.getElementById('nameId').value = "";
    document.getElementById('surnameId').value = "";
    document.getElementById('lastnameId').value = "";
    document.getElementById('addressOfResidence').value = "";
    document.getElementById('addressRegistered').value = "";
    document.getElementById('insurancePolicy').value = "";
    document.getElementById('bdateId').value = "";

    document.getElementById('nameId').removeAttribute("required");
    document.getElementById('surnameId').removeAttribute("required");
    document.getElementById('lastnameId').removeAttribute("required");
    document.getElementById('addressOfResidence').removeAttribute("required");
    document.getElementById('addressRegistered').removeAttribute("required");
    document.getElementById('insurancePolicy').removeAttribute("required");
    document.getElementById('bdateId').removeAttribute("required");
}


function messageError(text)
{
    success.style.display = "none";
    error.style.display = "block";
    error.innerText = text;
}