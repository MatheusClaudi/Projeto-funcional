import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public options = [
    { label: 'Descrição', value: '/description' },
    { label: 'Listagem de commits', value: '/table' },
    { label: 'Desempenho de desenvolvedores', value: '/ranking' },
    { label: 'Árvore de evolução de commits', value: '/graph' },
    { label: 'Correlação de features', value: '/feature' }
  ];

  indexOfSelectedOption = 0;
  isSelectorOpen = true;

  constructor(
    private router: Router
  ) {
      this.router.events.subscribe(
        (event) => {
          if(event instanceof NavigationStart) {
            const index = this.options.findIndex(e => e.value === event.url)
            this.indexOfSelectedOption = index != -1 ? index : 0
          }
        });
  }

  ngOnInit(): void {}

  selectOption(index: number) {
    this.indexOfSelectedOption = index
    this.router.navigate([this.options[index].value])
  }

  toogleSelector() {
    this.isSelectorOpen = !this.isSelectorOpen
  }
}
