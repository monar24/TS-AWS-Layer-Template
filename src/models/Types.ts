export interface Secrets {
    [key: string]: string;
}

export enum RequestType {
    Create = "CREATE",
    Send = "SEND",
    Deploy = "DEPLOY"
}

export enum TokenType {
    ERC20 = "erc_20",
    ERC721 = "erc_721"
}

export enum Web2EventType {
    BatchCreated = "batches.created",
    NFTCreated = "nfts.created",
    AirdropInvoke = "swapContract.airdropInvoke",
    SwapInvoke = "swapContract.swapInvoke"
}

export enum Web2EventActionType {
    Swap = "swap",
    MintTo = "mint_to",
    Burn = "burn"
}

export enum PredefinedMethod {
    CreateMerkleTree = "createMerkleTree",
    CreateMetadataAccount = "createMetadataAccount",
    MintCNFT = "mintCNFT",
    TransferCNFT = "transferCNFT",
    UpdateCNFT = "mintCNFT",
    BurnCNFT = "burnCNFT",
    MintFT = "mintFT",
    TransferFT = "transferFT",
    BurnFT = "burnFT"
}

export enum BatchType {
    Fixed = "FIXED",
    Open = "OPEN"
}