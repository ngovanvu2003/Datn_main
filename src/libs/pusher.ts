import PusherClient from "pusher-js";

export const pusher = new PusherClient(import.meta.env.VITE_PUSHER_APP_KEY, {
  cluster: "ap1",
  forceTLS: true,
});
