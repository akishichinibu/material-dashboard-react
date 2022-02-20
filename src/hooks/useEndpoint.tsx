import { connect, QBittorrentApiEndpoint } from "qbittorrent-api-v2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

let ENDPOINT: QBittorrentApiEndpoint | null = null;


export const getEndpoint = async () => {
  if (ENDPOINT === null) {
    replaceEndpoint(await connect("", "", ""));
  }
  return ENDPOINT;
}


export const replaceEndpoint = (endpoint: QBittorrentApiEndpoint) => {
  ENDPOINT = endpoint;
}


export function useEndpoint(userName: string, password: string) {
  const [endpoint, setEndpoint] = useState<QBittorrentApiEndpoint>(ENDPOINT);
  const [version, setVersion] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (endpoint !== null) {
      return;
    }

    connect("", userName, password)
      .then((e) => {
        console.log("HERE!!2", e);
        setEndpoint(e);
        ENDPOINT = e;
      })
      .catch((error) => {
        if (error instanceof Error) {
          const msg = error.message;

          if (msg.startsWith("Login failed with username")) {
            navigate("/authentication/login");
          } else {
            console.error(msg);
          }

        } else {
          throw error;
        }
      })
  }, [userName, password]);

  // useEffect(() => {
  //   setInterval(() => {
  //     // TODO: check if session is still valid
  //   }, 1000);
  // }, []);

  return {
    endpoint,
  }
}
