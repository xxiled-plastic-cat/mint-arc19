import * as dotenv from "dotenv";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import pinataSDK from "@pinata/sdk";
import algosdk from "algosdk";
import type { Metadata } from "./types";
import { CID, CIDVersion } from "multiformats/cid";

import { decodeAddress } from 'algosdk'
import * as mfsha2 from 'multiformats/hashes/sha2'
import * as digest from 'multiformats/hashes/digest'
export const ARC3_NAME_SUFFIX = '@arc3'
export const ARC3_URL_SUFFIX = '#arc3'
export const METADATA_FILE = 'metadata.json'
export const JSON_TYPE = 'application/json'
const proxy_path = 'https://algogator.mypinata.cloud/ipfs/';
import axios from "axios";

dotenv.config();

const basePath = process.cwd() + "/src/imagefiles/";
const mintNumber = 400;
const pinata = pinataSDK(
  process.env.PINATA_API_KEY as string,
  process.env.PINATA_SECRET_KEY as string
);

const algodClient = new algosdk.Algodv2(
  process.env.ALGOD_TOKEN as string,
  process.env.ALGOD_SERVER,
  process.env.ALGOD_PORT
);

  const occupations =  [
    "Knight",
    "Conductor",
    "Conductor",
    "Astronaut",
    "Cowboy",
    "Astronaut",
    "Civilian",
    "Astronaut",
    "Astronaut",
    "Civilian",
    "Civilian",
    "Astronaut",
    "Doctor",
    "Doctor",
    "Civilian",
    "Civilian",
    "Astronaut",
    "Astronaut",
    "Doctor",
    "Civilian",
    "Cowboy",
    "Astronaut",
    "Civilian",
    "Conductor",
    "Captain",
    "Civilian",
    "Knight",
    "Firefighter",
    "Civilian",
    "Civilian",
    "Android",
    "Civilian",
    "Doctor",
    "Doctor",
    "Conductor",
    "Athlete",
    "Conductor",
    "Civilian",
    "Doctor",
    "Knight",
    "Athlete",
    "Captain",
    "Civilian",
    "Civilian",
    "Civilian",
    "Knight",
    "Civilian",
    "Athlete",
    "Doctor",
    "Doctor",
    "Doctor",
    "Civilian",
    "Firefighter",
    "Civilian",
    "Cowboy",
    "Cowboy",
    "Cowboy",
    "Doctor",
    "Doctor",
    "Doctor",
    "Knight",
    "Doctor",
    "Civilian",
    "Cowboy",
    "Athlete",
    "Knight",
    "Knight",
    "Civilian",
    "Captain",
    "Cowboy",
    "Astronaut",
    "Civilian",
    "Doctor",
    "Doctor",
    "Civilian",
    "Athlete",
    "Astronaut",
    "Civilian",
    "Civilian",
    "Civilian",
    "Body Builder",
    "Civilian",
    "Cowboy",
    "Knight",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Captain",
    "Captain",
    "Knight",
    "Doctor",
    "Firefighter",
    "Athlete",
    "Cowboy",
    "Knight",
    "Civilian",
    "Astronaut",
    "Captain",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Cowboy",
    "Athlete",
    "Android",
    "Knight",
    "Athlete",
    "Civilian",
    "Civilian",
    "Cowboy",
    "Civilian",
    "Knight",
    "Civilian",
    "Athlete",
    "Doctor",
    "Athlete",
    "Athlete",
    "Civilian",
    "Civilian",
    "Knight",
    "Doctor",
    "Civilian",
    "Civilian",
    "Doctor",
    "Civilian",
    "Cowboy",
    "Civilian",
    "Doctor",
    "Knight",
    "Android",
    "Civilian",
    "Civilian",
    "Civilian",
    "Astronaut",
    "Knight",
    "Civilian",
    "Captain",
    "Captain",
    "Civilian",
    "Knight",
    "Knight",
    "Astronaut",
    "Captain",
    "Civilian",
    "Civilian",
    "Knight",
    "Civilian",
    "Captain",
    "Civilian",
    "Android",
    "Captain",
    "Firefighter",
    "Knight",
    "Body Builder",
    "Civilian",
    "Body Builder",
    "Athlete",
    "Civilian",
    "Astronaut",
    "Android",
    "Civilian",
    "Civilian",
    "Firefighter",
    "Captain",
    "Athlete",
    "Knight",
    "Body Builder",
    "Firefighter",
    "Captain",
    "Civilian",
    "Doctor",
    "Captain",
    "Civilian",
    "Civilian",
    "Doctor",
    "Captain",
    "Knight",
    "Civilian",
    "Astronaut",
    "Civilian",
    "Civilian",
    "Civilian",
    "Android",
    "Knight",
    "Civilian",
    "Doctor",
    "Civilian",
    "Body Builder",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Athlete",
    "Civilian",
    "King",
    "Astronaut",
    "Civilian",
    "Civilian",
    "Body Builder",
    "Knight",
    "Knight",
    "Firefighter",
    "Captain",
    "Firefighter",
    "Civilian",
    "Civilian",
    "Doctor",
    "Civilian",
    "Android",
    "Captain",
    "Firefighter",
    "Queen",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Astronaut",
    "Body Builder",
    "Captain",
    "Captain",
    "Civilian",
    "Doctor",
    "King",
    "Android",
    "Body Builder",
    "Firefighter",
    "Astronaut",
    "Cowboy",
    "Firefighter",
    "Astronaut",
    "Knight",
    "Athlete",
    "Civilian",
    "Firefighter",
    "Captain",
    "Firefighter",
    "Cowboy",
    "Civilian",
    "Civilian",
    "Firefighter",
    "Athlete",
    "Knight",
    "Body Builder",
    "Doctor",
    "Doctor",
    "Civilian",
    "Firefighter",
    "King",
    "Doctor",
    "Firefighter",
    "Knight",
    "Body Builder",
    "Firefighter",
    "Knight",
    "Body Builder",
    "Queen",
    "Captain",
    "Civilian",
    "Firefighter",
    "Queen",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "King",
    "Doctor",
    "Knight",
    "Civilian",
    "Civilian",
    "Body Builder",
    "Athlete",
    "Knight",
    "Athlete",
    "Doctor",
    "Firefighter",
    "Queen",
    "Body Builder",
    "Captain",
    "Astronaut",
    "Captain",
    "Civilian",
    "Civilian",
    "Athlete",
    "Doctor",
    "Captain",
    "Doctor",
    "Civilian",
    "Queen",
    "Astronaut",
    "Knight",
    "Civilian",
    "Civilian",
    "Civilian",
    "Doctor",
    "Captain",
    "Civilian",
    "Civilian",
    "Knight",
    "Civilian",
    "King",
    "Knight",
    "Civilian",
    "Doctor",
    "Astronaut",
    "King",
    "Firefighter",
    "Body Builder",
    "Civilian",
    "Knight",
    "Civilian",
    "Captain",
    "Captain",
    "Civilian",
    "Civilian",
    "Captain",
    "Civilian",
    "Firefighter",
    "Civilian",
    "Civilian",
    "Civilian",
    "Civilian",
    "Captain",
    "Android",
    "Civilian",
    "Captain",
    "Civilian",
    "Captain",
    "Athlete",
    "Civilian",
    "King",
    "Civilian",
    "Android",
    "Athlete",
    "Captain",
    "Athlete",
    "Doctor",
    "Knight",
    "Civilian",
    "Firefighter",
    "Civilian",
    "Queen",
    "Civilian",
    "Knight",
    "Civilian",
    "Knight",
    "King",
    "Firefighter",
    "Civilian",
    "Civilian",
    "Queen",
    "Queen",
    "Captain",
    "Astronaut",
    "Queen",
    "Knight",
    "Civilian",
    "Firefighter",
    "King",
    "Queen",
    "Athlete",
    "Firefighter",
    "Knight",
    "Knight",
    "Civilian",
    "Knight",
    "Captain",
    "Astronaut",
    "Athlete",
    "Civilian",
    "Knight",
    "Knight",
    "Athlete",
    "Civilian",
    "Doctor",
    "Astronaut",
    "Android",
    "Body Builder",
    "Captain",
    "Doctor",
    "Athlete",
    "Doctor",
    "Doctor",
    "Doctor",
    "Civilian",
    "Knight",
    "Civilian",
    "Android",
    "Doctor",
    "Firefighter",
    "Civilian",
    "Civilian",
    "Captain",
    "Civilian",
    "Athlete",
    "Knight",
    "Civilian",
    "Android"
  ]


  export async function update(assetId: number, claimedByAddress: string) {
    //get asset info from indexer
    let { data } = await axios.get(`https://mainnet-idx.algonode.cloud/v2/assets/${assetId}?include-all=true`);
    let metadata: Metadata = await getARC19Data(data);
    const assetInfo = data['asset'];
    //get metadata object
    
    // Pin metadata JSON to IPFS and get CID
    let metadataCID = "";
    let url = "";
    let reserveAddress = "";

    metadata.properties.membershipClaimed = "true";
    metadata.properties.claimedBy = claimedByAddress

    try {
      const response = await pinata.pinJSONToIPFS(metadata, {
        pinataOptions: {
          cidVersion: 1,
        },
      });

      metadataCID = response.IpfsHash;
    } catch (error) {
      console.error("error pinning metadata to IPFS", error);
    }

    // Decode the metadata CID to derive the Reserve Address and URL
    const decodedCID = CID.parse(metadataCID);

    // Derive the Reserve Address
    reserveAddress = algosdk.encodeAddress(
      Uint8Array.from(Buffer.from(decodedCID.multihash.digest))
    );

    // Derive the URL
    const getCodec = (code: number) => {
      // As per multiformats table
      // https://github.com/multiformats/multicodec/blob/master/table.csv#L9
      switch (code.toString(16)) {
        case "55":
          return "raw";
        case "70":
          return "dag-pb";
      }
    };

    const version = decodedCID.version;
    const code = decodedCID.code;
    const codec = getCodec(code);

    url = `template-ipfs://{ipfscid:${version}:${codec}:reserve:sha2-256}`;

    // Mint the NFT!
    const MNEMONIC = process.env.MNEMONIC as string;
    const { addr: ADDRESS, sk: SECRET_KEY } =
      algosdk.mnemonicToSecretKey(MNEMONIC);

    //hash, upload an send acfg txn
    try {
      const suggestedParams = await algodClient.getTransactionParams().do();

      const transaction =
        algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject({ 
          from: ADDRESS,
          assetIndex: assetId,
          reserve: reserveAddress,
          suggestedParams,
          strictEmptyAddressChecking: false
        });

      const signedTransaction = transaction.signTxn(SECRET_KEY);
      const transactionId = transaction.txID().toString();

      await algodClient.sendRawTransaction(signedTransaction).do();

      const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        transactionId,
        4
      );
    } catch (error) {
      console.error("error updating NFT", error);
    }

  }

