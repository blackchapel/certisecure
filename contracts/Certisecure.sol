// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertiSecure {

    uint public cCount = 0;

    struct Certificate {
        uint id;
        string uid;
        string url;
        address issuer;
        bool isValid;
    }

    Certificate[] certificates;

    event generatedCertificate(string uid);

    function issueCertificate(string memory _url) external {
        require(bytes(_url).length > 0);
        string memory uid = "s27ghdb2648nd";
        certificates.push(Certificate(cCount, uid, _url, msg.sender, true));
        cCount++;
        emit generatedCertificate(uid);
    }
}