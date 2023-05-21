<sub>**This work was done as part of the Course work by Author: Abdyukov Z.M. **</sub> 
<h3>Content</h3>

[Brief introduction](https://github.com/StrongerProgrammer7/SmartContractPatients#-brief-introduction-)  


<div align="center">
<h1>DB/IPFS with smart-contract EHTEREUM:</h1>
<h2>Interaction Patient with Doctor </h2>
</div>
<div>
<h3 align="center"> Brief introduction </h3>
 <p>The main goal of the work is to use a smart contract together with a database to ensure confidentiality and security, control data, facilitate and automate the interaction between physicians and patients, and provide better data management in distributed systems.<br><br>
The scientific novelty of the work lies in the fact that a new approach to the interaction of the patient with doctors is proposed.</p>
    <h4 align="center">Blockchain in healthcare</h4>
    <p align="justify">Blockchain allows you to create a distributed database that is protected from unauthorized access and manipulation.</p>
    <h4 align="center">Smart Contract in healthcare</h4>
    <p align="justify">Ethereum smart contracts can be used in medicine to improve the security and efficiency of medical data processing, manage medical supplies, and automate many of the processes associated with medical services. </p>
     <h4 align="center">Promlem blockchain and accept DB/IPFS</h4>
    <p align="justify">It takes a lot of money to store a huge number of records on the blockchain, and the authorized exchange of medical records is another problem. The proposed system uses the Interplanetary File System (IPFS) and a database to overcome this problem.
<br>The database or IPFS and smart contracts can be used to optimize the process of interaction between the doctor and the patient. Below are some possible ways to use the database and smart contracts:
<ul>
  <li>Appointment appointment: The doctor can create an appointment in the database, specifying the date and time of the appointment, as well as information about the patient. A smart contract can automatically send an appointment confirmation to a patient.</li>
  <li>Storage of medical data: The database can be used to store the medical data of patients, such as test results, diagnoses, previous appointments, etc. A smart contract can ensure the security and confidentiality of these data.</li>
  <li>Issuing prescriptions: The doctor can create a prescription in the database, specifying the necessary medicines and dosages. A smart contract can automatically send a prescription to a pharmacy for execution</li>
  <li>Assignment of tests: The doctor can create an appointment for tests in the database, indicating the necessary studies and deadlines. A smart contract can automatically send an assignment to a lab for execution.</li>
  <li>Doctor-Patient Information Sharing: The system can be used to share information between doctor and patient, such as sending appointment notifications or communicating when questions arise.</li>
 </ul>
</p>
</div>

<div> 
<h3 align="center">Development tools and Programming Language</h3>
<p align="justify"> For Smart Contract, i used Solidity and IDE Remix(Debug contract), also Personal Blockchain Ganache</p>
<p align="justify"><strong>Inside our server, server-ganache is enabled. And the smart contract is deployed inside server-ganahce</strong></p>
<p align="justify"> For Web-Site, used HTML/CSS/JS and NodeJS</p>
<pre><code>npm install -S express body-parser browserify dotenv ejs ejs-mate express-fileupload ganache ipfs-core ipfs-http-client node-abort-controller web3 web3-eth ganache</code> </pre>
<p><b>Node v18.13.0 ,<br>npm v8.19.3</b></p>
</div>
<div>
<h3 align="center">Prototype architecture</h3>
<p>Interaction patient with doctor</p>
<p align="center"><img src=""></p>
<p>Interaction Doctor with patient's contract</p>
<p align="center"><img src=""></p>
<p>Interaction patient with contract</p>
<p align="center"><img src=""></p>
</div>
<div>
<h3 align="center">What is the change compared to the previous work</h3>
<p align="justify"><p>
</div>
<div>
<h3 align="center">Some problem and TODO:</h3>
<p align="justify">
      The first problem is <b>the limited size of the contract</b>. The developers of the Ethereum network and smart contracts have limited the size of contracts, which does not allow adding a lot of functionality. <b>The maximum contract size is 24576 bytes</b>, you can also use the built-in optimizer, but they also have a "too deep stack" limit of no more than 16 local variables. This was done in order to prevent DDos attacks. It is also possible to optimize the contract if it is translated into the Assembly (Assembler) language, but the developers strongly do not recommend it, since in this case there is work with memory, as a result of which it can cause problems in the Ethereum network. As a result, a smart contract can only be used with little functionality and a limited number of checks in the contract itself.</p>
<p align="justify">The second problem is that the contract is <b>too expensive</b>. The write functions are not expensive, but the display functions have nested loops, which greatly increases the price of the contract. <b>So, for example, displaying one diagnosis costs 35,000 gas, if there are already two, then 70,000 gas.</b> But I also note that the Ethereum network switched to “ProofOfStake” in the fall of 2022, perhaps next year the cost of computing will fall, and the contract will become cheaper.</p>
<p align="justify">The third problem is file storage. About 75 million people use cloud storage. Part of the campaign, another part uses intentionally, and still others only indirectly. The rest may not know about it, because there is simply no need. IPFS, on the other hand, is still a very young technology that requires development, testing and implementation to the masses (for example, a default installation along with the OS).<b> As a result, the use of IPFS as a storage is not very advisable in the near future, since in addition to those mentioned above, there are few users, and, therefore, the data will be loaded for a long time, and the receipt can also be long.</b></p>
<p align="justify">Also, <b>the developed application is only partially decentralized, as it works on the basis of a central node - a server.</b> For an application to be fully decentralized, the contract must be published to IPFS and the application deployed to a distributed file system. Only in this case, the dependence on the central node will disappear and the application will be truly decentralized.</p>
<p> Cost(gas): Contract Creation (Patient) - 4764952, (addPatient) - 2224094 ,<br> Register - 362839, <br> Show BaseInfo - 58385, Show all diagnosis - 248218, Show history - 246536</p>
<h4>TODO: </h4>

+ 1. Contract optimization: learn Solc and apply

+ 2. WebSite optimization (the main page slows down)

+ 3. WebSite: remove jQuery (only used for slider), manually create slider

+ 4. Test on large volumes of data

+ 5. In case of successful solution of the problems above, create an Android App

</div>
<div>
<h3 align="center"> View Prototype </h3>
<p align="center"> MAIN PAGE </p>
<video src='' width=100px autoplay></video>
<p align="center"> Chapter Patient </p>
<p align="center"><img src=""></p>
<p align="center"> Chapter Doctor</p>
<p align="center"><img src=""></p>
<p align="center"> Show Base info </p>
<p align="center"><img src=""></p>
<p align="center"> Check connect: circle is check connect with wallet, check mark is connect with contract</p>
<p align="center"><img src=""></p>
<p align="center"> Register Form </p>
<p align="center"><img src=""></p>
<p align="center"> Success Register </p>
<p align="center"><img src=""></p>
<p align="center"> Success access </p>
<p align="center"><img src=""></p>
<p align="center"> Set diagnosis Form </p>
<p align="center"><img src=""></p>
<p align="center"> Info diagnos </p>
<p align="center"><img src=""></p>
<p align="center"> History </p>
<p align="center"><img src=""></p>
</div>
<h4> Author: Abdyukov Z.M. </h4>
