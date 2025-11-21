import { collection, query, where, getDocs } from "firebase/firestore";
import { dbExampp } from "../config/dbStock"; // pastikan path ini benar

export async function getStokAkhir(date, time) {
  try {
    console.log(date, time);
    const col = collection(dbExampp, "stock");
    const q = query(col, where("date", "==", date), where("time", "==", time));
    const snap = await getDocs(q);


    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error("Error fetching stok akhir:", err);
    return [];
  }
}
