//import detectEthereumProvider from '@metamask/detect-provider';
import * as helper from '../utils/helpers.js';
//const provider = null;
var accountUser = null;
var connectedContract = false;

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
    
    
    $('.slider').slick(
        {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false,
            fade: true,
            asNavFor: '.sliderSmall'
        }
    );
    $('.sliderSmall').slick(
        {
            arrows:false,
            dots: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots:false,
            centerMode: true,
            pauseOnHover: true,
            asNavFor: '.slider',
            mobileFirst:true,
            Infinity: true,
            speed: 2000,
            easing: 'ease',
            autoplay: true,
            autoplaySpeed: 7000,
            /*pauseOnFocus: true,
            pauseOnHover: true,
            responsive:
            [
                {
                    breakpoint: 768,
                    setting:
                    {
                        slidesToShow: 2
                    }
                }
            ],*/
        
    });

});

document.addEventListener("click", function(e) 
{
    try 
    {
        if(e.target) 
        {
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
            if(e.target.id =="btnRole")
            {
                try
                {
                    giveRoleDoctor();
                }catch(error)
                {
                    console.log("Give role:",error);
                }
            }
            if(e.target.id =="btnRevokeRole")
            {
                try
                {
                    revokeRoleDoctor();
                }catch(error)
                {
                    console.log("Revoke role:",error);
                }
            }
            if(e.target.id =="btnGetBaseInfoPatient")
            {
                try
                {
                    getBaseInfoPatient();
                }catch(error)
                {
                    console.log("Get base info:",error);
                }
            }
            if(e.target.id =="btnSetBaseInfoPatient")
            {
                try
                {
                    btnSetBaseInfoPatient();
                }catch(error)
                {
                    console.log("There is problem with set base infor!:",error);
                }
            }
            if(e.target.id =="btnGetnInfoDiagnos")
            {
                try
                {
                    btnGetnInfoDiagnos();
                }catch(error)
                {
                    console.log("Get diagnosis:",error);
                }
            }
            if(e.target.id =="btnSetDiagnosis")
            {
                try
                {
                    btnSetDiagnosis();
                }catch(error)
                {
                    console.log("Get info diagnosis current doctor:",error);
                }
            }
            if(e.target.id =="btnChangeDiagnosis")
            {
                try
                {
                    btnChangeDiagnosis();
                }catch(error)
                {
                    console.log("Get info diagnosis current doctor:",error);
                }
            }  
            if(e.target.id =="btnGetInfoDiagnosCurDoc")
            {
                try
                {
                    btnGetInfoDiagnosCurDoc();
                }catch(error)
                {
                    console.log("Get info diagnosis current doctor:",error);
                }
            } 
            if(e.target.id =="btnGetHistoryPatient")
            {
                try
                {
                    btnGetHistoryPatient();
                }catch(error)
                {
                    console.log("Get histories:",error);
                }
            }     
            if(e.target.id =="btnDownloadLinks")
            {
                try
                {
                    e.preventDefault();
                    btnDownloadLinks();
                }catch(error)
                {
                    console.log("Download links:",error);
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

document.getElementById("links__registerId").addEventListener("click", function()
{
    window.open("/register",'_self');
});
document.getElementById("btn_sign_up").addEventListener("click", async function()
{
    const logged = {
        meta:accountUser,
        pass:password.value,
        isDoctor: isDoctor.checked
    }
    await fetch("/api/login",
    {
        method: 'POST',
        body: JSON.stringify(logged),
        headers:
        {
            "Content-Type":"application/json"
        }
    })
    .then(hashFiles => hashFiles.json())
    .then(data =>
    {
        console.log(data);
       if(data.status===true)
       {
            if(isDoctor.checked === false)
                window.open("/profile",'_self');
            else
                window.open("/profile_doctor",'_self');
       }else
       {
            console.log('Incorrect password');
       }
    })
    .catch(error=>console.log);
    
});

document.getElementById('btn_open_model_pass').addEventListener('click',function()
{
    document.getElementById('meta').value = accountUser;
})
/*
document.getElementById("links_setDiagnosId").addEventListener("click", function()
{ 
    window.open("/setNewDiagnos",'_self');
});
document.getElementById("links_changeDiagnosId").addEventListener("click", function()
{
    window.open("/changeDiagnos",'_self');
});*/

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
                showMain();

                if(connectedContract==false)
                    connectContract();


            await fetch("/api/isExistsPatient_Doctor",
            {
                method: 'POST',
                body: JSON.stringify({meta:accountUser}),
                headers:
                {
                    "Content-Type":"application/json"
                }
            })
            .then(hashFiles => hashFiles.json())
            .then(data =>
            {
                console.log(data);
                if(data.status === true)
                {
                    if(data.data.doctor === true && data.data.patient === true)
                    {
                        document.getElementById("isDoctor").enabled = true;
                    }
                    if(data.data.doctor === false && data.data.patient === true)
                    {
                        document.getElementById("links__registerId").style.display = "inline-block";
                    }
                    if(data.data.doctor === true && data.data.patient === false)
                    {
                        document.getElementById("links__registerId").style.display = "inline-block";
                        document.getElementById("isDoctor").checked = true;
                    }
                    document.getElementById("btn_open_model_pass").style.display = "inline-block";

                    
                }else
                {
                    document.getElementById("links__registerId").style.display = "inline-block";
                }
            })
            .catch(error =>
                {
                    console.log(error);
                    document.getElementById("links__registerId").style.display = "inline-block";
                    document.getElementById("btn_open_model_pass").style.display = "none";
                });
               

            }else
            {
                let btn = document.getElementById("switch__buttonThree");
                btn.checked = false;
                btn.disabled = false;
             
                if(document.getElementById("accountProblem") === null || document.getElementById("accountProblem") === undefined)
                showProblem("account","problems_withAccount","Вы не соединилсь с кросчейн-кошельком! Попробуйте снова!","Соединиться с кросчейн-кошельком","btnSwitch");
            }
  
        } catch (error) 
        {    
            let btn = document.getElementById("switch__buttonThree");
            btn.checked = false;
            btn.disabled = false;
            if(document.getElementById("accountProblem") === null || document.getElementById("accountProblem") === undefined)
                showProblem("account","problems_withAccount","Вы не соединилсь с кросчейн-кошельком! Попробуйте снова!","Соединиться с кросчейн-кошельком","btnSwitch");             
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
            helper.off_onLinks("links__registerId","auto","pointer");
            
           /* if(document.getElementById("contract")==null)
            {
                const data = document.getElementById("connectedContract").appendChild(document.createElement('h4'));
                data.style.color = "green";
                data.className = "accountUsers";
                data.id = "contract";
                data.textContent = "Successfully";
                
            }else
            {
                document.getElementById("contract").textContent ="Successfully";
                ocument.getElementById("contract").style.color ="green";
                if(document.getElementById("connectContractAgain") !=null)
                    document.getElementById("connectContractAgain").hidden = true;

                helper.off_onLinks("links__registerId","auto","pointer");
               // helper.off_onLinks("links_setDiagnosId","auto","pointer");
                //helper.off_onLinks("links_changeDiagnosId","auto","pointer");
            }*/
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


const btnDownloadLinks = async() =>
{

    const acc_patient = document.getElementById("account_patient").value;
    if(accountUser !== null && accountUser !== undefined && accountUser !="")
    {
        if(acc_patient !== null && acc_patient !== undefined && acc_patient !== "")
        {
            document.getElementById("account_patient").style = "border: thick double green;";
            if(document.getElementById("errorAccountDownloadLinks") !== null && document.getElementById("errorAccountDownloadLinks") !== undefined)
                document.getElementById("btnDownloadLinks").removeChild(document.getElementById("errorAccountDownloadLinks"));
            
            let ipfsLinks = "";
            if(document.getElementById("files").files.length != 0 && document.getElementById("account_patient").value !="")
            {
                console.log(document.getElementById("files").files);
                const dataHash = await fetch("/api/upload",
                {
                    method: 'POST',
                    enctype:"multipart/form-data",
                    body: new FormData(formElem)
                }).then(hashFiles => hashFiles.json());
               
                var dataFIle = new Map(Object.entries(JSON.parse(dataHash)));
                console.log(dataFIle);
        
                for(const [key,value] of dataFIle)
                    ipfsLinks += key + ":" + value + "\n";
        
                
                try 
                {
                    await window.contract.methods.downloadFileLinks(acc_patient,ipfsLinks).send({from :accountUser});
                    document.getElementById("files").style = "border: thick double green;";
                    window.contract.getPastEvents("allEvents",
                    {                               
                        fromBlock: 0,     
                        toBlock: 'latest'     
                    }).then((events) => console.log(events))
                    .catch((err) =>console.error(err));
                } catch (error) 
                {
                    helper.displayError_tagP("btnDownloadLinks","errorDownload","There are problems with download on the contract!","red");
                    console.log(error);
                }
            }
            else
            {
                document.getElementById("account_patient").style = "border: thick double red;";
                document.getElementById("files").style = "border: thick double red;";
            }
        }else
        {
            document.getElementById("account_patient").style = "border: thick double red;";
        }
        
    }else
    {
        if(document.getElementById("errorAccountDownloadLinks") === null || document.getElementById("errorAccountDownloadLinks") === undefined)
            helper.displayError_tagP("btnDownloadLinks","errorAccountDownloadLinks","Error! Check your account!","red");
        
    }
    
}

function showMain()
{				
    // document.getElementById("wr").style.position ="unset";
    document.getElementById("problems").style.paddingBottom = "0";		   
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
    // document.getElementById("wr").style.position ="fixed";      
	helper.off_onLinks("links__registerId","none","default");
    //helper.off_onLinks("links_setDiagnosId","none","default");
    //helper.off_onLinks("links_changeDiagnosId","none","default");
	
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
