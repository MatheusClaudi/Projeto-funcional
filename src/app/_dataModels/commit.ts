import { ICommitAccount, ICommitData } from "./commitData"
import { ICommitPath } from "./commitPath"

export interface ICommit {
    author: ICommitAccount,
    comments_url: string,
    commit: ICommitData,
    committer: ICommitAccount,
    html_url: string,
    node_id: string,
    parents: Array<ICommitPath>,
    sha: string,
    url: string
}