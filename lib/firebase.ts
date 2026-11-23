// Firebase পরে যুক্ত করা হবে। তখন এখানে config বসিয়ে FIREBASE_READY = true করুন
// এবং saveVolunteer-এর ভেতরে Firestore-এ ডেটা সংরক্ষণের কোড লিখুন।
export const FIREBASE_READY = false
export type VolunteerForm = { name: string; phone: string; interest: string; message: string }
export async function saveVolunteer(_data: VolunteerForm): Promise<{ ok: boolean }> {
  if (!FIREBASE_READY) return { ok: false }
  return { ok: true }
}
