type SnackbarProps = {
  message: string;
  close: () => void;
};

export default function Snackbar({ message, close }: SnackbarProps) {
  return (
    <div className="fixed top-4 right-0 flex items-center gap-3 p-3 mx-3 bg-fgColor text-bgColor rounded-sm">
      <p role="alert">{message}</p>
      <button
        aria-label="Close"
        className="px-2 py-1 rounded-sm focus-visible:ring-1 focus-visible:ring-bgColor"
        onClick={close}>
        <span aria-hidden="true">&#10005;</span>
      </button>
    </div>
  );
}