export default async function mint() {
  console.log("Minting...");

  for (var i = 47; i < mintNumber; i++) {
    
    let index = i + 1;
    let imageSrc = `Gator (${index}).png`
    console.log(`Minting Gator (${index}) of ${mintNumber}`);
    const imagePath = path.join(basePath, imageSrc);
    const imageBuffer = fs.readFileSync(imagePath);

    let imageChecksum = "";
    let imageCID = "";
    let metadataCID = "";
    let url = "";
    let reserveAddress = "";

    // Get sha-256 checksum of image
    imageChecksum = crypto
      .createHash("sha256")
      .update(imageBuffer)
      .digest("base64");

    // Pin image to IPFS and get CID
    const readableStreamForImage = fs.createReadStream(imagePath);

    try {
      const response = await pinata.pinFileToIPFS(readableStreamForImage, {
        pinataOptions: {
          cidVersion: 1,
        },
      });

      imageCID = response.IpfsHash;
    } catch (error) {
      console.error("error pinning image to IPFS", error);
    }

    // Pin metadata JSON to IPFS and get CID
    const metadata: Metadata = {
      name: `The Algogators #${index}`,
      description: "One of 400 rare Algogators that hold lifetime memberships to Algogator Premium.",
      image: "ipfs://" + imageCID,
      image_integrity: "sha256-" + imageChecksum,
      image_mimetype: "image/png",
      external_url:
        "https://algogator.finance",
      properties: {
        occupation: occupations[i],
        membershipClaimed: "false",
        claimedBy: "None"
      },
    };

    try {
      const response = await pinata.pinJSONToIPFS(metadata, {
        pinataOptions: {
          cidVersion: 1,
        },
      });

      metadataCID = response.IpfsHash;
    } catch (error) {
      console.error("error pinning metadata to IPFS", error);
    }

    // Decode the metadata CID to derive the Reserve Address and URL
    const decodedCID = CID.parse(metadataCID);

    // Derive the Reserve Address
    reserveAddress = algosdk.encodeAddress(
      Uint8Array.from(Buffer.from(decodedCID.multihash.digest))
    );

    // Derive the URL
    const getCodec = (code: number) => {
      // As per multiformats table
      // https://github.com/multiformats/multicodec/blob/master/table.csv#L9
      switch (code.toString(16)) {
        case "55":
          return "raw";
        case "70":
          return "dag-pb";
      }
    };

    const version = decodedCID.version;
    const code = decodedCID.code;
    const codec = getCodec(code);

    url = `template-ipfs://{ipfscid:${version}:${codec}:reserve:sha2-256}`;

    // Mint the NFT!
    const MNEMONIC = process.env.MNEMONIC as string;
    const { addr: ADDRESS, sk: SECRET_KEY } =
      algosdk.mnemonicToSecretKey(MNEMONIC);

    try {
      const suggestedParams = await algodClient.getTransactionParams().do();

      const transaction =
        algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
          from: ADDRESS,
          assetName: `The Algogators #${index} `,
          unitName: "TAG",
          assetURL: url,
          manager: ADDRESS, // It's important to set the manager to the creator so that the NFT metadata can be updated
          reserve: reserveAddress,
          decimals: 0,
          total: 1,
          suggestedParams,
          defaultFrozen: false,
        });

      const signedTransaction = transaction.signTxn(SECRET_KEY);
      const transactionId = transaction.txID().toString();

      await algodClient.sendRawTransaction(signedTransaction).do();

      const confirmedTxn = await algosdk.waitForConfirmation(
        algodClient,
        transactionId,
        4
      );

      console.log("Succesfully minted!");
      console.log("\n");
      console.log("Asset ID:", confirmedTxn["asset-index"]);
      console.log("URL:", url);
      console.log("Reserve Address:", reserveAddress);
      console.log("Metadata CID:", metadataCID);
      console.log("Image CID:", imageCID);
      console.log("\n");
      console.log(
        "View your NFT at: ",
        "https://arc3.xyz/nft/" + confirmedTxn["asset-index"]
      );
      console.log("\n");
    } catch (error) {
      console.error("error minting NFT", error);
    }
  }
}

