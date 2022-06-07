import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { hasEthereum, requestAccount } from '../utils/ethereum'
import Minter from '../src/artifacts/contracts/Minter.sol/Minter.json'
import StakingSystem  from '../src/artifacts/contracts/StakingSystem.sol/StakingSystem.json'
import { BaseProvider } from '@ethersproject/providers'

export default function YourNFTs() {
    // UI state
    const [nfts, setNfts] = useState([])

    useEffect( function() {
        getNftsOfCurrentWallet()
    });

    // Get NFTs owned by current wallet
    async function getNftsOfCurrentWallet() {
        if(! hasEthereum()) return

        try {
            // Fetch data from contract
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            const contract = new ethers.Contract(process.env.NEXT_PUBLIC_MINTER_ADDRESS, Minter.abi, provider)
            const address = await signer.getAddress()
            // Get amount of tokens owned by this address
            const tokensOwned = await contract.balanceOf(address)
            
            // For each token owned, get the tokenId
            const tokenIds = []

            for(let i = 0; i < tokensOwned; i++) {
                const tokenId = await contract.tokenOfOwnerByIndex(address, i)
                tokenIds.push(tokenId.toString())
            }
  
            setNfts(tokenIds)
          } catch(error) {
              console.log(error)
          }
    }

    if(nfts.length < 1) return null;

    
    // Get NFTs owned by current wallet
    async function staking_call( tokenId, bool_data) {
      if(! hasEthereum()) return

      try {
          // Fetch data from contract
          const new_provider = new ethers.providers.Web3Provider(window.ethereum)
          const new_signer = new_provider.getSigner()
          const new_contract = new ethers.Contract(process.env.NEXT_PUBLIC_StakingSystem_ADDRESS, StakingSystemr.abi, new_provider)
          const new_address = await new_signer.getAddress()
          // Get amount of tokens owned by this address

          if(bool_data == "yes"){
            const staking_yes = await new_contract.stake( process.env.NEXT_PUBLIC_StakingSystem_ADDRESS, tokenId)
          }else{
            const staking_yes = await new_contract.unstake( process.env.NEXT_PUBLIC_StakingSystem_ADDRESS, tokenId)
          }
        } catch(error) {
            console.log(error)
        }
     }
    

    const nftStaking = nft => {
      console.log(nft);
    }

    const nftUnstaking = nft => {
      console.log(nft);
    }

    return (
        <>
            <h2 className="text-2xl font-semibold mb-2" style ={{padding:"10px 55px"}}>Your NFTs</h2>
            <ul className="grid grid-cols-4 gap-6" id="nfts_id" style={{padding:"50px"}}>
                { nfts.map( (nft) => 
                  <div key={nft} >
                    <div className="bg-gray-100 p-4 h-24 lg:h-28 flex justify-center items-center text-lg">
                        {nft}
                    </div>
                    <div className ="" style = {{ padding :'10px 100px'}}>
                      <button  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-5" onClick={() => {
                        nftStaking(nft);
                      }} >yes</button>
                      <button  className="bg-green-600 hover:bg-blue-700 text-white py-4 px-5" onClick={() => {
                        nftUnstaking(nft);
                      }}>no</button>
                    </div>
                  </div>
                )}
            </ul>
        </>
    )
}