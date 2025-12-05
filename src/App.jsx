import React, { useState, useEffect } from 'react';
import { 
  Smartphone, User, Lock, Mail, ExternalLink, 
  LayoutDashboard, Save, DollarSign, Calendar, 
  Clock, CheckSquare, ToggleLeft, ToggleRight,
  CreditCard, ArrowRight, ArrowLeft, Loader2,
  Trash2, Edit, XCircle
} from 'lucide-react';

// --- DATA AWAL (MOCK DATA) ---
// Digabungkan langsung ke sini agar tidak perlu import file eksternal yang menyebabkan error.
const initialData = [
  {
    "id": 1715481234567,
    "description": "Gaji Bulanan",
    "amount": "5000000",
    "type": "pemasukan",
    "isRecurring": true,
    "category": "belanja",
    "notification": true,
    "date": "2023-10-01",
    "time": "08:00"
  },
  {
    "id": 1715481239999,
    "description": "Beli Kopi",
    "amount": "25000",
    "type": "pengeluaran",
    "isRecurring": false,
    "category": "makanan",
    "notification": false,
    "date": "2023-10-02",
    "time": "14:30"
  }
];

// --- KOMPONEN PENDUKUNG (Fragments & UI) ---

// 1. Splash Screen Component
const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-full w-full bg-emerald-600 flex flex-col items-center justify-center text-white animate-fade-in">
      <div className="bg-white p-6 rounded-full shadow-xl mb-4 animate-bounce">
        <DollarSign size={64} className="text-emerald-600" />
      </div>
      <h1 className="text-3xl font-bold tracking-wider">FinTrack</h1>
      <p className="text-emerald-100 mt-2">Finansial Tracking - Solusi Track Finansial Keluarga Anda</p>
      <Loader2 className="animate-spin mt-8" size={24} />
    </div>
  );
};

// 2. Login Activity Component (Hardcoded Logic)
const LoginActivity = ({ onLogin, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi loading network
    setTimeout(() => {
      setLoading(false);
      
      // LOGIC HARDCODE LOGIN
      if (username === 'melbukae' && password === 'okelah1234') {
        // Jika benar, kirim nama aplikasi 'FinTrack' ke dashboard
        onLogin('FinTrack'); 
      } else {
        alert("Username atau Password salah! (Hint: melbukae / okelah1234)");
      }
    }, 1500);
  };

  return (
    <div className="h-full w-full bg-slate-50 p-8 flex flex-col justify-center">
      <div className="flex justify-center mb-8">
        <div className="bg-emerald-600 p-4 rounded-2xl shadow-lg">
          <Smartphone size={48} className="text-white" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Selamat Datang</h2>
      <p className="text-center text-slate-500 mb-8">Silakan masuk ke akun Anda</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Nama Pengguna</label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="Masukkan nama..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Kata Sandi</label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="password" 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none transition"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg shadow-md transition transform active:scale-95 flex justify-center items-center"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Masuk"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button 
          onClick={onForgotPassword}
          className="text-emerald-600 hover:text-emerald-800 text-sm font-medium"
        >
          Lupa Kata Sandi?
        </button>
      </div>
    </div>
  );
};

// 3. Forgot Password Activity
const ForgotPasswordActivity = ({ onBack }) => {
  const [email, setEmail] = useState('');

  const handleReset = () => {
    if (!email) {
      alert("Mohon masukkan email Anda.");
      return;
    }
    alert(`Link reset kata sandi telah dikirim ke ${email}`);
    onBack();
  };

  return (
    <div className="h-full w-full bg-white p-6 flex flex-col">
      <button onClick={onBack} className="self-start text-slate-600 mb-6">
        <ArrowLeft size={24} />
      </button>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Lupa Kata Sandi</h2>
      <p className="text-slate-500 mb-8">Masukkan email yang terdaftar.</p>
      <div className="space-y-4 flex-1">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
            <input 
              type="email" 
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg shadow hover:bg-emerald-700 transition"
        >
          Tautkan / Reset
        </button>
      </div>
      <div className="mt-auto pt-6 border-t border-slate-100">
        <a 
          href="https://itts.ac.id" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full border border-emerald-600 text-emerald-600 py-2 rounded-lg hover:bg-emerald-50 transition font-medium"
        >
          <ExternalLink size={16} /> Kunjungi ITTS
        </a>
      </div>
    </div>
  );
};

