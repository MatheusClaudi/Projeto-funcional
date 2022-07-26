import * as moment from 'moment';

export default class Utils {
// Início de funções solicitadas
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
// Fim das funções solicitadas 

    // Função de ordenação modificada para receber um path para acessar valores profundos dentro do objeto e para receber 
    // uma função comparadora para realizar a ordenação.
    static orderBy2<T extends {[atributo : string | number] : any}>(colecao : T[], atributo : string, compare: any, type: string) : T[] | [] {
        if (colecao.length === 0){
            return [];
        } else if (colecao.length == 1) {
            return colecao;
        } else {
            const [head, ...tail] = colecao;
            const ha = this.getFieldFromObjectPath(atributo, head);
            const left = tail.filter((x) => !compare(this.getFieldFromObjectPath(atributo, x), ha, type));
            const right = tail.filter((x) => compare(this.getFieldFromObjectPath(atributo, x), ha, type));
            return [...Utils.orderBy2(left, atributo, compare, type), head, ...Utils.orderBy2(right, atributo, compare, type)]
        }
    }

    // Função de agrupamento modificada para receber um path para acessar valores profundos dentro de um objeto
    static groupBy2<T extends {[atributo : string | number] : any}>(colecao: T[], path: string) : {}[] {
        if (colecao.length === 0){
            return []
        } else {
            const zero = this.getFieldFromObjectPath(path, colecao[0]);
            const equal = colecao.filter((x) => this.getFieldFromObjectPath(path, x) === zero);
            const different = colecao.filter((x) => this.getFieldFromObjectPath(path, x) !== zero);
            let val : string | number = zero;
            return [{ [val] : equal } , ...Utils.groupBy2(different, path)]
        }
    }

    // Função de acesso de valores profundos dentro de um objeto, recebe um path 'a.b.c' com a intenção de retornar
    // o valor de : obj.a.b.c, se existir
    static getFieldFromObjectPath(path: string, obj: any) {
        return path.split('.').reduce(function(prev, curr: string) {
            if (parseInt(curr)) {
                return prev ? prev[parseInt(curr)] : null
            }
            return prev ? prev[curr] : null
        }, obj || self)
    }

    // Função de comparação com o intuito de auxiliar no agrupamento de valores de commit
    // Apenas suporta comparação entre valores de data, número e string
    static isLeftEqualsRight(left: any, right: any, field: string) {
        switch (field) {
        case "date":
            let ml = moment(left, 'DD/MM/YYYY')
            let mr = moment(right, 'DD/MM/YYYY')
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

    // Função de comparação com o intuito de auxiliar na ordenação de valores de commit (Ordem crescente)
    // Apenas suporta comparação entre valores de data, número e string
    static isLeftBiggerThanRight(left: any, right: any, field: string) {
        switch (field) {
        case "date":
            return moment(left, 'DD/MM/YYYY').diff(moment(right, 'DD/MM/YYYY'), 'days') > 0
        case "number":
            return left > right;
        case "string":
            return left.toLowerCase() > right.toLowerCase();
        default:
            return false;
        }
    }

    // Função de comparação com o intuito de auxiliar na ordenação de valores de commit (Ordem decrescente)
    // Apenas suporta comparação entre valores de data, número e string
    static isLeftLowerOrEqualRight(left: any, right: any, field: string) {
        switch (field) {
        case "date":
            return moment(left, 'DD/MM/YYYY').diff(moment(right, 'DD/MM/YYYY'), 'days') <= 0
        case "number":
            return left <= right;
        case "string":
            return left.toLowerCase() <= right.toLowerCase();
        default:
            return false;
        }
    }
}