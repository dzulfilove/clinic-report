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

export const getFeedbackData = async (filters, setLoading, setFeedbackData) => {
  try {
    setLoading(true);
    const feedbackRef = collection(db, "sentiment");
    let q = feedbackRef;

    // Filter tahun saja
    if (filters.tahun && !filters.bulan) {
      const startDate = new Date(`${filters.tahun}-01-01T00:00:00`);
      const endDate = new Date(`${filters.tahun}-12-31T23:59:59`);

      q = query(
        feedbackRef,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );
    }

    // Filter tahun + bulan
    if (filters.tahun && filters.bulan) {
      const startDate = new Date(
        `${filters.tahun}-${filters.bulan}-01T00:00:00`
      );
      const endDate = new Date(
        parseInt(filters.tahun),
        parseInt(filters.bulan), // bulan berikutnya
        0, // hari ke-0 = hari terakhir bulan sebelumnya
        23,
        59,
        59
      );

      q = query(
        feedbackRef,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );
    }

    // Filter tanggal (hanya aktif kalau tahun/bulan kosong)
    if (
      !filters.tahun &&
      !filters.bulan &&
      filters.dariTanggal &&
      filters.sampaiTanggal
    ) {
      const startDate = new Date(`${filters.dariTanggal}T00:00:00`);
      const endDate = new Date(`${filters.sampaiTanggal}T23:59:59`);

      q = query(
        feedbackRef,
        where("createdAt", ">=", startDate),
        where("createdAt", "<=", endDate)
      );
    }

    const snapshot = await getDocs(q);
    const datas = snapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.();

      let formattedDate = null;
      if (createdAt) {
        const day = String(createdAt.getDate()).padStart(2, "0");
        const month = String(createdAt.getMonth() + 1).padStart(2, "0");
        const year = createdAt.getFullYear();
        formattedDate = `${month}/${day}/${year}`;
      }

      return {
        id: doc.id,
        ...data,
        critics: doc.critics ? doc.critics : "-",
        createdAt: formattedDate,
      };
    });

    setFeedbackData(datas);
    console.log(datas, "data feedback");
  } catch (error) {
    console.error("Error fetching feedback data:", error);
  } finally {
    setLoading(false);
  }
};
