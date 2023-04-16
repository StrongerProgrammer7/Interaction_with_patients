//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;


import "./access/Owner.sol"; //Основной автор openZepplin , для этого контракта немного переделанo
import "./access/Roles.sol"; // ~

/*
 *
 *
 *@title Краткие данные о пациенте
 *Имеется массив адресов врачей, 
 *Если массив пуст, значит ни один врач не имеет доступа к пациенту
 *В массиве содержатся адресов врачей, которым предоставлен доступ
 *@author Abdyukov Z.
 *
 *@notice каждый пользователь сначала регистрируется , 
 *
 */

contract Patient is Owner, AccessControl 
{

    /*
     *@notice для получения доступа к пациента нужен адресс врача
     */
    address[] private docs;

    // string[] private linksStorage; //содержит хэш файлов в IPFS

    bytes32 private constant DOCTOR_ROLE = keccak256("DOCTOR_ROLE");

    modifier onlyePatientOrDoctor(address account) 
    {
        require(hasRole(DOCTOR_ROLE, account) ||
                hasRole(DEFAULT_ADMIN_ROLE, account),
            " Caller is not doc or patient!"
        );
        _;
    }

    constructor() Owner(msg.sender) {}

    /*
     *@notice регистрация пациента и получение прав админа
     *
     */
    function register(address _patient) external 
    {
        transferOwnership(_patient);
        setAdmin(_patient);
        _setupRole(DEFAULT_ADMIN_ROLE, _patient);  
    }

     
    /*
     *@notice сохранение ссылки на большие данные о пациенте
    //  */
    // function downloadLinksFile(address _doctor, string memory _fileLinks)
    //     external
    //     onlyRole(DOCTOR_ROLE, _doctor)
    // {
    //     linksStorage.push(_fileLinks);
    // }

      
     /*
     *@return Строку с ссылками
    //  */
    // function _getLinksIPFS() private view returns (string memory) {
    //     string memory links = "IPFS:";
    //     for (uint256 i = 0; i < linksStorage.length; i++) {
    //         bytes memory temp = abi.encodePacked(linksStorage[i], "|");
    //         links = string(abi.encodePacked(links, temp));
    //     }
    //     links = string(abi.encodePacked(links, ";"));
    //     return links;
    // }

    /*
    *@notice Возвращает true or false , в зависимости есть ли доступ у врача
    *@param: _doctor адрес врача, который проверяется
    */
    function isAccess(address _doctor) external view returns(bool)
    {
        for(uint256 i=0;i<docs.length;i++)
        {
            if(docs[i] == _doctor)
                return true;
        }
        return false;
    }

    function setupRole_Doctor(address _patient, address _doctor) external onlyOwner(_patient)
     onlyRole(DEFAULT_ADMIN_ROLE, _patient)
    {
        grantRole(DOCTOR_ROLE, _doctor);

        for(uint256 i=0;i<docs.length;i++)
        {
            if(docs[i] == _doctor)
                return;
        }
        docs.push(_doctor);
    }

    function revokeRole_Doctor(address _patient, address _doctor) external onlyOwner(_patient)
        onlyRole(DEFAULT_ADMIN_ROLE, _patient)
    {
        revokeRole(DOCTOR_ROLE, _doctor);
        int pos = -1;
        for(uint256 i=0;i<docs.length-1;i++)
        {
            if(docs[i] == _doctor)
                pos = int(i);    

            if(pos!=-1)
                docs[i] = docs[i+1];
        }
        docs.pop();
    }
}
