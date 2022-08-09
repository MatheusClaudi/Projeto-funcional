import * as moment from 'moment';

export default class Utils {
    static returnTitle() { 
        return 'Vazio por enquanto'; 
    }


    static distinct<T extends {[atributo : string | number] : any}>(colecao: T[], atributo: string | number) : T[] {
        if(colecao.length === 0)
            return []
        else {
            const zero = colecao[0];
            const resto = colecao.filter((x : T) => x[atributo] !== zero[atributo]);
            return [zero, ...Utils.distinct(resto,atributo)]
        }
    }
    
    static groupBy<T extends {[atributo : string | number] : any}>(colecao: T[], atributo: string | number) : {}[] {
        if (colecao.length === 0){
            return []
        } else {
            const zero = colecao[0];
            const equal = colecao.filter((x) => x[atributo] === zero[atributo]);
            const different = colecao.filter((x) => x[atributo] !== zero[atributo]);
            let val : string | number = zero[atributo];
            return [{ [val] : equal } , ...Utils.groupBy(different,atributo)]
        }
    }
    
    static orderBy<T extends {[atributo : string | number] : any}>(colecao : T[], atributo : string | number) : T[] | [] {
        if (colecao.length === 0){
            return [];
        } else if (colecao.length == 1) {
            return colecao;
        } else {
            const [head, ...tail] = colecao;
            const left = tail.filter((x) => head[atributo] >= x[atributo] );
            const right = tail.filter((x) => head[atributo] < x[atributo]);
            return [...Utils.orderBy(left,atributo), head, ...Utils.orderBy(right,atributo)]
        }
    }
    
    static fold<T, K>(reducer : any, init : K, array : T[]) : K {
        if (array.length === 0)
            return init;
        const [head, ...tail] = array
        return Utils.fold(reducer,reducer(init,head),tail);
    }
    
    static compose<X,T>(f1 : (...args : any) => X , f2 : (...args: any) => T){
        return (...xs: any[]) => {
            let aux = (...xs1 : any[]) => f1(...xs1);
            let outf2 = f2(...xs);
            return aux(outf2);
        }
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