import { ICommitPath } from "./commitPath"

export interface ICommitAccount {
    name: string,
    email: string,
    date: string
}

export interface ICommitVerification {
    payload: string,
    reason: string,
    signature: string,
    verified: boolean
}

export interface ICommitData {
    url: string,
    author: ICommitAccount,
    committer: ICommitAccount,
    message: string,
    tree: ICommitPath,
    comment_count: number,
    verification: ICommitVerification
}