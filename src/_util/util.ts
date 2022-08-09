import * as moment from 'moment';

export default class Utils {
    static returnTitle() { 
        return 'Vazio por enquanto'; 
    }

    static getFieldFromObjectPath(path: string, obj: any) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, obj || self)
    }

    static orderBy2<T extends {[atributo : string | number] : any}>(colecao : T[], atributo : string | number, compare: any) : T[] | [] {
        if (colecao.length === 0){
            return [];
        } else if (colecao.length == 1) {
            return colecao;
        } else {
            const [head, ...tail] = colecao;
            const left = tail.filter((x) => !compare(x[atributo], head[atributo]));
            const right = tail.filter((x) => compare(x[atributo], head[atributo]));
            return [...Utils.orderBy2(left,atributo, compare), head, ...Utils.orderBy2(right,atributo, compare)]
        }
    }

    //  only works to compare string, number and moment.js dates in string format
    static isLeftEqualsRight(left: any, right: any, field: string) {
        switch (field) {
        case "date":
            let ml = moment(left, 'DD/MM/YYYY')
            let mr = moment(right)
            return ml.isSame(mr, 'day') && ml.isSame(mr, 'month') && ml.isSame(mr, 'year');
        case "number":
            return left == right;
        case "string":
            console.log('a')
            return right.toLowerCase().includes(left.toLowerCase());
        default:
            return false;
        }
    }

    //  only works to compare string, number and moment.js dates in string format
    static isLeftBiggerThanRight(left: any, right: any, field: string) {
        switch (field) {
        case "date":
            return Math.abs(moment(left, 'DD/MM/YYYY').diff(moment(right), 'days')) > 0
        case "number":
            return left > right;
        case "string":
            return left.toLowerCase() > right.toLowerCase();
        default:
            return false;
        }
    }
}