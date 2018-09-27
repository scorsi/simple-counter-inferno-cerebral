import express from "express";
import {renderToString} from "inferno-server";
import {Container} from '@cerebral/inferno';
import {UniversalController} from 'cerebral'
import path from "path";

import App from "../client/components/App";
import controller from "../client/module";

const server = express();
const port = 3001;

server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use("/static", express.static(path.resolve("./dist/client")));

server.get("/", (req, res) => {
  function initialState({state}) {
    state.set('counter', 10);
  }

  const c = UniversalController(controller);
  c.run(initialState, {});
  const appHtml = renderToString(
    <Container controller={c}>
      <App/>
    </Container>
  );
  const stateScript = c.getScript();

  res.send(`
   <!doctype html>
   <html>
       <head>
          ${stateScript}
          <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/purecss@1.0.0/build/pure-min.css">
         <title>My Isomorphic App</title>
       </head>
       <body>
           <div id='root'>${appHtml}</div>
           <script src='./static/bundle.js'></script>
       </body>
   </html>
`);
});
let Server = server.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// Used to restart server by fuseBox
export async function shutdown() {
  Server.close();
  Server = undefined;
}
