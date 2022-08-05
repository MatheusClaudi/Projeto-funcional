import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Utils  from '../../_util/util'


@Component({
  selector: 'app-quantidade-commits',
  templateUrl: './quantidade-commits.component.html',
  styleUrls: ['./quantidade-commits.component.css']
})
export class QuantidadeCommitsComponent implements OnInit {
  title = 'proj-func';
  count_names: any[] = [];
  
  constructor(private http : HttpClient) {}

  ngOnInit(): void {
  }
  
  fazRequisicao(){
    console.log('entrou aqui')
    this.http.get('https://gist.githubusercontent.com/henriqueln7/10d29b6a76e0d05f808d533877e9290a/raw/5d193c2288c14b688d99acae454be33fac09f701/list_commits.json')
           .subscribe((resultado : any)  => {
            resultado = resultado.map((x : any) => x.commit.author);
            let authors = Utils.groupBy<any>(resultado,'name');
            let counts = authors.map((x : any) => {
              let name : string = Object.keys(x)[0];
              return [x[name].length,name];
            })
            counts = counts.sort((x,y) => y[0] - x[0]);
            this.count_names = counts;
           });
    
  }

}
