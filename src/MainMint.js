import { useState } from "react";
import { ethers, BigNumber } from 'ethers';
import {Box, Button, Flex, Input, Text} from '@chakra-ui/react';
import RoboPunkNFT from './RoboPunkNFT.json';

const roboPunkNFTAddress = "0x5c4B8724c1c3c0270182814E07453DD6b5217458";

const MainMint = ({ accounts, setAccounts}) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunkNFTAddress,
                RoboPunkNFT.abi,
                signer
            );

            try{
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value: ethers.utils.parseEther((0.02 * mintAmount).toString()),
                });
                console.log('response: ', response);
            } catch(err){
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount + 1);
    };

    return(
        <Flex justify="center" align= "center" height="100vh" paddingBottom="180px">
            <Box width="520px">
             <div>   
            <Text fontSize="50px" textShadow="0 5px #000000">RoboPunks</Text>
            <Text fontSize="48px" 
             letterSpacing="-5.3px"
             fontFamily="VT323"
             textShadow="0 4px #000000">
                It's 2078. Can the RoboPunks NFT save humans from 
                destructive rampant NFT speculation? Mint Robopunks to find out.</Text>
            </div>    
            {isConnected ?(
                <div>
                    <Flex align="center" justify="center">
                        <Button 
                         backgroundColor="#D6517D"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #0F0F0F"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         onClick={handleDecrement}
                         >-</Button>

                        <Input 
                         readOnly
                         fontFamily="inherit"
                         width="100px"
                         height="40px"
                         textAlign="center"
                         paddingLeft="19px"
                         marginTop="10px"
                         type="number" value={mintAmount}/>


                        <Button 
                         backgroundColor="#D6517D"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #0F0F0F"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         onClick={handleIncrement}
                         >+</Button>
                    </Flex>
                    <Button 
                         backgroundColor="#D6517D"
                         borderRadius="5px"
                         boxShadow="0px 2px 2px 1px #0F0F0F"
                         color="white"
                         cursor="pointer"
                         fontFamily="inherit"
                         padding="15px"
                         margin="0 15px"
                         onClick={handleMint}>Mint Now</Button>
                </div>
            ) :(
                <Text
                marginTop="70px" 
                fontSize="30px" 
                letterSpacing="-5.5px"
                fontFamily="VT323"
                textShadow="0 5px #000000"
                color="#D6517D"
                >
                 You must be Connected to Mint
                </Text>
            )}
            </Box>
        </Flex>
    );
};
export default MainMint;