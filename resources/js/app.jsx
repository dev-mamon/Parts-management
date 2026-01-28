import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, usePage } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function FlashMessages({ children }) {
    const { flash } = usePage().props;
    const lastShownFlash = useRef(null);

    useEffect(() => {
        // Trigger only if the flash object has changed (new request)
        if (flash && flash !== lastShownFlash.current) {
            if (flash.success) {
                toast.success(flash.success, { position: "bottom-right" });
            }

            if (flash.error) {
                toast.error(flash.error, { position: "top-center" });
            }

            if (flash.warning) {
                toast(flash.warning, {
                    icon: "⚠️",
                    position: "top-center",
                    duration: 4000,
                });
            }
            
            // Mark this specific flash object as shown
            lastShownFlash.current = flash;
        }
    }, [flash]);

    return (
        <>
            <Toaster />
            {children}
        </>
    );
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx"),
        );

        // This ensures EVERY page is wrapped with FlashMessages, 
        // even if it has its own layout defined.
        const oldLayout = page.default.layout;
        page.default.layout = (p) => {
            const layout = oldLayout ? oldLayout(p) : p;
            return <FlashMessages>{layout}</FlashMessages>;
        };

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(<App {...props} />);
    },
    progress: false 
});
