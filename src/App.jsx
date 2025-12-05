import React, { useState, useEffect } from 'react';
import { 
  Smartphone, User, Lock, Mail, ExternalLink, 
  LayoutDashboard, Save, DollarSign, Calendar, 
  Clock, CheckSquare, ToggleLeft, ToggleRight,
  CreditCard, ArrowRight, ArrowLeft, Loader2,
  Trash2, Edit, XCircle, Wallet, PlusCircle, X, Pencil // Tambahkan Pencil import
} from 'lucide-react';

// --- DATA AWAL (MOCK DATA) ---
const initialData = [
  {
    "id": 1715481234567,
    "description": "Gaji Bulanan",
    "amount": "5000000",
    "type": "pemasukan",
    "isRecurring": true,
    "category": "Income (gaji dll)",
    "notification": true,
    "date": "2023-11-25",
    "time": "10:00"
  },
  {
    "id": 1715481239999,
    "description": "Beli Bensin",
    "amount": "30000",
    "type": "pengeluaran",
    "isRecurring": false,
    "category": "transportasi",
    "notification": false,
    "date": "2025-12-02",
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
      <p className="text-emerald-100 mt-2"> Track Finansial Keluarga Anda</p>
      <Loader2 className="animate-spin mt-8" size={24} />
    </div>
  );
};

