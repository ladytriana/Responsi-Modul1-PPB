// 1. Import library yang dibutuhkan
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

// 2. Inisialisasi Express app dan koneksi Supabase
const app = express();
const port = process.env.PORT || 3000;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Middleware
app.use(cors());
app.use(express.json());

// =================================================================================
// === Fungsi Bantuan (Helper) untuk Format Tanggal ================================
// =================================================================================

const formatItemDates = (item) => {
  if (!item) return null;
  return {
    ...item,
    // PENYESUAIAN: Format created_at agar menjadi tanggal saja
    created_at: item.created_at ? item.created_at.substring(0, 10) : null,
    tanggal_masuk: item.tanggal_masuk ? item.tanggal_masuk.substring(0, 10) : null,
    tanggal_selesai: item.tanggal_selesai ? item.tanggal_selesai.substring(0, 10) : null,
  };
};

// =================================================================================
// === API ENDPOINTS ===============================================================
// =================================================================================

// GET / -> Halaman utama
app.get('/', (req, res) => {
  res.send('Selamat Datang di API Cuci Sepatu!');
});

// GET /items -> Baca semua data
app.get('/items', async (req, res) => {
  const { status } = req.query;
  
  try {
    let query = supabase.from('items').select('*').order('tanggal_masuk', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;

    const formattedData = data.map(formatItemDates);
    res.status(200).json(formattedData);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data: ' + error.message });
  }
});

// POST /items -> Buat data baru
app.post('/items', async (req, res) => {
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  try {
    const newItem = {
      nama_sepatu,
      nama_pelanggan,
      status,
      tanggal_masuk: new Date().toISOString(),
    };

    if (status && (status.toLowerCase() === 'selesai' || status.toLowerCase() === 'siap diambil')) {
      newItem.tanggal_selesai = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('items')
      .insert([newItem])
      .select()
      .single();

    if (error) throw error;
    
    res.status(201).json(formatItemDates(data));
  } catch (error) {
    res.status(500).json({ error: 'Gagal membuat data baru: ' + error.message });
  }
});

// PUT /items/:id -> Update data berdasarkan ID
app.put('/items/:id', async (req, res) => {
  const { id } = req.params;
  const { nama_sepatu, nama_pelanggan, status } = req.body;

  try {
    const updateObject = { nama_sepatu, nama_pelanggan, status };

    if (status && (status.toLowerCase() === 'selesai' || status.toLowerCase() === 'siap diambil')) {
      updateObject.tanggal_selesai = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from('items')
      .update(updateObject)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    if (!data) return res.status(444).json({ error: `Item dengan ID ${id} tidak ditemukan.` });

    res.status(200).json(formatItemDates(data));
  } catch (error) {
    res.status(500).json({ error: 'Gagal memperbarui data: ' + error.message });
  }
});

// DELETE /items/:id -> Hapus data berdasarkan ID
app.delete('/items/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('items')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: `Item dengan ID ${id} tidak ditemukan.` });
    }
    
    res.status(200).json({ message: `Item dengan ID ${id} (${data.nama_sepatu}) berhasil dihapus.` });
  } catch (error) {
    res.status(500).json({ error: 'Gagal menghapus data: ' + error.message });
  }
});

// =================================================================================
// === JALANKAN SERVER =============================================================
// =================================================================================

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});