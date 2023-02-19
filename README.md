<p align='center'><img src='https://user-images.githubusercontent.com/66885378/219825716-33158241-4004-453d-8b5c-e35c9495b8d4.png' width='400'></p>

## CertiSecure - Revolutionizing Certificate Systems with Blockchain-based Digital Certificates.

## Project Structure

- [Frontend - React.js](https://github.com/blackchapel/typer/tree/frontend)
- [Backend - Node.js](https://github.com/blackchapel/typer/tree/backend)

## Overview
The project is a digital certificate management system that utilizes blockchain technology for security and immutability. It allows users to issue, view, and verify digital certificates using a web application. The institution can verify the identity and qualifications of users, iisue and revoke certificates. The system is built using various tools and technologies such as Solidity, IPFS, Truffle, and Celo blockchain, among others. Users can interact with the system using the Metamask wallet and Web3.js. The goal of the project is to provide a decentralized, secure, and easy-to-use platform for managing digital certificates, eliminating the need for paper-based certificates and making the process more efficient and reliable.

## Features
- Users can apply for an e-certificate to the particular institution.
- The institution can verify the application by accepting/rejecting the application along with uploading the corresponding document.
- The issued certificates are stored as smart contracts on the blockchain.
- The serial number and certificates' meta-data are stored on IPFS with Infura.
- Upon approval of the certificate, the user receives the serial number and a QR code.
- Scanning the QR code directs the user to a webpage verifying the validity of the particular issued certificate.
- This certificate of authenticity can be distributed with other institutions as a sharable link.
- The trailing part of the link is the same as the serial number of the issued certificate.

## Features implemented ... but not integrated
- The user receives a certificate of authenticity as a NFT.
- The ownership of the NFT can be transferred between institutions if the user moves institutions.

## Techologies Used
- Web3.js
- IPFS w/ Infura
- Celo Blockchain Network
- NFT
- Solidity
- Truffle
- MetaMask Wallet

## Screenshots
- Landing Page
![landing_page](https://user-images.githubusercontent.com/66885378/219833159-86dd9af0-91f8-40b9-a0fc-34efdf6c1981.png)
- Login Page
![login](https://user-images.githubusercontent.com/66885378/219833215-e93142c0-caa8-471a-b0f3-0e20876c0065.png)
- Requested Certificates from the User's Student Account
![status](https://user-images.githubusercontent.com/66885378/219833986-76318b32-cab6-4538-9014-0028a4e6111f.png)
- Connection to MetaMask Wallet
![wallet](https://user-images.githubusercontent.com/66885378/219834051-a8516967-edd6-4f63-8139-c138c7685d7b.png)
- Request on the Instituition Dashboard
![request](https://user-images.githubusercontent.com/66885378/219936889-059385f6-9ad3-4729-b1de-309d255b3a4c.png)
- QR Code available to the Student once Request is Approved
![QR Code and Serial Number](https://user-images.githubusercontent.com/66885378/219937141-0d145702-cb58-4673-b209-ef049a49afe6.png)
- Certificate can be viewed by an Institution on Infura upon Scanning the QR Code 
![Certificate on Infura](https://user-images.githubusercontent.com/66885378/219937146-3177b742-05f4-43e4-8998-9a32cf13b061.png)

## System Architecture
![architecture](https://user-images.githubusercontent.com/66885378/219835662-8977f6b4-19c0-4db7-b1e8-15b6801179fb.png)

## Contributers

- [Krishna - Design/Blockchain](https://github.com/krishna-shetty)
- [Kunal - Blockchain/Backend](https://github.com/blackchapel)
- [Rosita - Frontend](https://github.com/rosita-dmello)
- [Vidhita - Blockchain/Backend](https://github.com/vidhitapai)
