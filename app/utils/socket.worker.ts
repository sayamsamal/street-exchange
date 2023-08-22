"use client";

import { YAHOO_WS } from "./constants";
import yfinance from "./yfinance";

let ws: WebSocket = new WebSocket(YAHOO_WS);

interface websocketMessages {
  type: string;
  symbolList: string[];
}

onmessage = (event: MessageEvent<websocketMessages>) => {
  if (event.data.type == "subscribe") {
    subscribe(event.data.symbolList);
  }
};

const subscribe = (symbolList: string[]) => {
  if (!ws) {
    ws = new WebSocket(YAHOO_WS);
  }

  ws.onopen = () => {
    console.log("Websocket: OPEN.");
    ws.send(
      JSON.stringify({
        subscribe: symbolList,
      })
    );
  };

  ws.onclose = () => {
    console.log("Websocket: CLOSED.");
    console.log("Websocket: RECONNECTING...");
    subscribe(symbolList);
  };

  ws.onmessage = (message: MessageEvent) => {
    const msg_buffer = Buffer.from(message.data, "base64");
    const verify = yfinance.PricingData.verify(msg_buffer);
    if (verify) {
      throw new Error(verify);
    }
    const proto_decoded = yfinance.PricingData.decode(
      Buffer.from(message.data, "base64")
    );
    postMessage(proto_decoded);
  };

  ws.onerror = (error: Event) => {
    console.error(error);
    ws.close();
  };
};
