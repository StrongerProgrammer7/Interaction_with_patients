//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./Patient.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/proxy/Clones.sol";
/*
*@author Abdyukov Z.
*@notice Регистрация пациентов, никто не имеет право на этот контракт, он используется
* только для регистрации, внесение изменений, просмотра
*/
contract Patients
{
    event NewPatient(string notice, address patient, uint256 number, address contractPatient);
    event GetRole(string role, address doctor);
    event Log(string func, address sender, bytes data);

    uint256 private countPatients = 0;
    mapping(address => address) private adressesPatient;
 
    address private implementation;
    constructor (address _implementation) 
    {
        implementation = _implementation;
    }

    modifier existsPatient(address _patient)
    {
        require(adressesPatient[_patient]!=address(0),"Patient don't exists!Check patient's account!");
        _;
    }

    function createPatient() external 
    {
        require(adressesPatient[msg.sender]==address(0),"You were register!");
        
        address patient = Clones.clone(implementation);

        Patient(patient).register(msg.sender);

        adressesPatient[msg.sender] = patient;
        countPatients++;

        emit NewPatient("Create patient: ",msg.sender,countPatients-1,patient);    
    }

    function checkAccess(address _patient) external view  existsPatient(_patient)  returns (bool)
    {
        Patient p = Patient(adressesPatient[_patient]);
        return p.isAccess(msg.sender);
    }

    function getCountPatient() external view returns(uint)
    {
        return countPatients;
    }
         
    // function downloadFileLinks(address _patient,string memory _fileLinks) external existsPatient(_patient)
    // {
    //     Patient p = Patient(adressesPatient[_patient]);
    //     p.downloadLinksFile(msg.sender,_fileLinks);
    // }
   
    function giveRole(address _doctor) external
    {
        require(msg.sender != _doctor, "You can not be a doctor!");
        Patient p = Patient(adressesPatient[msg.sender]);
        p.setupRole_Doctor(msg.sender,_doctor);
        emit GetRole("Doctor", _doctor);
    }

    function anualRole(address _doctor) external
    {
        require(msg.sender != _doctor, "You can not be a doctor and nothing anual!");
        Patient p = Patient(adressesPatient[msg.sender]);
        p.revokeRole_Doctor(msg.sender,_doctor);
    }

    fallback() external 
    {
        emit Log("fallback", msg.sender, msg.data);
    }
}
