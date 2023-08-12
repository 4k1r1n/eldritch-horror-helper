import 'normalize.css';
import './css/colors.css';
import './css/fonts.css';
import './style.css';
import Header from './components/header/header';
import Main from './components/main/main';
import Footer from './components/footer/footer';

class App {
  constructor(root) {
    this.root = root;
    this.header = new Header();
    this.footer = new Footer();
    this.main = new Main();
  }

  start() {
    this.header.render();
    this.main.render();
    this.footer.render();
    this.root.append(this.header.node, this.main.node, this.footer.node);
  }
}

const app = new App(document.body);
app.start();
