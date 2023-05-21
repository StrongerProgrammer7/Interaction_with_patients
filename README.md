<sub>**This work was done as part of the Course work by Author: Abdyukov Z.M. **</sub> 
<h3>Content</h3>

[Brief introduction](https://github.com/StrongerProgrammer7/Interaction_with_patients/tree/main#-brief-introduction-)<br>
[Development tools](https://github.com/StrongerProgrammer7/Interaction_with_patients/tree/main#development-tools-and-programming-language)<br>
[Architecture](https://github.com/StrongerProgrammer7/Interaction_with_patients/tree/main#prototype-architecture)<br>
[What is the change compared to the previous work](https://github.com/StrongerProgrammer7/Interaction_with_patients/tree/main#what-is-the-change-compared-to-the-previous-work)<br>
[View Prototype](https://github.com/StrongerProgrammer7/Interaction_with_patients/tree/main#-view-prototype-)

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
<p>Interaction patient with Db/contract</p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/33d150e3-4a85-4ca3-b226-bd9ba120883a"></p>
<p>Interaction Doctor with Db/contract</p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/0af80b59-26b4-43f4-b587-f65ef5d656d4"></p>
<p>Schema database</p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/d04f90f2-a59c-4b10-8147-190346a434a0"></p>
</div>
<div>
<h3 align="center">What is the change compared to the previous work</h3>
 <p><a href="https://github.com/StrongerProgrammer7/SmartContractPatients.git"> More info about last work </a><br>
  <span>I advise you to watch this, as the current work is related to the last one</span></p>
<p align="justify">Comparing with the previous course work, this prototype provides more opportunities, namely:
 <ul>
  <li>Smart contract operations are much cheaper, since the smart contract acts as a gatekeeper that controls access to data.</li>
  <li>The database allows you to store large amounts of files and data about patients and doctors without loading the blockchain.</li>
  <li>Control remains entirely with the patient</li>
  <li>Operations are completely transparent</li><p>
</div>
<div>
<h3 align="center">TODO:</h3>
<p align="justify">
     In the future, it is planned to add the ability to store large files about patients (fluorography, etc.) in the database and also add it to IPFS. Because IPFS data is mutable and secure, any attempt to change data stored in IPFS can only be done by changing the identifier. Therefore, it provides a cryptographic identity to protect data from manipulation. Each data file stored in IPFS contains a cryptographically generated hash value. It has only one meaning and is used to identify data files stored in IPFS. Since IPFS eliminates duplicate files and it is impossible to change them because the files are protected by a cryptographic key</p>
<p> <strong>Cost(gas/$): Contract Creation (Patient) ~ 1639436/7.57$, (addPatient) ~ 1085549/5.12$ , Register - 216485/2.13$ Give access ~ 128597/1.4$</strong></p>
 
+ 1. Add files to database

+ 2. Include IPFS

+ 3. Add available work with IPFS for big files

+ 4. Test on large volumes of data

+ 5. In case of successful solution of the problems above, create an Android App

</div>
<div>
<h3 align="center"> View Prototype </h3>
<p align="left"> Preview </p>
<video src='' width=100px autoplay alt='This will be movie></video>
  <p align="left"> <strong>Profile Patient</strong> </p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/8ff4a370-8ff6-4f18-b2b3-7d7886f2d3f8"></p>
 <p align="left"> <strong>Profile Doctor</strong></p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/9c1bab92-ec48-49be-8b2c-723ab1500361"></p>
 <p align="left"> <strong>Register Form</strong> </p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/db3c2fdf-98e2-4d27-89cd-6390d2bf84ad"></p>
 <p align="left"> <strong>Register Form for doctor</strong></p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/f7aea385-811d-4896-94cc-29f05a08dd60"></p>
 <p align="left"> <strong>Exists access (Patient)</strong> </p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/a9731d90-d889-4a13-a150-8de00cfabce6"></p>
 <p align="left"> <strong>Exists access (Doctor)</strong> </p>
<p align="center"><img src="https://github.com/StrongerProgrammer7/Interaction_with_patients/assets/71569051/27290612-23c5-4dc0-a13b-110f11e2fce1"></p>
</div>
<h4> Author: Abdyukov Z.M. </h4>
