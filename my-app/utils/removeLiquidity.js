import { Contract, providers, utils, BigNumber } from "ethers";
import {
    EXCHANGE_CONTRACT_ABI,
    EXCHANGE_CONTRACT_ADDRESS
} from "../constants";

export const removeLiquidity = async (signer, removeLPTokensWei) => {

    const exchangeContract = new Contract(
        EXCHANGE_CONTRACT_ADDRESS,
        EXCHANGE_CONTRACT_ABI,
        signer
    );
    const tx = await exchangeContract.removeLiquidity(removeLPTokenWei);
    await tx.wait();
};

export const getTokensAfterRemove = async (
    provider,
    removeLPTokenWei,
    _ethBalance,
    crpytoDevTokenReserve
) => {
    try {

        const exchangeContract = new Contract(
            EXCHANGE_CONTRACT_ADDRESS,
            EXCHANGE_CONTRACT_ABI,
            provider
        );

        const _totalSupply = await exchangeContract._totalSupply();

        const _removeEther = _ethBalance.mul(removeLPTokenWei).div(_totalSupply);
        const _removeCD = crpytoDevTokenReserve
            .mul(removeLPTokenWei)
            .div(_totalSupply);
        return {
            _removeEther,
            _removeCD,
        };
    } catch (err) {
        console.error(err);
    }
};