const API_BASE_URL = "http://localhost:3000";
import { rtdb } from "./rtdb";
//utilizo lodash par atratar el objeto que se recibe de la rtdb y pasar el mismo a un array
import map from "lodash/map";
const state = {
  //donde guardo los datos en el state
  data: {
    nombre: "",
    messages: [],
  },

  // escuchador listeners
  listeners: [],
  //Declaro in init metodo q inicializa y se engancha a chatrooms/ general de la RTDB
  init() {
    //referencia para la rtdb
    const chatrooomsRef = rtdb.ref("/chatrooms/general");
    //guarfo en state anterior
    const currentState = this.getState();
    chatrooomsRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      console.log("snapshot  que retorna firebase rtdb::", messagesFromServer);

      const messagesList = map(messagesFromServer.messages);
      currentState.messages = messagesList;
      this.setState(currentState);
      console.log("desde el state::", this.getState());
    });
  },
  ///  tomo los datos
  getState() {
    return this.data;
  },
  ///metodo para setear el nombre
  setNombre(newNombre: string) {
    const currentState = this.getState();
    currentState.nombre = newNombre;
    this.setState(currentState);
  },
  ///pushmessaje esta pensado para q se el mensaje nuevo le llegue al backend
  pushMessaje(NewMessage: string) {
    const nombreDesdeState = state.getState().nombre;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        from: nombreDesdeState,
        message: NewMessage,
      }),
    });
  },
  /// seteo los datos pisando los anteriores
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
  ///manejador del state
  subscribe(callbacks: (any) => { any }) {
    this.listeners.push(callbacks);
  },
};

export { state };
