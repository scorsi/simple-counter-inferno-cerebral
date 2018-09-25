import {hydrate} from "inferno";
import {Container} from '@cerebral/inferno'
import App from "./components/App";

import controller from "./controller";


const wrapper = (
  <Container controller={controller}>
    <App/>
  </Container>
);
hydrate(wrapper, document.getElementById("root"));
