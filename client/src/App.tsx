import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/projects" component={Projects} />
            <Route path="/publications" component={Publications} />
            <Route path="/contact" component={Contact} />
            <Route>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="container mx-auto px-4 py-16 text-center"
              >
                <h1 className="text-4xl font-bold">404: Page Not Found</h1>
                <p className="mt-4">The page you're looking for doesn't exist.</p>
              </motion.div>
            </Route>
          </Switch>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
