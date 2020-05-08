import { fromEvent } from 'rxjs';
import store from '../Store';
class SearchBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.input = this.querySelector('input');
    this.icon = this.querySelector('i');
    store.searchTextInput = fromEvent(this.input, 'input');
    store.forcedSearchText = fromEvent(this.icon, 'click');
  }

  render() {
    this.innerHTML = `
    <div class="ui big icon input four wide column searchBarMain">
        <input type="text" placeholder="Search big...">
        <i class="search icon link"></i>
    </div>`;
  }
}

export default SearchBar;
