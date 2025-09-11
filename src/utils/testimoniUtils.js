import { db } from "../config/db"; // pastikan path ini benar
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  Timestamp,
  where,
  query,
} from "firebase/firestore";

export const fetchTestimoniData = async (setTestimoniData, setLoading) => {
  try {
    setLoading(true);

    const q = query(collection(db, "sentiment"), where("answer", "==", true));
    const querySnapshot = await getDocs(q);

    const dataArray = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Format tanggal dengan error handling
      const formattedDate = formatFirestoreDate(data.createdAt);

      return {
        id: doc.id,
        ...data,
        createdAt: formattedDate,
      };
    });

    // Filter data
    const dataPositive = dataArray.filter((a) => a.class == "positive");
    const dataNegative = dataArray.filter((a) => a.class == "negative");

    // Filter critics yang bukan "-" dan sortir dari negative ke positive berdasarkan class
    const dataCritics = dataArray.sort((a, b) => {
      // Priority 1: Urutkan berdasarkan class (negative first)
      if (a.class === "negative" && b.class !== "negative") return -1;
      if (a.class !== "negative" && b.class === "negative") return 1;

      // Priority 2: Jika class sama, urutkan berdasarkan createdAt (terbaru first)
      if (a.createdAt && b.createdAt) {
        // Konversi string tanggal ke Date object untuk comparison
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA; // descending (terbaru dulu)
      }

      // Priority 3: Jika salah satu createdAt tidak ada
      if (a.createdAt && !b.createdAt) return -1;
      if (!a.createdAt && b.createdAt) return 1;

      return 0;
    });

    setTestimoniData({
      data: dataArray,
      negative: dataNegative,
      positive: dataPositive,
      critics: dataCritics,
    });

    return dataArray;
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error("Gagal mengambil data: " + err.message);
  } finally {
    setLoading(false);
  }
};

// Fungsi helper untuk format tanggal
const formatFirestoreDate = (firestoreTimestamp) => {
  if (!firestoreTimestamp) return null;

  try {
    const date = firestoreTimestamp.toDate?.();
    if (!date || !(date instanceof Date) || isNaN(date)) return null;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  } catch (error) {
    console.warn("Date formatting error:", error);
    return null;
  }
};
