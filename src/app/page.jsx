import ToDo from "@/components/ToDo";
import "/home/niaz/Documents/localstorage-todo-app-nextjs/public/styles/Page.css";
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
