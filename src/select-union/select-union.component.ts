import {Component, Inject} from '@angular/core';
import {AuthenticationService} from '../_services/authentication.service';
import {Union, UnionMap, UNIONS_TOKEN} from '../_constants/unions';

@Component({
  selector: 'app-select-union',
  templateUrl: './select-union.component.html',
  styleUrls: ['./select-union.component.scss']
})
export class SelectUnionComponent {
  public unions: Union[] = Object.values(this.unionsMap);

  constructor(
    private authenticationService: AuthenticationService,
    @Inject(UNIONS_TOKEN) private unionsMap: UnionMap,
  ) {
  }

  logout() {
    this.authenticationService.logout();
  }

  redirectToUnion(unionKey: string) {
    this.authenticationService.redirectToUnion(this.unionsMap[unionKey]);
  }
}
