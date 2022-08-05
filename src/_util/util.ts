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
}