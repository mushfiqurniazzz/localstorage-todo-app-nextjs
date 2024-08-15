import dynamic from "next/dynamic";
const ToDo = dynamic(() => import("@/components/ToDo"), { ssr: false });
import "/public/styles/Page.css";
import { Toaster } from "sonner";
export default function Home() {
  return (
    <>
      <Toaster duration={2000} position="top-center" richColors closeButton />
      <div className="body">
        <h1>LocalStorage - To-Do App</h1>
        <ToDo />
      </div>
    </>
  );
}
