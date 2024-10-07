import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./Login.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";
import Profile from "./Profile.tsx";
import { Route, Router } from "wouter";
import Menu from "./Menu.tsx";
import Transcript from "./Transcript.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Router>
                <div className="flex flex-col justify-center items-center h-[100vh] w-[100vw] text-white">
                    <div className="p-4 bg-neutral-800 rounded-lg flex flex-col min-w-96 min-h-1/4 max-h-[80vh] overflow-y-scroll">
                        <Route path="/" component={App} />
                        <Route path="/menu" component={Menu} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/transcript" component={Transcript} />
                    </div>
                </div>
            </Router>
        </QueryClientProvider>
    </StrictMode>
);
