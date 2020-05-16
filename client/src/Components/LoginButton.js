import store from '../Store';

class LoginButton extends HTMLElement {
  connectedCallback() {
    console.log('dupa');

    this.render();
    this.querySelector('div').addEventListener('click', () => this.openModal());
  }

  openModal() {
    const content = this.modalContent;
    store.modal.next({ type: 'OPEN', content });
  }

  toggleDisplay() {
    this.isLoginOpen = !this.isLoginOpen;
    this.render();
  }
  render() {
    this.innerHTML = `
    <div class="ui big button beginButton">
      <i class="user icon"></i>
      Login or Sign Up
    </div>`;
  }

  get modalContent() {
    return `
    <div class="ui tiny modal">
      <app-loginorregister class="content"></<app-loginorregister>
    </div>`;
  }
}

export default LoginButton;
