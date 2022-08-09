import { ICommit } from "./commit";
import * as moment from 'moment';

export class CommitTableData {
    author: string;
    authorEmail: string;
    commiterEmail: string;
    date: string;
    qtd_comments: number;
    verify: string;

    constructor(data: ICommit) {
       this.author = data.commit.author.name
       this.authorEmail = data.commit.author.email;
       this.commiterEmail = data.commit.committer.email;
       this.date = this.handleDate(data.commit.author.date);
       this.qtd_comments = data.commit.comment_count;
       this.verify = this.handleVerify(data.commit.verification.verified); 
    }

    handleVerify(verify: boolean) {
        return verify ? 'Sim' : 'Não'
    }

    handleDate(date: string) {
        return (moment(date)).format('DD/MM/YYYY')
    }
} 