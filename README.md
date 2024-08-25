# Last Update : 24/8/24
# Endpoints 

get all GovernenceIds on Solana

https://realmtvl-707gj9lxk-mubarizs-projects-34801bc9.vercel.app/api/getprogramid?html=true

get all data regarding a Governece Id incluing TVL

https://realmtvl-c35tlnn5c-mubarizs-projects-34801bc9.vercel.app/api/getrealms/GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw?html=true

for use of these endpoints in application skip 

```
?html=true
```
# Updating Data

This repo wll be updated monthly however if you want to update by yourself:

Set up your mainnet solana_rpc in .env file
```console
REALMS_DATA=mainnet-beta.json
SOLANA_RPC=YOUR_SOLANA_RPC
```
then run:

```console
npm install fs path url axios sleep governance-idl-sdk solana/web3.js
```
```console
 ts-node index.ts update programid
```
```console
ts-node index.ts update realms
```
