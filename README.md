# Last Update : 24/8/24
# Endpoints 

get all GovernenceIds on Solana

https://realmtvl-4g6gp1ykn-mubarizs-projects-34801bc9.vercel.app/api/getprogramid?html=true

get all data regarding a Governece Id incluing TVL

https://realmtvl-4g6gp1ykn-mubarizs-projects-34801bc9.vercel.app/api/getrealms/GovER5Lthms3bLBqWub97yVrMmEogzX7xNjdXpPPCVZw?html=true

for use of these endpoints in application skip 

```
?html=true
```
# Updating Data

This repo wll be updated monthly, however if you want to update by yourself:


```console
npm install fs path url axios sleep  solana/web3.js
```
```console
 ts-node index.ts update programid
```
It will take around 10-22 minutes for uodating all data depending upon your network speed
```console
ts-node index.ts update realms
```
