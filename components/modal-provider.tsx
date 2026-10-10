"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { CheckCircle2, AlertTriangle, Info, X, LoaderCircle } from "lucide-react";
type Notice = {
  title: string;
  message: string;
  type?: "success" | "error" | "warning" | "info" | "loading";
};
type Ctx = {
  notify: (n: Notice) => void;
  confirm: (n: { title: string; message: string }) => Promise<boolean>;
};
const Context = createContext<Ctx>({ notify: () => {}, confirm: async () => false });
export function useModal() {
  return useContext(Context);
}
export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [notice, setNotice] = useState<Notice | null>(null);
  const [ask, setAsk] = useState<{
    title: string;
    message: string;
    resolve: (v: boolean) => void;
  } | null>(null);
  const notify = useCallback((n: Notice) => {
    setNotice(n);
    if (n.type !== "loading") setTimeout(() => setNotice((cur) => (cur === n ? null : cur)), 4200);
  }, []);
  const confirm = useCallback(
    (n: { title: string; message: string }) =>
      new Promise<boolean>((resolve) => setAsk({ ...n, resolve })),
    []
  );
  const Icon =
    notice?.type === "success"
      ? CheckCircle2
      : notice?.type === "warning"
        ? AlertTriangle
        : notice?.type === "loading"
          ? LoaderCircle
          : notice?.type === "error"
            ? AlertTriangle
            : Info;
  return (
    <Context.Provider value={{ notify, confirm }}>
      {children}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-5 z-[100] flex max-w-sm items-start gap-3 rounded-2xl border bg-white p-4 shadow-2xl"
          style={{ borderColor: notice.type === "error" ? "#fecaca" : "#e2e8f0" }}
        >
          <Icon
            size={22}
            className={
              notice.type === "success"
                ? "text-green-600"
                : notice.type === "error"
                  ? "text-red-600"
                  : notice.type === "loading"
                    ? "animate-spin text-amber-600"
                    : "text-amber-600"
            }
          />
          <div className="flex-1">
            <b>{notice.title}</b>
            <p className="mt-1 text-sm text-slate-600">{notice.message}</p>
          </div>
          <button aria-label="إغلاق" onClick={() => setNotice(null)}>
            <X size={17} />
          </button>
        </div>
      )}
      {ask && (
        <div
          className="fixed inset-0 z-[110] grid place-items-center bg-slate-950/50 p-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-3xl bg-white p-6 text-slate-900 shadow-2xl"
          >
            <h2 className="text-xl font-bold">{ask.title}</h2>
            <p className="my-4 text-slate-600">{ask.message}</p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-soft"
                onClick={() => {
                  ask.resolve(false);
                  setAsk(null);
                }}
              >
                إلغاء
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  ask.resolve(true);
                  setAsk(null);
                }}
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </Context.Provider>
  );
}
