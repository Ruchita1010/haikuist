import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Snackbar from '@components/Snackbar';

type SnackbarContextType = {
  enqueueSnackbar: (message: string) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queue, setQueue] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState('new message ');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const enqueueSnackbar = (message: string) => {
    setQueue([...queue, message]);
  };

  const close = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setSnackbarVisible(false);
  };

  useEffect(() => {
    if (queue.length > 0 && !snackbarVisible) {
      setCurrentMessage(queue[0]);
      setQueue((prevQueue) => prevQueue.slice(1));
      setSnackbarVisible(true);
      timeoutRef.current = setTimeout(() => {
        close();
      }, 6000);
    }
  }, [queue, snackbarVisible]);

  useEffect(() => {
    return () => {
      close();
    };
  }, []);

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      {snackbarVisible ? (
        <Snackbar message={currentMessage} close={close} />
      ) : null}
    </SnackbarContext.Provider>
  );
};
