import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import API from '../api/config';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [notifications, setNotifications]   = useState([]);
  const [unreadCount, setUnreadCount]        = useState(0);
  const [loading, setLoading]                = useState(false);
  const socketRef = useRef(null);

  /* ── Fetch from API ── */
  const fetchNotifications = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data } = await API.get('/merchant/notifications?limit=30');
      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch { /* swallow */ }
    finally { setLoading(false); }
  }, [isAuthenticated]);

  /* ── Socket.io real-time listener ── */
  useEffect(() => {
    if (!isAuthenticated || !user?._id) return;

    const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const socket = io(SOCKET_URL, { withCredentials: true, transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('user:join', { userId: user._id });
    });

    socket.on('notification:new', (notif) => {
      setNotifications(prev => [notif, ...prev].slice(0, 50));
      setUnreadCount(prev => prev + 1);
    });

    fetchNotifications();

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [isAuthenticated, user?._id, fetchNotifications]);

  /* ── Actions ── */
  const markRead = async (id) => {
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
    try { await API.put(`/merchant/notifications/${id}/read`); } catch {}
  };

  const markAllRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    try { await API.put('/merchant/notifications/read-all'); } catch {}
  };

  const deleteNotif = async (id) => {
    const wasUnread = notifications.find(n => n._id === id && !n.read);
    setNotifications(prev => prev.filter(n => n._id !== id));
    if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
    try { await API.delete(`/merchant/notifications/${id}`); } catch {}
  };

  const clearAll = async () => {
    setNotifications([]);
    setUnreadCount(0);
    try { await API.delete('/merchant/notifications/clear'); } catch {}
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, loading, markRead, markAllRead, deleteNotif, clearAll, fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
  return ctx;
};
