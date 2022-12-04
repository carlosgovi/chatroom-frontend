import { Router } from "@vaadin/router";
import { state } from "../state";
export class Home extends HTMLElement {
  connectedCallback() {
    this.render();
    const form = document.querySelector(".form");
    form?.addEventListener("submit", (e: any) => {
      e.preventDefault();
      console.log("Usuario inicio con :::" + e.target.nombre.value + ":::");
      state.setNombre(e.target.nombre.value);
      console.log("desde el state::", state.getState());

      Router.go("/chat");
    });
  }
  render() {
    this.innerHTML = `
    <form class="form">
    <div>
    <label>Tu nombre:</label>
    </div>
    <input type="text" name="nombre" />
    
    <button type="submin" >Comenzar</button>
    
    
    </form>`;
  }
}
customElements.define("home-page", Home);
