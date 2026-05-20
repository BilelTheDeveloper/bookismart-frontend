import React, { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';
import API from '../../api/config';
import {
  Send, Plus, Hash, Users, MoreVertical, Loader2, X, Check,
  ChevronLeft, MessageSquare, Smile, Paperclip, Search,
  Circle, Trash2, Edit2, UserPlus, Bell, BellOff, Settings
} from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const TYPE_ICON  = { booking: '📅', review: '⭐', system: '🔔', chat: '💬', staff: '👥' };
const SENDER_COLORS = {
  owner:    'from-indigo-600 to-violet-600',
  customer: 'from-emerald-600 to-teal-600',
  staff:    'from-amber-500 to-orange-500',
};

function Avatar({ name, avatar, type = 'owner', size = 'md' }) {
  const s = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-12 h-12 text-lg' : 'w-9 h-9 text-sm';
  const initials = name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  if (avatar) return <img src={avatar} alt={name} className={`${s} rounded-xl object-cover flex-shrink-0`} />;
  return (
    <div className={`${s} rounded-xl bg-gradient-to-br ${SENDER_COLORS[type] || SENDER_COLORS.owner} flex items-center justify-center text-white font-black flex-shrink-0`}>
      {initials}
    </div>
  );
}

/* ── Create Room Modal ── */
function CreateRoomModal({ staff, customers, onClose, onCreated }) {
  const [name, setName]   = useState('');
  const [desc, setDesc]   = useState('');
  const [selected, setSelected] = useState([]);
  const [saving, setSaving]     = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const toggle = (id, type, n, avatar) => {
    setSelected(prev => prev.find(m => m.memberId === id)
      ? prev.filter(m => m.memberId !== id)
      : [...prev, { memberId: id, memberType: type, name: n, avatar: avatar || '' }]
    );
  };

  const handleCreate = async () => {
    if (!name.trim()) return;
    setSaving(true);
    try {
      const { data } = await API.post('/merchant/chat', { name, description: desc, members: selected });
      onCreated(data.room);
    } catch {} finally { setSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0f172a] border border-slate-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h2 className="text-white font-black text-lg">New Chat Room</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all"><X size={17} /></button>
        </div>
        <div className="p-6 space-y-4">
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Room name (e.g. Team General)" maxLength={60}
            className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none text-sm" />
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description (optional)"
            className="w-full bg-slate-800 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none text-sm" />

          {/* Member selection */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Add Members</p>
            <div className="max-h-52 overflow-y-auto space-y-1.5">
              {staff.map(s => (
                <label key={s._id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer transition-all">
                  <input type="checkbox" checked={!!selected.find(m => m.memberId === s._id)} onChange={() => toggle(s._id, 'staff', s.fullName, s.profilePic)} className="hidden" />
                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${selected.find(m => m.memberId === s._id) ? 'bg-indigo-600 border-indigo-500' : 'border-slate-600'}`}>
                    {selected.find(m => m.memberId === s._id) && <Check size={10} className="text-white" />}
                  </div>
                  <Avatar name={s.fullName} avatar={s.profilePic} type="staff" size="sm" />
                  <div>
                    <p className="text-white text-xs font-bold">{s.fullName}</p>
                    <p className="text-slate-500 text-[10px]">Staff</p>
                  </div>
                </label>
              ))}
              {customers.map(c => (
                <label key={c._id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800 cursor-pointer transition-all">
                  <input type="checkbox" checked={!!selected.find(m => m.memberId === c._id)} onChange={() => toggle(c._id, 'customer', c.fullName, c.profilePicture)} className="hidden" />
                  <div className={`w-4 h-4 rounded-md border-2 flex items-center justify-center transition-all ${selected.find(m => m.memberId === c._id) ? 'bg-indigo-600 border-indigo-500' : 'border-slate-600'}`}>
                    {selected.find(m => m.memberId === c._id) && <Check size={10} className="text-white" />}
                  </div>
                  <Avatar name={c.fullName} avatar={c.profilePicture} type="customer" size="sm" />
                  <div>
                    <p className="text-white text-xs font-bold">{c.fullName}</p>
                    <p className="text-slate-500 text-[10px]">Customer</p>
                  </div>
                </label>
              ))}
              {staff.length === 0 && customers.length === 0 && (
                <p className="text-slate-500 text-xs text-center py-4">No staff or customers found.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 p-6 border-t border-slate-800">
          <button onClick={onClose} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-sm">Cancel</button>
          <button onClick={handleCreate} disabled={!name.trim() || saving}
            className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Hash size={15} />}
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Message Bubble ── */
function MessageBubble({ msg, isOwn }) {
  const isSystem = msg.type === 'system';
  if (isSystem) {
    return (
      <div className="flex justify-center my-2">
        <span className="text-xs text-slate-500 bg-slate-800/60 px-4 py-1 rounded-full">{msg.text}</span>
      </div>
    );
  }

  return (
    <div className={`flex gap-2.5 items-end ${isOwn ? 'flex-row-reverse' : 'flex-row'} group`}>
      {!isOwn && <Avatar name={msg.senderName} avatar={msg.senderAvatar} type={msg.senderType} size="sm" />}
      <div className={`max-w-[70%] space-y-1 ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isOwn && <p className="text-[10px] font-bold text-slate-400 px-1">{msg.senderName}</p>}
        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed break-words ${
          isOwn
            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white rounded-br-md'
            : 'bg-slate-800 text-slate-200 rounded-bl-md border border-slate-700'
        } ${msg.deleted ? 'opacity-50 italic' : ''}`}>
          {msg.text}
          {msg.fileUrl && (
            <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer"
              className="block mt-2 text-xs underline opacity-80 hover:opacity-100">
              📎 {msg.fileName || 'Attachment'}
            </a>
          )}
        </div>
        <p className="text-[10px] text-slate-600 px-1">
          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
}

/* ── Main Chat Page ── */
export default function Chat() {
  const user      = JSON.parse(localStorage.getItem('user')) || {};
  const [rooms, setRooms]               = useState([]);
  const [activeRoom, setActiveRoom]     = useState(null);
  const [messages, setMessages]         = useState([]);
  const [text, setText]                 = useState('');
  const [loading, setLoading]           = useState(true);
  const [msgLoading, setMsgLoading]     = useState(false);
  const [sending, setSending]           = useState(false);
  const [showCreate, setShowCreate]     = useState(false);
  const [staff, setStaff]               = useState([]);
  const [customers, setCustomers]       = useState([]);
  const [typing, setTyping]             = useState('');
  const [search, setSearch]             = useState('');
  const [sidebarOpen, setSidebarOpen]   = useState(() => window.innerWidth >= 1024);
  const socketRef   = useRef(null);
  const bottomRef   = useRef(null);
  const inputRef    = useRef(null);
  const typingTimer = useRef(null);

  /* ── Socket.io ── */
  useEffect(() => {
    const socket = io(SOCKET_URL, { withCredentials: true, transports: ['websocket', 'polling'] });
    socketRef.current = socket;

    socket.on('chat:message', ({ roomId, message }) => {
      if (activeRoom?._id === roomId || activeRoom?._id === roomId?.toString()) {
        setMessages(prev => [...prev, message]);
      }
      setRooms(prev => prev.map(r =>
        r._id === roomId
          ? { ...r, lastMessage: message.text || '📎 File', lastMessageAt: message.createdAt, lastMessageBy: message.senderName }
          : r
      ));
    });

    socket.on('chat:typing', ({ senderName, isTyping }) => {
      setTyping(isTyping ? `${senderName} is typing...` : '');
    });

    socket.on('chat:messageDeleted', ({ roomId, messageId }) => {
      setMessages(prev => prev.map(m => m._id === messageId ? { ...m, deleted: true, text: 'This message was deleted' } : m));
    });

    return () => socket.disconnect();
  }, [activeRoom?._id]);

  /* ── Fetch rooms on mount ── */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const [roomsRes, staffRes, custRes] = await Promise.all([
          API.get('/merchant/chat'),
          API.get('/merchant/staff'),
          API.get('/merchant/customers').catch(() => ({ data: { customers: [] } })),
        ]);
        if (roomsRes.data.success) setRooms(roomsRes.data.rooms);
        if (staffRes.data.success) setStaff(staffRes.data.staff);
        if (custRes.data.customers) setCustomers(custRes.data.customers);
      } finally { setLoading(false); }
    };
    init();
  }, []);

  /* ── Scroll to bottom ── */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* ── Select room ── */
  const selectRoom = useCallback(async (room) => {
    if (socketRef.current) {
      if (activeRoom) socketRef.current.emit('chat:leave', { roomId: activeRoom._id });
      socketRef.current.emit('chat:join', { roomId: room._id });
    }
    setActiveRoom(room);
    setMessages([]);
    setMsgLoading(true);
    try {
      const { data } = await API.get(`/merchant/chat/${room._id}/messages`);
      if (data.success) setMessages(data.messages);
      // Mark as read
      API.put(`/merchant/chat/${room._id}/read`).catch(() => {});
    } finally { setMsgLoading(false); }
  }, [activeRoom]);

  /* ── Send message ── */
  const handleSend = async () => {
    if (!text.trim() || !activeRoom || sending) return;
    const msgText = text.trim();
    setText('');
    setSending(true);
    try {
      await API.post(`/merchant/chat/${activeRoom._id}/messages`, { text: msgText });
    } finally { setSending(false); }
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    // Typing indicator
    if (socketRef.current && activeRoom) {
      socketRef.current.emit('chat:typing', { roomId: activeRoom._id, senderName: user.fullName, isTyping: true });
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        socketRef.current?.emit('chat:typing', { roomId: activeRoom._id, senderName: user.fullName, isTyping: false });
      }, 2000);
    }
  };

  const handleCreated = (room) => {
    setRooms(prev => [room, ...prev]);
    setShowCreate(false);
    selectRoom(room);
  };

  const filteredRooms = rooms.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
  const totalUnread   = rooms.reduce((s, r) => s + (r.unreadCounts?.get?.(user._id) || 0), 0);

  return (
    <div className="relative flex h-[calc(100vh-8rem)] sm:h-[calc(100vh-9rem)] lg:h-[calc(100vh-11rem)] bg-[#0d1117] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div className="absolute inset-0 bg-black/50 z-10 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── LEFT: Rooms sidebar ── */}
      <div className={`absolute inset-y-0 left-0 z-20 lg:relative lg:z-auto flex-shrink-0 flex flex-col border-r border-slate-800 transition-all duration-300 ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-indigo-400" />
            <h2 className="text-white font-black text-sm">Messages</h2>
            {totalUnread > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">{totalUnread}</span>
            )}
          </div>
          <button onClick={() => setShowCreate(true)}
            className="w-8 h-8 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white transition-all">
            <Plus size={15} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl px-3 py-2">
            <Search size={14} className="text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search rooms..."
              className="flex-1 bg-transparent text-white text-xs placeholder-slate-500 outline-none" />
          </div>
        </div>

        {/* Room list */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-0.5">
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 size={24} className="text-indigo-500 animate-spin" /></div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-12">
              <Hash size={28} className="text-slate-700 mx-auto mb-2" />
              <p className="text-slate-500 text-xs">No rooms yet</p>
              <button onClick={() => setShowCreate(true)} className="mt-3 text-indigo-400 text-xs font-bold hover:text-indigo-300">
                + Create one
              </button>
            </div>
          ) : (
            filteredRooms.map(room => {
              const isActive  = activeRoom?._id === room._id;
              const unread    = room.unreadCounts?.[user._id] || 0;
              const timeAgo   = room.lastMessageAt ? new Date(room.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
              return (
                <button key={room._id} onClick={() => selectRoom(room)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${isActive ? 'bg-indigo-600/20 border border-indigo-500/30' : 'hover:bg-slate-800/60'}`}>
                  {/* Room icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white flex-shrink-0 ${isActive ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                    {room.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-bold truncate ${isActive ? 'text-indigo-300' : 'text-slate-200'}`}>{room.name}</p>
                      <p className="text-[10px] text-slate-600 flex-shrink-0 ml-1">{timeAgo}</p>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{room.lastMessage || 'No messages yet'}</p>
                  </div>
                  {unread > 0 && (
                    <span className="w-5 h-5 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0">{unread}</span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* ── RIGHT: Message area ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeRoom ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/20 flex items-center justify-center">
              <MessageSquare size={32} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-black text-xl mb-2">Select a Room</h3>
              <p className="text-slate-500 text-sm">Choose a room from the left or create a new one to start chatting.</p>
            </div>
            <button onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all">
              <Plus size={16} /> New Room
            </button>
          </div>
        ) : (
          <>
            {/* Room header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
              <div className="flex items-center gap-3">
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all lg:hidden">
                  <ChevronLeft size={18} />
                </button>
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm">
                  {activeRoom.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-black text-sm">{activeRoom.name}</h3>
                  <p className="text-slate-500 text-[10px]">{activeRoom.members?.length || 0} members</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {activeRoom.members?.slice(0, 4).map((m, i) => (
                    <Avatar key={i} name={m.name} avatar={m.avatar} type={m.memberType} size="sm" />
                  ))}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
              {msgLoading ? (
                <div className="flex justify-center py-8"><Loader2 size={24} className="text-indigo-500 animate-spin" /></div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <MessageSquare size={28} className="text-slate-700" />
                  <p className="text-slate-500 text-sm">No messages yet. Say hello! 👋</p>
                </div>
              ) : (
                messages.map(msg => (
                  <MessageBubble key={msg._id} msg={msg} isOwn={msg.senderId === user._id?.toString()} />
                ))
              )}
              {typing && <p className="text-xs text-slate-500 italic px-1 animate-pulse">{typing}</p>}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="px-4 py-3 border-t border-slate-800 bg-slate-900/50 flex-shrink-0">
              <div className="flex items-end gap-3 bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 focus-within:border-indigo-500 transition-all">
                <textarea
                  ref={inputRef}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${activeRoom.name}...`}
                  rows={1}
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none resize-none text-sm leading-relaxed max-h-28 overflow-y-auto"
                  style={{ scrollbarWidth: 'none' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!text.trim() || sending}
                  className="w-9 h-9 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 rounded-xl flex items-center justify-center text-white transition-all flex-shrink-0"
                >
                  {sending ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5 px-1">Press Enter to send · Shift+Enter for new line</p>
            </div>
          </>
        )}
      </div>

      {showCreate && (
        <CreateRoomModal staff={staff} customers={customers} onClose={() => setShowCreate(false)} onCreated={handleCreated} />
      )}
    </div>
  );
}
