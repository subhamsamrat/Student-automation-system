import React, { useEffect, useRef, useState } from "react";


function PayFee_modal({ data }) {
  const dialogRef = useRef(null);
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Close on ESC handled by <dialog>, but ensure backdrop click closes too
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onBackdropClick = (e) => {
      // If user clicked directly on the dialog (backdrop area), close
      if (e.target === dialog) {
        dialog.close();
        resetState();
      }
    };

    dialog.addEventListener("click", onBackdropClick);
    return () => dialog.removeEventListener("click", onBackdropClick);
  }, []);

  function resetState() {
    setPaymentMode("");
    setAmount("");
    setPaymentId("");
    setRemarks("");
    setErrors({});
    setSubmitting(false);
    setSuccess(false);
  }

  const generatePaymentId = () => {
    // More readable ID with timestamp
    const id = `TXN-${Date.now().toString().slice(-8)}-${Math.floor(
      Math.random() * 900 + 100
    )}`;
    setPaymentId(id);
  };

  const validate = () => {
    const err = {};
    if (!paymentMode) err.paymentMode = "Select payment mode";
    if (!amount || Number(amount) <= 0) err.amount = "Enter a valid amount";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setSubmitting(true);

    // Simulate API call / processing
    try {
      await new Promise((r) => setTimeout(r, 700));

      const payload = {
        student: data ?? null,
        paymentMode,
        amount: Number(amount),
        paymentId: paymentId || `TXN-${Date.now()}`,
        remarks,
        timestamp: new Date().toISOString(),
      };

      // Replace this with your real submit logic (API call)
      console.log("PAYMENT SUBMIT", payload);

      // show success state
      setSuccess(true);

      // auto-close after short delay
      setTimeout(() => {
        if (dialogRef.current) dialogRef.current.close();
        resetState();
      }, 1100);
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Something went wrong. Try again." });
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Example open button (you can remove this if you open modal elsewhere) */}

      {/* Dialog uses the exact id you requested */}
      <dialog
        id="payFee_modal"
        ref={dialogRef}
        className="w-full max-w-md rounded-2xl border-0 p-0 bg-transparent mt-20 md:ml-140"
        // style to remove default dialog look in some browsers
      >
        {/* Backdrop + centered card */}
        <div className="relative min-h-[360px] max-h-[85vh] overflow-hidden">
          {/* Card container */}
          <div className="mx-6 my-8 bg-gradient-to-b from-white/70 to-black/50 dark:from-slate-900/80 dark:to-slate-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30  overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/30 dark:border-slate-700">
              <div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Make Payment
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-300">
                  Securely record the payment
                </p>
              </div>

              {/* Close */}
              <button
                onClick={() => {
                  dialogRef.current?.close();
                  resetState();
                }}
                aria-label="Close"
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg hover:bg-slate-200/60 dark:hover:bg-white/6 transition"
                title="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 text-slate-700 dark:text-slate-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="px-6 py-5">
              {/* student info */}
              {data && (
                <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 border border-indigo-100/40">
                  <div className="text-sm text-slate-700 dark:text-slate-200">
                    <div className="font-medium">Name :{data.name}</div>
                    <div className="text-xs text-slate-500">
                      Roll: {data.roll ?? "—"}
                    </div>
                  </div>
                </div>
              )}

              {/* Payment ID and Auto button */}
              <div className="flex gap-3 mb-3">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                    Payment ID
                  </label>
                  <input
                    type="text"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                    placeholder="Transaction / Reference ID (optional)"
                    className="w-full rounded-xl px-4 py-2 text-sm outline-none bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>
              {/* Date */}
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
                Date
              </label>
              <div className="relative mb-3">
                <input
                  type="date"
                  //value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl px-4 py-2 text-sm outline-none bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* Payment Mode */}
              <label className="block text-xs font-medium text-slate-700">
                Payment Mode <span className="text-red-500">*</span>
              </label>
              <div className="relative mb-3">
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className={`w-full appearance-none rounded-xl px-4 py-2 text-sm outline-none transition
                    ${errors.paymentMode ? "ring-2 ring-rose-300" : "ring-0"}
                    bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100`}
                >
                  <option value="">Select payment mode</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                </select>

                {/* custom chevron */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg
                    className="w-4 h-4 text-slate-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M6 8l4 4 4-4" />
                  </svg>
                </div>
              </div>
              {errors.paymentMode && (
                <p className="text-rose-500 text-xs mb-2">
                  {errors.paymentMode}
                </p>
              )}

              {/* Amount */}
              <label className="block text-xs font-medium text-slate-800 mb-1">
                Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`w-full rounded-xl px-4 py-2 mb-3 text-sm outline-none transition
                  ${errors.amount ? "ring-2 ring-rose-300" : "ring-0"}
                  bg-white/80 dark:bg-slate-800 text-slate-800 dark:text-slate-100`}
              />
              {errors.amount && (
                <p className="text-rose-500 text-xs mb-2">{errors.amount}</p>
              )}

              {errors.submit && (
                <p className="text-rose-500 text-xs mb-2">{errors.submit}</p>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    dialogRef.current?.close();
                    resetState();
                  }}
                  className="flex-1 px-4 py-2 rounded-xl text-sm bg-rose-500 text-white hover:bg-rose-600 active:scale-95 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`flex-1 px-4 py-2 rounded-xl text-sm text-white transition
                    ${
                      submitting
                        ? "bg-green-400 cursor-wait"
                        : "bg-green-600 hover:bg-green-700 active:scale-95"
                    }`}
                >
                  {submitting ? "Processing..." : "Submit Payment"}
                </button>
              </div>
            </form>

            {/* Success animation */}
            {success && (
              <div className="absolute inset-0 flex items-center justify-center bg-yellow-500  dark:bg-slate-900/60">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full bg-green-600 flex items-center justify-center shadow-lg animate-scale-up">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                    Payment Recorded Successfilly
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default PayFee_modal;
