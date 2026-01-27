import "../css/app.css";
import "./bootstrap";

import { createInertiaApp, usePage } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot, hydrateRoot } from "react-dom/client";
import { useEffect, useRef } from "react";
import { toast, Toaster } from "react-hot-toast";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

function FlashMessages({ children }) {
    const { flash, errors } = usePage().props;
    const lastFlash = useRef({ success: null, error: null, warning: null });

    useEffect(() => {
        // server side (Flash Success)
        if (flash?.success && flash.success !== lastFlash.current.success) {
            toast.success(flash.success, { position: "bottom-right" });
            lastFlash.current.success = flash.success;
        }

        // server side (Flash Error)
        if (flash?.error && flash.error !== lastFlash.current.error) {
            toast.error(flash.error, { position: "top-center" });
            lastFlash.current.error = flash.error;
        }

        // server side (Flash Warning)
        if (flash?.warning && flash.warning !== lastFlash.current.warning) {
            toast(flash.warning, {
                icon: "⚠️",
                position: "top-center",
                duration: 4000,
            });
            lastFlash.current.warning = flash.warning;
        }

        // Reset tracking if flash becomes null (e.g. after a full navigation that clears state)
        if (!flash?.success) lastFlash.current.success = null;
        if (!flash?.error) lastFlash.current.error = null;
        if (!flash?.warning) lastFlash.current.warning = null;

    }, [flash, errors]);

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

        page.default.layout =
            page.default.layout ||
            ((page) => <FlashMessages>{page}</FlashMessages>);

        return page;
    },
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            hydrateRoot(el, <App {...props} />);
            return;
        }

        createRoot(el).render(<App {...props} />);
    },
    progress: false,
});
