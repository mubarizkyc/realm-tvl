import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { updateRealmBalances, data_url } from './fetcher';
import * as dotenv from 'dotenv';
dotenv.config();


const localFilePath: string = path.join(__dirname, process.env.REALMS_DATA as string);
const programIdsFilePath: string = path.join(__dirname, 'programId.json');

interface Dao {
    displayName: string;
    programId: string;
    realmId: string;
    SOL_Treasury: string;
    Token_Treasury: string;

}

async function getDaosData(): Promise<Dao[]> {
    console.log('Fetching data...');
    const response = await fetch(data_url);
    const data: Dao[] = await response.json() as Dao[];
    fs.writeFileSync(localFilePath, JSON.stringify(data, null, 2));
    return data;
}

function getProgramIds(data: Dao[]): string[] {
    return [...new Set(data.map(dao => dao.programId))];
}

function writeProgramIds(programIds: string[]): void {
    const output = { programIds };
    fs.writeFileSync(programIdsFilePath, JSON.stringify(output, null, 2));
    console.log('Program IDs saved to programId.json');
}
async function main(args: string[]): Promise<void> {
    if (args.includes('update') && args.includes('programids')) {
        console.log('Updating program IDs...');
        const data = await getDaosData();
        const programIds = getProgramIds(data);
        writeProgramIds(programIds);
    } else if (args.includes('update') && args.includes('realms')) {

        console.log('Updating ...');

        const programIds = JSON.parse(fs.readFileSync(programIdsFilePath, 'utf-8')).programIds;
        for (const programId of programIds) {
            console.log(`Updating ${programId}...`);
            await updateRealmBalances(programId);

        }
    }
}

main(process.argv.slice(2)).catch(error => console.error('Error:', error));