// 4. Dashboard Input Fragment (REAL CRUD LOGIC)
const InputFragment = ({ username }) => {
  const initialFormState = {
    description: '',
    amount: '',
    type: 'pengeluaran',
    isRecurring: false,
    category: 'makanan',
    notification: true,
    date: new Date().toISOString().split('T')[0],
    time: '12:00'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null); // Untuk menandai mode Edit

  // Load Data (READ) saat komponen pertama kali muncul
  useEffect(() => {
    const savedData = localStorage.getItem('fintrack_data');
    if (savedData) {
      setLogs(JSON.parse(savedData));
    } else {
      // Jika kosong, load dari Data Awal (const)
      setLogs(initialData);
      localStorage.setItem('fintrack_data', JSON.stringify(initialData));
    }
  }, []);

  // Simpan ke LocalStorage setiap ada perubahan pada 'logs'
  useEffect(() => {
    localStorage.setItem('fintrack_data', JSON.stringify(logs));
  }, [logs]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // CREATE & UPDATE Logic
  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      alert("Deskripsi dan Jumlah harus diisi!");
      return;
    }

    if (editingId) {
      // Logic UPDATE
      const updatedLogs = logs.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      );
      setLogs(updatedLogs);
      setEditingId(null);
      alert("Data berhasil diperbarui!");
    } else {
      // Logic CREATE
      const newLog = { ...formData, id: Date.now() };
      setLogs([newLog, ...logs]); // Tambah ke paling atas
      alert("Data berhasil ditambahkan!");
    }
    
    setFormData(initialFormState); // Reset form
  };

  // EDIT Setup Logic
  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    // Scroll ke atas (opsional, agar form terlihat)
    document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // DELETE Logic
  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus data ini?")) {
      const filteredLogs = logs.filter(item => item.id !== id);
      setLogs(filteredLogs);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(initialFormState);
  };

  // Hitung Saldo
  const totalBalance = logs.reduce((acc, curr) => {
    return curr.type === 'pemasukan' 
      ? acc + Number(curr.amount) 
      : acc - Number(curr.amount);
  }, 0);

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-slate-50">
      {/* Header Dashboard */}
      <div className="bg-emerald-600 p-6 text-white rounded-b-3xl shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User size={24} />
          </div>
          <div>
            <p className="text-emerald-100 text-sm">Halo,</p>
            <h3 className="text-xl font-bold">{username}</h3>
          </div>
        </div>
        <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm mt-2">
          <p className="text-xs opacity-80">Saldo Dompet</p>
          <p className="text-2xl font-bold">Rp {totalBalance.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Form Input Components */}
      <div className="px-5 space-y-5" id="input-form">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-700 flex items-center gap-2">
            <LayoutDashboard size={18} /> 
            {editingId ? "Edit Transaksi" : "Transaksi Baru"}
          </h4>
          {editingId && (
            <button onClick={handleCancelEdit} className="text-xs text-red-500 font-bold flex items-center gap-1">
              <XCircle size={14} /> Batal Edit
            </button>
          )}
        </div>

        {/* --- FORM INPUT AREA --- */}
        <div className={`space-y-4 transition-all ${editingId ? 'bg-yellow-50 border-yellow-200 border p-2 rounded-xl' : ''}`}>
           {/* TextEdit (Input Fields) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Deskripsi</label>
              <input 
                type="text" 
                className="w-full border-b border-slate-300 py-2 focus:border-emerald-500 outline-none bg-transparent"
                placeholder="Contoh: Makan Siang"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase">Jumlah (Rp)</label>
              <input 
                type="number" 
                className="w-full border-b border-slate-300 py-2 focus:border-emerald-500 outline-none bg-transparent font-mono"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </div>
          </div>

          {/* ToggleButton (Pemasukan/Pengeluaran) */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Jenis</label>
            <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => handleInputChange('type', 'pemasukan')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${formData.type === 'pemasukan' ? 'bg-emerald-500 text-white shadow' : 'text-slate-500'}`}
              >
                Pemasukan
              </button>
              <button 
                onClick={() => handleInputChange('type', 'pengeluaran')}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${formData.type === 'pengeluaran' ? 'bg-red-500 text-white shadow' : 'text-slate-500'}`}
              >
                Pengeluaran
              </button>
            </div>
          </div>

          {/* Pickers */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Calendar size={12} /> Tanggal
              </label>
              <input 
                type="date" 
                className="w-full text-sm outline-none text-slate-700"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
              />
            </div>
            <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
              <label className="text-xs text-slate-500 flex items-center gap-1 mb-1">
                <Clock size={12} /> Waktu
              </label>
              <input 
                type="time" 
                className="w-full text-sm outline-none text-slate-700"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
              />
            </div>
          </div>

          {/* Radio, Checkbox, Switch */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Kategori</label>
              <div className="space-y-2">
                {['makanan', 'transport', 'belanja'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      checked={formData.category === cat}
                      onChange={() => handleInputChange('category', cat)}
                      className="accent-emerald-600"
                    />
                    <span className="text-sm capitalize text-slate-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <hr className="border-slate-100" />
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${formData.isRecurring ? 'bg-emerald-600 border-emerald-600' : 'border-slate-300'}`}>
                {formData.isRecurring && <CheckSquare size={14} className="text-white" />}
              </div>
              <input 
                type="checkbox" 
                className="hidden"
                checked={formData.isRecurring}
                onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
              />
              <span className="text-sm text-slate-700">Rutin (Bulanan)</span>
            </label>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Notifikasi</span>
              <button onClick={() => handleInputChange('notification', !formData.notification)}>
                {formData.notification ? <ToggleRight size={32} className="text-emerald-600" /> : <ToggleLeft size={32} className="text-slate-300" />}
              </button>
            </div>
          </div>

          {/* Button Simpan/Update */}
          <button 
            onClick={handleSubmit}
            className={`w-full text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2 ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-800 hover:bg-slate-900'}`}
          >
            {editingId ? <><Edit size={18} /> Update Data</> : <><Save size={18} /> Simpan Transaksi</>}
          </button>
        </div>

        {/* --- LOG DISPLAY (READ, UPDATE, DELETE) --- */}
        <div className="mt-6 pb-4">
          <h5 className="font-bold text-slate-700 mb-3">Riwayat Transaksi ({logs.length})</h5>
          
          {logs.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-4">Belum ada data.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="bg-white p-3 rounded-lg border-l-4 shadow-sm text-xs relative group" 
                     style={{ borderColor: log.type === 'pemasukan' ? '#10b981' : '#ef4444' }}>
                  
                  {/* Content */}
                  <div className="pr-16"> {/* Padding right agar tidak tertutup tombol */}
                    <div className="flex justify-between font-bold text-sm mb-1">
                      <span className="text-slate-800">{log.description}</span>
                    </div>
                    <div className={`font-mono font-bold mb-1 ${log.type === 'pemasukan' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {log.type === 'pemasukan' ? '+' : '-'} Rp {Number(log.amount).toLocaleString('id-ID')}
                    </div>
                    <div className="text-slate-500 flex gap-2 items-center">
                      <Calendar size={10} /> <span>{log.date}</span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded capitalize">{log.category}</span>
                    </div>
                  </div>

                  {/* Action Buttons (Edit & Delete) */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    <button 
                      onClick={() => handleEdit(log)}
                      className="bg-orange-100 text-orange-600 p-1.5 rounded hover:bg-orange-200 transition"
                      title="Edit"
                    >
                      <Edit size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(log.id)}
                      className="bg-red-100 text-red-600 p-1.5 rounded hover:bg-red-200 transition"
                      title="Hapus"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- APP UTAMA ---
export default function App() {
  const [currentActivity, setCurrentActivity] = useState('splash');
  const [userSession, setUserSession] = useState(null);

  const navigateToLogin = () => setCurrentActivity('login');
  const navigateToDashboard = (username) => {
    setUserSession(username);
    setCurrentActivity('dashboard');
  };
  const navigateToForgotPassword = () => setCurrentActivity('forgot-password');
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 font-sans">
      <div className="relative w-full max-w-md h-[850px] bg-white shadow-2xl overflow-hidden sm:rounded-[3rem] border-[8px] border-slate-900">
        
        {currentActivity === 'splash' && <SplashScreen onFinish={navigateToLogin} />}
        
        {currentActivity === 'login' && (
          <LoginActivity 
            onLogin={navigateToDashboard} 
            onForgotPassword={navigateToForgotPassword} 
          />
        )}
        
        {currentActivity === 'forgot-password' && <ForgotPasswordActivity onBack={navigateToLogin} />}
        
        {currentActivity === 'dashboard' && (
          <div className="h-full flex flex-col">
            <InputFragment username={userSession} />
            
            <div className="bg-white border-t border-slate-200 p-3 flex justify-around items-center absolute bottom-0 w-full pb-6 sm:pb-3">
              <button className="flex flex-col items-center text-emerald-600">
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-bold mt-1">Home</span>
              </button>
              <button className="flex flex-col items-center text-slate-400 hover:text-emerald-600">
                <CreditCard size={20} />
                <span className="text-[10px] font-medium mt-1">Dompet</span>
              </button>
              <button onClick={() => setCurrentActivity('login')} className="flex flex-col items-center text-slate-400 hover:text-red-500">
                <User size={20} />
                <span className="text-[10px] font-medium mt-1">Keluar</span>
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-0 w-full h-7 bg-black/20 backdrop-blur-md flex justify-between px-4 items-center z-50">
          <span className="text-[10px] text-white font-medium">10:30</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
            <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
          </div>
        </div>
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1/3 h-1 bg-slate-900/20 rounded-full z-50"></div>
      </div>
    </div>
  );
}