// 2. Login Activity Component
const LoginActivity = ({ onLogin, onForgotPassword }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (username === 'melbukae' && password === 'okelah1234') {
        onLogin('FinTrack'); 
      } else {
        alert("Error : Invalid Username & Password");
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
      <p className="text-center text-slate-500 mb-8">Silahkan masuk ke akun Anda</p>

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

// --- UPDATE: Wallet Fragment (Halaman Dompet Dinamis + EDIT) ---
const WalletFragment = () => {
  // State untuk daftar dompet
  const [wallets, setWallets] = useState([
    { id: 1, name: 'Tunai (Cash)', balance: '1.500.000', color: 'bg-emerald-500' },
    { id: 2, name: 'Bank BCA', balance: '8.250.000', color: 'bg-blue-600' },
    { id: 3, name: 'GoPay', balance: '150.000', color: 'bg-sky-500' },
    { id: 4, name: 'OVO', balance: '75.000', color: 'bg-purple-600' },
  ]);

  // State untuk form tambah/edit dompet
  const [isAdding, setIsAdding] = useState(false);
  const [editingWalletId, setEditingWalletId] = useState(null); // ID dompet yg sedang diedit
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletBalance, setNewWalletBalance] = useState('');

  // Fungsi saat tombol Edit (Pensil) diklik
  const handleEditClick = (wallet) => {
    setNewWalletName(wallet.name);
    // Hapus titik ribuan agar bisa masuk ke input number
    const plainBalance = wallet.balance.replace(/\./g, '');
    setNewWalletBalance(plainBalance);
    setEditingWalletId(wallet.id);
    setIsAdding(true);
  };

  // Fungsi Simpan (Bisa Add Baru atau Update Lama)
  const handleSaveWallet = () => {
    if (!newWalletName || !newWalletBalance) {
      alert("Nama dan Saldo harus diisi!");
      return;
    }

    if (editingWalletId) {
      // LOGIKA UPDATE (EDIT)
      const updatedWallets = wallets.map(wallet => {
        if (wallet.id === editingWalletId) {
           // Tentukan ulang warna jika nama berubah (opsional, tapi bagus untuk UX)
           let walletColor = wallet.color;
           const lowerName = newWalletName.toLowerCase();
           if (lowerName.includes('shopee')) walletColor = 'bg-orange-500';
           else if (lowerName.includes('dana')) walletColor = 'bg-blue-500';
           else if (lowerName.includes('linkaja')) walletColor = 'bg-red-500';
           else if (lowerName.includes('jago')) walletColor = 'bg-yellow-500';
           else if (lowerName.includes('bni')) walletColor = 'bg-teal-600';
           else if (lowerName.includes('bri')) walletColor = 'bg-blue-700';

           return {
             ...wallet,
             name: newWalletName,
             balance: Number(newWalletBalance).toLocaleString('id-ID'),
             color: walletColor
           };
        }
        return wallet;
      });
      setWallets(updatedWallets);
      alert("Data dompet berhasil diperbarui!");
    } else {
      // LOGIKA TAMBAH BARU
      let walletColor = 'bg-slate-500';
      const lowerName = newWalletName.toLowerCase();
      
      if (lowerName.includes('shopee')) walletColor = 'bg-orange-500';
      else if (lowerName.includes('dana')) walletColor = 'bg-blue-500';
      else if (lowerName.includes('linkaja')) walletColor = 'bg-red-500';
      else if (lowerName.includes('jago')) walletColor = 'bg-yellow-500';
      else if (lowerName.includes('bni')) walletColor = 'bg-teal-600';
      else if (lowerName.includes('bri')) walletColor = 'bg-blue-700';
      else walletColor = `bg-${['rose', 'indigo', 'pink', 'cyan'][Math.floor(Math.random()*4)]}-500`;

      const newWallet = {
        id: Date.now(),
        name: newWalletName,
        balance: Number(newWalletBalance).toLocaleString('id-ID'),
        color: walletColor
      };
      setWallets([...wallets, newWallet]);
      alert("Dompet baru berhasil ditambahkan!");
    }
    
    // Reset form
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setIsAdding(false);
    setEditingWalletId(null);
    setNewWalletName('');
    setNewWalletBalance('');
  }

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-slate-50 relative">
      <div className="bg-emerald-600 p-6 text-white rounded-b-3xl shadow-lg mb-6">
        <h3 className="text-xl font-bold">Dompet Saya</h3>
        <p className="text-emerald-100 text-sm mt-1">Kelola semua sumber dana Anda</p>
      </div>

      <div className="px-5 space-y-4">
        {wallets.map((wallet) => (
          <div key={wallet.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between animate-fade-in group">
             <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${wallet.color} flex items-center justify-center text-white shadow-md`}>
                   <Wallet size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700">{wallet.name}</h4>
                  <p className="text-xs text-slate-400">Terhubung</p>
                </div>
             </div>
             
             <div className="flex items-center gap-3">
                <div className="text-right">
                    <span className="block text-xs text-slate-400">Saldo</span>
                    <span className="font-mono font-bold text-slate-700">Rp {wallet.balance}</span>
                </div>
                {/* Tombol Edit */}
                <button 
                  onClick={() => handleEditClick(wallet)}
                  className="bg-slate-100 p-2 rounded-full text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition"
                >
                  <Pencil size={16} />
                </button>
             </div>
          </div>
        ))}

        {/* Tombol Tambah (Jika tidak sedang menambah/edit) */}
        {!isAdding && (
          <button 
            onClick={() => setIsAdding(true)}
            className="w-full py-4 border-2 border-dashed border-emerald-200 rounded-xl flex flex-col items-center justify-center text-emerald-600 hover:bg-emerald-50 transition"
          >
             <PlusCircle size={24} className="mb-1"/>
             <span className="font-bold text-sm">Tambah Dompet Baru</span>
          </button>
        )}

        {/* Form Tambah/Edit Dompet (Overlay Modal Style) */}
        {isAdding && (
          <div className="bg-white p-4 rounded-xl shadow-lg border-2 border-emerald-100 animate-fade-in mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-slate-700">
                {editingWalletId ? "Edit Dompet" : "Tambah Akun Baru"}
              </h4>
              <button onClick={handleCloseForm} className="text-slate-400 hover:text-red-500">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-500">Nama Dompet / E-Wallet</label>
                <input 
                  type="text" 
                  className="w-full border-b border-slate-300 py-2 focus:border-emerald-500 outline-none text-sm"
                  placeholder="Contoh: Dana, ShopeePay, LinkAja"
                  value={newWalletName}
                  onChange={(e) => setNewWalletName(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500">Saldo (Rp)</label>
                <input 
                  type="number" 
                  className="w-full border-b border-slate-300 py-2 focus:border-emerald-500 outline-none text-sm font-mono"
                  placeholder="0"
                  value={newWalletBalance}
                  onChange={(e) => setNewWalletBalance(e.target.value)}
                />
              </div>
              <button 
                onClick={handleSaveWallet}
                className="w-full bg-emerald-600 text-white font-bold py-2 rounded-lg mt-2 shadow hover:bg-emerald-700 transition"
              >
                {editingWalletId ? "Update Data" : "Simpan Dompet"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 4. Dashboard Input Fragment (Home Page)
const InputFragment = ({ username }) => {
  const initialFormState = {
    description: '',
    amount: '',
    type: 'pengeluaran',
    isRecurring: false,
    category: 'Income (gaji dll)',
    notification: true,
    date: new Date().toISOString().split('T')[0],
    time: '12:00'
  };

  const [formData, setFormData] = useState(initialFormState);
  const [logs, setLogs] = useState([]);
  const [editingId, setEditingId] = useState(null); 

  useEffect(() => {
    const savedData = localStorage.getItem('fintrack_data');
    if (savedData) {
      setLogs(JSON.parse(savedData));
    } else {
      setLogs(initialData);
      localStorage.setItem('fintrack_data', JSON.stringify(initialData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fintrack_data', JSON.stringify(logs));
  }, [logs]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.description || !formData.amount) {
      alert("Deskripsi dan Jumlah harus diisi!");
      return;
    }

    if (editingId) {
      const updatedLogs = logs.map(item => 
        item.id === editingId ? { ...formData, id: editingId } : item
      );
      setLogs(updatedLogs);
      setEditingId(null);
      alert("Data berhasil diperbarui!");
    } else {
      const newLog = { ...formData, id: Date.now() };
      setLogs([newLog, ...logs]); 
      alert("Data berhasil ditambahkan!");
    }
    
    setFormData(initialFormState);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item.id);
    document.getElementById('input-form')?.scrollIntoView({ behavior: 'smooth' });
  };

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

          {/* ToggleButton */}
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
                {['Income (gaji dll)','makanan', 'transport', 'belanja', 'akomodasi'].map((cat) => (
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

          <button 
            onClick={handleSubmit}
            className={`w-full text-white font-bold py-3 rounded-xl shadow-lg active:scale-95 transition flex items-center justify-center gap-2 ${editingId ? 'bg-orange-500 hover:bg-orange-600' : 'bg-slate-800 hover:bg-slate-900'}`}
          >
            {editingId ? <><Edit size={18} /> Update Data</> : <><Save size={18} /> Simpan Transaksi</>}
          </button>
        </div>

        <div className="mt-6 pb-4">
          <h5 className="font-bold text-slate-700 mb-3">Riwayat Transaksi ({logs.length})</h5>
          
          {logs.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-4">Belum ada data.</p>
          ) : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="bg-white p-3 rounded-lg border-l-4 shadow-sm text-xs relative group" 
                     style={{ borderColor: log.type === 'pemasukan' ? '#10b981' : '#ef4444' }}>
                  
                  <div className="pr-16"> 
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
  const [activeTab, setActiveTab] = useState('home'); 

  const navigateToLogin = () => setCurrentActivity('login');
  const navigateToDashboard = (username) => {
    setUserSession(username);
    setCurrentActivity('dashboard');
    setActiveTab('home'); 
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
            
            {activeTab === 'home' ? (
              <InputFragment username={userSession} />
            ) : (
              <WalletFragment />
            )}
            
            <div className="bg-white border-t border-slate-200 p-3 flex justify-around items-center absolute bottom-0 w-full pb-6 sm:pb-3 z-10">
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center transition ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}
              >
                <LayoutDashboard size={20} />
                <span className="text-[10px] font-bold mt-1">Home</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('wallet')}
                className={`flex flex-col items-center transition ${activeTab === 'wallet' ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-600'}`}
              >
                <CreditCard size={20} />
                <span className="text-[10px] font-bold mt-1">Dompet</span>
              </button>
              
              <button onClick={() => setCurrentActivity('login')} className="flex flex-col items-center text-slate-400 hover:text-red-500">
                <User size={20} />
                <span className="text-[10px] font-medium mt-1">Keluar</span>
              </button>
            </div>
          </div>
        )}

        <div className="absolute top-0 w-full h-7 bg-black/20 backdrop-blur-md flex justify-between px-4 items-center z-50">
          <span className="text-[10px] text-white font-medium">07:30</span>
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