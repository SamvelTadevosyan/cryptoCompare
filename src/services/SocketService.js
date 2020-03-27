// @flow

export const handleReopenSocket = (
  existingSocket: ?WebSocket,
  socketActions: Object = {},
): Promise<WebSocket> => new Promise<WebSocket>((resolve: Function) => {
  let attempt = 0;

  const reopenSocket = (
    socket: ?WebSocket,
    actions: Object = {},
    resolver: Function = resolve,
  ): WebSocket => {
    if (socket && (socket.readyState === socket.OPEN)) {
      socket.onopen = actions.onopen;
      socket.onclose = actions.onclose;
      socket.onerror = actions.onerror;
      socket.onmessage = actions.onmessage;

      resolver(socket);

      attempt = 0;
      return false;
    }

    if (!socket || !socket.url) {
      resolve(null);
      return false;
    }

    attempt++;

    const newSocket = new WebSocket(socket.url);

    newSocket.onopen = () => {
      reopenSocket(newSocket, actions);
    };

    newSocket.onclose = (): void => {
      if (attempt >= 100) {
        resolver(null);
      } else {
        reopenSocket(newSocket, actions);
      }
    };

    return false;
  };

  reopenSocket(existingSocket, socketActions);
});
