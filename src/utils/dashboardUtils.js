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

// Jika ini adalah React component, terima setter functions sebagai parameter
export const fetchProgressData = async (setData, setLoading, setError) => {
  try {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, "progress"));

    // Transformasi data
    const dataArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("data progress", dataArray);

    // Hitung semua total sekaligus dalam satu reduce
    const initialTotals = { total: 0, positive: 0, negative: 0, replied: 0 };

    const { summary, pieData, lineData } = dataArray.reduce(
      (acc, item) => {
        // Hitung summary
        acc.summary.total += item.total || 0;
        acc.summary.positive += item.positive || 0;
        acc.summary.negative += item.negative || 0;
        acc.summary.replied += item.replied || 0;

        // Siapkan data untuk line chart
        if (item.month) {
          acc.lineData.push({
            name: item.month,
            skor: item.replied || 0,
            // Tambahkan data lain jika diperlukan
            positive: item.positive || 0,
            negative: item.negative || 0,
            total: item.total || 0,
          });
        }

        return acc;
      },
      {
        summary: { ...initialTotals },
        pieData: [
          { name: "Positive", value: 0, color: "#4CAF50" },
          { name: "Negative", value: 0, color: "#F44336" },
          { name: "No Reply", value: 0, color: "#B3CDE0" },
        ],
        lineData: [],
      }
    );

    // Update nilai pieData
    pieData[0].value = summary.positive;
    pieData[1].value = summary.negative;
    pieData[2].value = summary.total - summary.replied;

    console.log("Total Summary:", summary);
    console.log("Line Data:", lineData);

    setData({
      pieData,
      lineData,
      list: dataArray,
      summary,
    });

    setError(null);
    return { pieData, lineData, list: dataArray, summary };
  } catch (err) {
    const errorMessage = "Gagal mengambil data: " + err.message;
    setError(errorMessage);
    console.error("Error fetching data:", err);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

export const fetchSentimentData = async (
  setDataSentiment,
  setLoading,
  setError
) => {
  try {
    setLoading(true);

    // hitung batas 7 hari terakhir
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 3);

    // convert ke Firestore Timestamp
    const sevenDaysAgoTimestamp = Timestamp.fromDate(sevenDaysAgo);

    // query firestore
    const q = query(
      collection(db, "sentiment"),
      where("createdAt", ">=", sevenDaysAgoTimestamp)
    );

    const querySnapshot = await getDocs(q);

    const dataArray = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      const createdAt = data.createdAt?.toDate?.(); // ubah Timestamp → Dat
      const day = String(createdAt.getDate()).padStart(2, "0");
      const month = String(createdAt.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
      const year = createdAt.getFullYear();
      // format tanggal jadi D/M/YYYY
      const formattedDate = createdAt ? `${month}/${day}/${year}` : null;

      return {
        id: doc.id,
        ...data,
        critics: doc.critics ? doc.critics : "-",
        createdAt: formattedDate, // replace createdAt dengan string
      };
    });

    console.log("Sentiment (7 hari terakhir, formatted):", dataArray);

    setDataSentiment(dataArray);
    setError(null);
  } catch (err) {
    const errorMessage = "Gagal mengambil data: " + err.message;
    setError(errorMessage);
    console.error("Error fetching data:", err);
    throw new Error(errorMessage);
  } finally {
    setLoading(false);
  }
};

export const UpdateData = async () => {
  const querySnapshot = await getDocs(collection(db, "sentiment"));

  querySnapshot.forEach(async (document) => {
    const data = document.data();

    // Update ke Firestore
    const docRef = doc(db, "sentiment", document.id);
    await updateDoc(docRef, {
      // createdAt: Timestamp.fromDate(dateObj), // simpan sebagai Firestore Timestamp
      class: data.answer == false ? "-" : data.class,
    });

    console.log(`✅ Updated doc ${document.id}: ${data.createdAt} }`);
  });
};

// Export sebagai default
export default fetchProgressData;