const getARC19Data = async (nft: any) => {

  let ipfs_proxy = nft['params']['url'];
  let arc19url = resolveProtocol(ipfs_proxy, nft['params']['reserve'])
  const response = await axios.get(arc19url);
  let arc3Data = await response.data;
  return arc3Data;
}

function resolveProtocol(url: string, reserveAddr: string) {

  if (url.endsWith(ARC3_URL_SUFFIX))
      url = url.slice(0, url.length - ARC3_URL_SUFFIX.length)

  let chunks = url.split('://')
  // Check if prefix is template-ipfs and if {ipfscid:..} is where CID would normally be
  if (chunks[0] === 'template-ipfs' && chunks[1].startsWith('{ipfscid:')) {
      // Look for something like: template:ipfs://{ipfscid:1:raw:reserve:sha2-256} and parse into components
      chunks[0] = 'ipfs'
      const cidComponents = chunks[1].split(':')
      if (cidComponents.length !== 5) {
          // give up
          console.log('unknown ipfscid format')
          return url
      }
      const [, cidVersion, cidCodec, asaField, cidHash] = cidComponents

      // const cidVersionInt = parseInt(cidVersion) as CIDVersion
      if (cidHash.split('}')[0] !== 'sha2-256') {
          console.log('unsupported hash:', cidHash)
          return url
      }
      if (cidCodec !== 'raw' && cidCodec !== 'dag-pb') {
          console.log('unsupported codec:', cidCodec)
          return url
      }
      if (asaField !== 'reserve') {
          console.log('unsupported asa field:', asaField)
          return url
      }
      let cidCodecCode
      if (cidCodec === 'raw') {
          cidCodecCode = 0x55
      } else if (cidCodec === 'dag-pb') {
          cidCodecCode = 0x70
      }

      //console.log(reserveAddr)
      // get 32 bytes Uint8Array reserve address - treating it as 32-byte sha2-256 hash
      const addr = decodeAddress(reserveAddr)
      const mhdigest = digest.create(mfsha2.sha256.code, addr.publicKey)

      const cid = CID.create( 1, Number(cidCodecCode), mhdigest)
      chunks[1] = cid.toString() + '/' + chunks[1].split('/').slice(1).join('/')
  }

  //Switch on the protocol
  switch (chunks[0]) {
      case 'ipfs': {
          return proxy_path + chunks[1]
      }
      case 'https': //Its already http, just return it
          return url
      // TODO: Future options may include arweave or algorand
  }

  return url
}
