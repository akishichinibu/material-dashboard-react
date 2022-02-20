import { bind } from "@react-rxjs/core";

import { BehaviorSubject, concatAll, interval, map, Observable, pipe } from "rxjs";

import { getEndpoint, useEndpoint } from "hooks/useEndpoint";
import { Torrent } from "qbittorrent-api-v2";


const state = new BehaviorSubject({
  settings: {
    refreshInterval: 10000,
  },
});


const torrents$ = state.pipe(
  map(({ settings: { refreshInterval } }) => refreshInterval),
  map((refreshInterval) => {
    return new Observable<Torrent[]>((subscriber) => {
      const doit = () => {
        getEndpoint()
          .then((e) => e.torrents())
          .then((r) => subscriber.next(r));
      }

      doit();
      const timer = setInterval(doit, refreshInterval);

      return () => {
        clearInterval(timer);
      }
    });
  }),
  concatAll(),
);


const [useTorrents, _] = bind(torrents$, [] as Torrent[]);


export {
  useTorrents,
}
